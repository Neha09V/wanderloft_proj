const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    coverImage: {
        url: String,
        filename: String
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    content: {
        type: String,
        required: true
    },
intro: {
    type: String,
    trim: true
},

highlight: {
    type: String,
    trim: true
},

tip: {
    type: String,
    trim: true
},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    tags: [
        {
            type: String,
            trim: true
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Story", storySchema);