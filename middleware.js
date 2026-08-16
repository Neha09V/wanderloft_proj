const Listing = require("./models/listing");
 const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError") ;
const Community = require("./models/community");
const { listingSchema,reviewSchema, signupSchema, loginSchema, bookingSchema} = require("./schema") ;
  

// ==========================================
// AUTHENTICATION
// ==========================================
   module.exports.isLoggedIn =(req, res,next) => {

    if(!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl ;
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login") ;
      }
      next() ;
    };
    
// ==========================================
// SAVE REDIRECT URL
// ==========================================

module.exports.saveRedirectUrl = (req, res, next) => {
   if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
   }

   next();
};
// 🔐 Signup validation
module.exports.validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(msg, 400);
    }
    next();
};


// 🔐 Login validation
module.exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(msg, 400);
    }
    next();
};


// ==========================================
// ADMIN AUTHORIZATION
// ==========================================

module.exports.isAdmin = (req, res, next) => {

    if (!req.isAuthenticated()) {

        req.flash(
            "error",
            "You must be logged in."
        );

        return res.redirect("/login");
    }

    if (!res.locals.currUser || !res.locals.currUser.isAdmin) {

        req.flash(
            "error",
            "You don't have administrator permission."
        );

        return res.redirect("/");
    }

    next();
};


// ==========================================
// LISTING OWNER
// ==========================================  

    module.exports.isOwner = async(req, res, next) => {
           let {id} = req.params ;
            let listing = await Listing.findById(id) ;
            if(!listing.owner.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the owner of this listing") ;
           return res.redirect(`/listings/${id}`) ;
            }
            next();
        };

// ==========================================
// LISTING OWNER OR ADMIN
// ==========================================

module.exports.isOwnerOrAdmin = async (req, res, next) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {

        req.flash(
            "error",
            "Listing not found."
        );

        return res.redirect("/listings");
    }

    // ADMIN CAN DELETE ANY LISTING
    if (res.locals.currUser.isAdmin) {
        return next();
    }

    // NORMAL USER → ONLY THEIR OWN LISTING
    if (!listing.owner.equals(res.locals.currUser._id)) {

        req.flash(
            "error",
            "You don't have permission to modify this listing."
        );

        return res.redirect(`/listings/${id}`);
    }

    next();
};


    module.exports.validateListing =(req, res, next) => {
    let { error }= listingSchema.validate(req.body) ;
    if(error) {
        let  errMsg = error.details.map(el => el.message).join(", ") ;
        throw new ExpressError(400, errMsg) ; 
    } else {
         next();
    }
 };

    module.exports. validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }  else{
    next();
  }
  
};



  module.exports.isReviewAuthor = async(req, res, next) => {
           let {id,reviewId} = req.params ;
            let review = await Review.findById(reviewId) ;
            if(!review.author.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the author of this review") ;
           return res.redirect(`/listings/${id}`) ;
            }
            next();
        };

// ==========================================
// REVIEW AUTHOR OR ADMIN
// ==========================================

module.exports.isReviewAuthorOrAdmin = async (req, res, next) => {

    const { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {

        req.flash(
            "error",
            "Review not found."
        );

        return res.redirect(`/listings/${id}`);
    }

    // ADMIN CAN DELETE ANY REVIEW
    if (res.locals.currUser.isAdmin) {
        return next();
    }

    // NORMAL USER → ONLY THEIR OWN REVIEW
    if (!review.author.equals(res.locals.currUser._id)) {

        req.flash(
            "error",
            "You don't have permission to delete this review."
        );

        return res.redirect(`/listings/${id}`);
    }

    next();
};


module.exports.isCommunityAuthor = async (req, res, next) => {

    const { id } = req.params;

    const post = await Community.findById(id);

    if (!post) {
        req.flash("error", "Wander Moment not found.");
        return res.redirect("/community");
    }

    if (!post.author.equals(res.locals.currUser._id)) {

        req.flash(
            "error",
            "You are not the author of this Wander Moment."
        );

        return res.redirect(`/community/${id}`);
    }

    next();
};      


// ==========================================
// COMMUNITY AUTHOR OR ADMIN
// ==========================================

module.exports.isCommunityAuthorOrAdmin = async (req, res, next) => {

    const { id } = req.params;

    const post = await Community.findById(id);

    if (!post) {

        req.flash(
            "error",
            "Wander Moment not found."
        );

        return res.redirect("/community");
    }

    // ADMIN CAN DELETE ANY COMMUNITY POST
    if (res.locals.currUser && res.locals.currUser.isAdmin === true) {
        return next();
    }

    // NORMAL USER → ONLY THEIR OWN POST
  if ( res.locals.currUser &&
        post.author &&
        post.author.equals(res.locals.currUser._id)
    ) {
        return next();
    }

        req.flash(
            "error",
            "You don't have permission to delete this post."
        );

        return res.redirect(`/community/${id}`);
    }

    
