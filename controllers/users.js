const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    let newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WanderLoft!");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to WanderLoft!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.renderForgotForm = (req, res) => {
  res.render("users/forgotPassword");
};

module.exports.handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "User not found!");
    return res.redirect("/forgot-password");
  }

  res.redirect(`/reset-password/${user._id}`);
};

module.exports.renderResetForm = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    req.flash("error", "Invalid user!");
    return res.redirect("/forgot-password");
  }

  res.render("users/resetPassword", { user });
};

module.exports.resetPassword = async (req, res) => {

   try {

      const { id } = req.params;
      const { password } = req.body;

      const user = await User.findById(id);

      if (!user) {

         req.flash("error", "User not found!");
         return res.redirect("/forgot-password");

      }

      await user.setPassword(password);

      await user.save();

      req.flash("success", "Password updated successfully!");

      res.redirect("/login");

   } catch (err) {

      req.flash("error", "Something went wrong!");

      res.redirect("/forgot-password");

   }

};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};