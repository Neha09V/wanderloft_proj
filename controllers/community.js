const Community = require("../models/community");

// GET all posts
module.exports.index = async (req, res) => {

    const posts = await Community.find({})
        .populate("author");

    res.render("community/index", {
        posts
    });

};

// GET new post form
module.exports.renderNewForm = (req, res) => {

    res.render("community/new");

};

// CREATE post
module.exports.createPost = async (req, res) => {

    const newPost =
        new Community(req.body.community);

    newPost.author = req.user._id;

    if (req.file) {
        newPost.image = req.file.path;
    }

    await newPost.save();
    req.flash(
        "success",
        "Your Wander Moment was shared successfully ✨"
    );
    res.redirect("/community");

};

// SHOW SINGLE POST
module.exports.showPost = async (req, res) => {

    const post =
        await Community.findById(req.params.id)
        .populate("author")
        .populate("comments.author") ;

    res.render("community/show", {
        post
    });

};


// GET EDIT FORM
module.exports.renderEditForm = async (req, res) => {

    const post = await Community.findById(req.params.id);

    if (!post) {
        req.flash("error", "Wander Moment not found!");
        return res.redirect("/community");
    }

    res.render("community/edit", {
        post
    });

};


// UPDATE POST
module.exports.updatePost = async (req, res) => {

    const post = await Community.findById(req.params.id);

    if (!post) {
        req.flash("error", "Wander Moment not found!");
        return res.redirect("/community");
    }

    post.caption = req.body.community.caption;
    post.location = req.body.community.location;

    // Update image only if a new image was uploaded
    if (req.file) {
        post.image = req.file.path;
    }

    await post.save();

    req.flash("success", "Wander Moment updated successfully ✨");

    res.redirect(`/community/${post._id}`);

};


// DELETE POST
module.exports.deletePost = async (req, res) => {

    const post = await Community.findById(req.params.id);

    if (!post) {
        req.flash("error", "Wander Moment not found!");
        return res.redirect("/community");
    }

    await Community.findByIdAndDelete(req.params.id);

    req.flash( "Wander Moment deleted successfully 🗑️");

    res.redirect("/community");

};

//Like /unlike post

module.exports.toggleLike = async (req, res) => {

    const post = await Community.findById(req.params.id);

    if (!post) {
        req.flash("error", "Wander Moment not found!");
        return res.redirect("/community");
    }

    const userId = req.user._id;

    const alreadyLiked = post.likes.some(
        id => id.equals(userId)
    );

    if (alreadyLiked) {
        // Unlike
        post.likes.pull(userId);
    } else {
        // Like
        post.likes.push(userId);
    }

    await post.save();

    res.redirect(`/community/${post._id}`);
};


// ADD COMMENT
module.exports.addComment = async (req, res) => {

    const post = await Community.findById(req.params.id);

    if (!post) {
        req.flash("error", "Wander Moment not found!");
        return res.redirect("/community");
    }

    post.comments.push({
        author: req.user._id,
        text: req.body.comment
    });

    await post.save();



    res.redirect(`/community/${post._id}`);
};


// DELETE COMMENT
module.exports.deleteComment = async (req, res) => {

    const post = await Community.findById(req.params.id);

    if (!post) {
        req.flash("error", "Wander Moment not found!");
        return res.redirect("/community");
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
        req.flash("error", "Comment not found!");
        return res.redirect(`/community/${post._id}`);
    }

    // Comment author OR admin
    if (
        comment.author.toString() !== req.user._id.toString()
        && !req.user.isAdmin
    ) {
        req.flash("error", "You don't have permission to delete this comment.");
        return res.redirect(`/community/${post._id}`);
    }

    comment.deleteOne();

    await post.save();

    req.flash("success", "Comment deleted successfully 🗑️");

    res.redirect(`/community/${post._id}`);
};