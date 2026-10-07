const Discussion = require("../models/discussion");
const Answer = require("../models/answer");


/* =========================================================
   DISCUSSION INDEX
========================================================= */

module.exports.index = async (req, res) => {

    const { search, sort } = req.query;

    let filter = {};

    if (search && search.trim() !== "") {

        filter = {
            $or: [
                {
                    title: {
                        $regex: search.trim(),
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search.trim(),
                        $options: "i"
                    }
                },
                {
                    tags: {
                        $regex: search.trim(),
                        $options: "i"
                    }
                }
            ]
        };
    }


    let discussions = await Discussion.find(filter)
        .populate("author");


    /* Calculate answer count */

    const discussionsWithAnswers = await Promise.all(

        discussions.map(async (discussion) => {

            const answerCount = await Answer.countDocuments({
                discussion: discussion._id
            });

            return {
                ...discussion.toObject(),
                answerCount
            };
        })

    );


    discussions = discussionsWithAnswers;


    /* =====================================================
       SORTING
    ===================================================== */

    if (sort === "votes") {

        discussions.sort((a, b) => {

            const votesA = a.upvotes.length;
            const votesB = b.upvotes.length;

            return votesB - votesA;

        });

    } else {

        // Default: Latest

        discussions.sort((a, b) => {

            return new Date(b.createdAt) -
                   new Date(a.createdAt);

        });

    }


    res.render("discussions/index", {
        discussions,
        search,
        sort
    });

};


/* =========================================================
   NEW DISCUSSION FORM
========================================================= */

module.exports.renderNewForm = (req, res) => {

    res.render("discussions/new");

};


/* =========================================================
   CREATE DISCUSSION
========================================================= */

module.exports.createDiscussion = async (req, res) => {

    const {
        title,
        description,
        tags
    } = req.body;


    const discussion = new Discussion({

        title,

        description,

        tags: tags
            ? tags
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
            : [],

        author: req.user._id

    });


    await discussion.save();


    req.flash(
        "success",
        "Question posted successfully!"
    );


    res.redirect("/discuss");

};


/* =========================================================
   SHOW DISCUSSION
========================================================= */

module.exports.showDiscussion = async (req, res) => {

    const { id } = req.params;

    let discussion;


    try {

        discussion = await Discussion.findById(id)
            .populate("author");

    } catch (err) {

        req.flash(
            "error",
            "Invalid discussion!"
        );

        return res.redirect("/discuss");

    }


    if (!discussion) {

        req.flash(
            "error",
            "Discussion not found!"
        );

        return res.redirect("/discuss");

    }


    const answers = await Answer.find({
        discussion: id
    })
        .populate("author")
        .sort({ createdAt: 1 });


    /* =====================================================
       CHECK WHETHER CURRENT USER UPVOTED
    ===================================================== */

    let userDiscussionVote = null;


    if (req.user) {

        const userId = req.user._id.toString();


        const hasUpvoted =
            discussion.upvotes.some(
                user => user.toString() === userId
            );


        if (hasUpvoted) {

            userDiscussionVote = "upvote";

        }

    }


    res.render("discussions/show", {

        discussion,

        answers,

        userDiscussionVote

    });

};


/* =========================================================
   CREATE ANSWER
========================================================= */

module.exports.createAnswer = async (req, res) => {

    const { id } = req.params;


    const answer = new Answer({

        content: req.body.content,

        author: req.user._id,

        discussion: id

    });


    await answer.save();


    req.flash(
        "success",
        "Answer added successfully!"
    );


    res.redirect(`/discuss/${id}`);

};


/* =========================================================
   UPVOTE DISCUSSION
========================================================= */

module.exports.voteDiscussion = async (req, res) => {

    const { id } = req.params;

    const { type } = req.body;


    /* Only upvote is supported */

    if (type !== "upvote") {

        req.flash(
            "error",
            "Invalid vote!"
        );

        return res.redirect(`/discuss/${id}`);

    }


    const discussion = await Discussion.findById(id);


    if (!discussion) {

        req.flash(
            "error",
            "Discussion not found!"
        );

        return res.redirect("/discuss");

    }


    const userId = req.user._id.toString();


    const hasUpvoted =
        discussion.upvotes.some(
            user => user.toString() === userId
        );


    /* Toggle upvote */

    if (hasUpvoted) {

        discussion.upvotes.pull(req.user._id);

    } else {

        discussion.upvotes.push(req.user._id);

    }


    await discussion.save();


    res.redirect(`/discuss/${id}`);

};


/* =========================================================
   UPVOTE ANSWER
========================================================= */

module.exports.voteAnswer = async (req, res) => {

    const {
        id,
        answerId
    } = req.params;


    const { type } = req.body;


    /* Only upvote is supported */

    if (type !== "upvote") {

        req.flash(
            "error",
            "Invalid vote!"
        );

        return res.redirect(`/discuss/${id}`);

    }


    const answer = await Answer.findOne({

        _id: answerId,

        discussion: id

    });


    if (!answer) {

        req.flash(
            "error",
            "Answer not found!"
        );

        return res.redirect(`/discuss/${id}`);

    }


    const userId = req.user._id.toString();


    const hasUpvoted =
        answer.upvotes.some(
            user => user.toString() === userId
        );


    /* Toggle upvote */

    if (hasUpvoted) {

        answer.upvotes.pull(req.user._id);

    } else {

        answer.upvotes.push(req.user._id);

    }


    await answer.save();


    res.redirect(`/discuss/${id}`);

};


/* =========================================================
   EDIT DISCUSSION FORM
   AUTHOR OR ADMIN
========================================================= */

module.exports.renderEditForm = async (req, res) => {

    const { id } = req.params;


    const discussion = await Discussion.findById(id);


    if (!discussion) {

        req.flash(
            "error",
            "Discussion not found!"
        );

        return res.redirect("/discuss");

    }


    const isAuthor =
        discussion.author.equals(req.user._id);

    const isAdmin =
        req.user.isAdmin === true;


    if (!isAuthor && !isAdmin) {

        req.flash(
            "error",
            "You are not allowed to edit this question!"
        );

        return res.redirect(`/discuss/${id}`);

    }


    res.render("discussions/edit", {

        discussion

    });

};


/* =========================================================
   UPDATE DISCUSSION
   AUTHOR OR ADMIN
========================================================= */

module.exports.updateDiscussion = async (req, res) => {

    const { id } = req.params;


    const discussion = await Discussion.findById(id);


    if (!discussion) {

        req.flash(
            "error",
            "Discussion not found!"
        );

        return res.redirect("/discuss");

    }


    const isAuthor =
        discussion.author.equals(req.user._id);

    const isAdmin =
        req.user.isAdmin === true;


    if (!isAuthor && !isAdmin) {

        req.flash(
            "error",
            "You are not allowed to edit this question!"
        );

        return res.redirect(`/discuss/${id}`);

    }


    discussion.title =
        req.body.title;

    discussion.description =
        req.body.description;


    discussion.tags =
        req.body.tags
            ? req.body.tags
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
            : [];


    await discussion.save();


    req.flash(
        "success",
        "Question updated successfully!"
    );


    res.redirect(`/discuss/${id}`);

};


/* =========================================================
   DELETE DISCUSSION
   AUTHOR OR ADMIN
========================================================= */

module.exports.deleteDiscussion = async (req, res) => {

    const { id } = req.params;


    const discussion =
        await Discussion.findById(id);


    if (!discussion) {

        req.flash(
            "error",
            "Discussion not found!"
        );

        return res.redirect("/discuss");

    }


    const isAuthor =
        discussion.author.equals(req.user._id);

    const isAdmin =
        req.user.isAdmin === true;


    if (!isAuthor && !isAdmin) {

        req.flash(
            "error",
            "You are not allowed to delete this question!"
        );

        return res.redirect(`/discuss/${id}`);

    }


    /* Delete all answers belonging to question */

    await Answer.deleteMany({

        discussion: id

    });


    /* Delete question */

    await Discussion.findByIdAndDelete(id);


    req.flash(
        "success",
        "Question deleted successfully!"
    );


    res.redirect("/discuss");

};