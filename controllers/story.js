const Story = require("../models/story");

// Show all stories
module.exports.index = async (req, res) => {
    const stories = await Story.find({})
        .populate("author", "username");

    res.render("stories/index.ejs", { stories });
};

// Show create story form
module.exports.newForm = (req, res) => {
    res.render("stories/new.ejs");
};

// Create a story
module.exports.create = async (req, res) => {

    const story = new Story(req.body);

    story.author = req.user._id;

    if (req.body.tags) {
        story.tags = req.body.tags
            .split(",")
            .map(tag => tag.trim().replace(/^#/, ""))
            .filter(tag => tag);
    }

    await story.save();

    res.redirect(`/stories/${story._id}`);
};

// Show one story
module.exports.show = async (req, res) => {
    const { id } = req.params;

    const story = await Story.findById(id)
        .populate("author", "username");

    res.render("stories/show.ejs", { story });
};

// Edit story form
module.exports.editForm = async (req, res) => {
    const story = await Story.findById(req.params.id);

    res.render("stories/edit.ejs", { story });
};

// Update story
module.exports.update = async (req, res) => {
    const { id } = req.params;

    const story = await Story.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );

    if (req.body.tags) {
        story.tags = req.body.tags
            .split(",")
            .map(tag => tag.trim().replace(/^#/, ""))
            .filter(tag => tag);

        await story.save();
    }

    res.redirect(`/stories/${story._id}`);
};




// Delete story
module.exports.delete = async (req, res) => {
      const {id} =req.params ;
    await Story.findByIdAndDelete(id);

    res.redirect("/stories");
};