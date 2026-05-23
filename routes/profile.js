const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });


// ==============================
// PROFILE PAGE
// ==============================
router.get("/:id", async (req, res) => {

   const { id } = req.params;

   const user = await User.findById(id)
      .populate({
         path: "favorites",
         populate: {
            path: "owner"
         }
      });

   const listings = await Listing.find({
      owner: id
   }).populate("reviews");

   let totalRatings = 0;
   let totalReviews = 0;

   listings.forEach((listing) => {

      listing.reviews.forEach((review) => {

         totalRatings += review.rating;
         totalReviews++;

      });

   });

   let avgRating = 0;

   if (totalReviews > 0) {
      avgRating = (totalRatings / totalReviews).toFixed(1);
   }

   res.render("users/profile.ejs", {
      user,
      listings,
      avgRating
   });

});


// EDIT PROFILE PAGE

router.get("/:id/edit", isLoggedIn, async (req, res) => {

   const user = await User.findById(req.params.id);

   if(!req.user._id.equals(user._id)){
      req.flash("error", "Unauthorized!");
      return res.redirect(`/profile/${user._id}`);
   }

   res.render("users/edit.ejs", { user });

});



// UPDATE PROFILE

router.put(
   "/:id",
   isLoggedIn,
   upload.single("profileImage"),

    async (req, res) => {

      const user = await User.findById(req.params.id);

      if(!req.user._id.equals(user._id)){
         req.flash("error", "Unauthorized!");
         return res.redirect(`/profile/${user._id}`);
      }

      const { username, bio } = req.body;

      user.username = username;
      user.bio = bio;

      if(req.file){
         user.profileImage = {
            url: req.file.path,
            filename: req.file.filename
         };
      }

      await user.save();

      req.flash("success", "Profile Updated!");

      res.redirect(`/profile/${user._id}`);

   }
);

module.exports = router;