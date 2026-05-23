  const express = require("express") ;
  // const { route } = require("./listing");
  const router = express.Router() ;
  const user= require("../models/user") ;
const wrapAsync = require("../utils/wrapAsync");
const passport =require("passport");
const { saveRedirectUrl } = require("../middleware");
 const userController = require("../controllers/users");




 
router.route("/")
    .get(userController.redirect); 
  router
.route("/signup")
.get( userController.renderSignupForm) 
.post(wrapAsync(userController.signup));

    router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );


router.get("/logout",  userController.logout) ;



router.get("/forgot-password", userController.renderForgotForm);

router.post("/forgot-password", wrapAsync(userController.handleForgotPassword));

router.get("/reset-password/:id", userController.renderResetForm);

router.post("/reset-password/:id", wrapAsync(userController.resetPassword));

  module.exports = router ;