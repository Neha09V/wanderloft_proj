 const mongoose = require("mongoose") ;
 const Schema = mongoose.Schema ;
 const passportLocalMongoose = require("passport-local-mongoose") ;


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
   username: {
      type: String,
      required: true,
    trim: true,
   },
  bio: {
    type: String,
    default: "Travel enthusiast "
  },
  profileImage: {
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
    
    filename: String
  },

  favorites: [
   {
      type: Schema.Types.ObjectId,
      ref: "Listing"
   }
]
},
  { timestamps: true });

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

  module.exports = mongoose.model("User", userSchema) ;