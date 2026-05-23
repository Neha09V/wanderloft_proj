const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
    image: String,
    caption: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Community", communitySchema);