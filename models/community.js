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
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
         ref:"User"
    }],
    comments:[
        {
            author:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            text:{
                type:String,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
    
});

module.exports = mongoose.model("Community", communitySchema);