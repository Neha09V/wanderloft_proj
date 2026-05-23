
const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const User = require("../models/user");
const Listing = require("../models/listing");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/filter/:id", wrapAsync(listingController.filter));
router.get("/search", listingController.search);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

router.get(
  "/:id/reservelisting",
  isLoggedIn,
  wrapAsync(listingController.reserveListing)
);
router.post("/:id/favorite", isLoggedIn, async (req, res) => {

   const listingId = req.params.id;

   const user = await User.findById(req.user._id);

   // convert ObjectIds to string for comparison
   const index = user.favorites.findIndex(fav =>
      fav.toString() === listingId
   );

   if (index === -1) {
      user.favorites.push(listingId);
      req.flash("success", "Added to favorites!");
   } else {
      user.favorites.splice(index, 1);
      req.flash("success", "Removed from favorites!");
   }

   await user.save();

   res.redirect(`/listings/${listingId}`);
});
module.exports= router ;
