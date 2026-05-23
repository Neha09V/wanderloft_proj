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

    res.redirect("/community");

};

// SHOW SINGLE POST
module.exports.showPost = async (req, res) => {

    const post =
        await Community.findById(req.params.id)
        .populate("author");

    res.render("community/show", {
        post
    });

};