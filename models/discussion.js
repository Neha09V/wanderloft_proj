const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        tags: [
            {
                type: String,
                trim: true
            }
        ],

        upvotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Discussion = mongoose.model(
    "Discussion",
    discussionSchema
);

module.exports = Discussion;