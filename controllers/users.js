const User = require("../models/user");

const renderSignupForm = (req, res) => {
  res.render("users/signup");
};

const signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    let newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to WanderLoft!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

const renderLoginForm = (req, res) => {
  res.render("users/login");
};

const login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/listings");
};

const redirect = (req, res) => {
  res.redirect("/listings");
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out!");
    res.redirect("/listings");
  });
};

const renderForgotForm = (req, res) => {
  res.render("users/forgotPassword");
};

const handleForgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    req.flash("error", "User not found!");
    return res.redirect("/forgot-password");
  }

  res.redirect(`/reset-password/${user._id}`);
};

const renderResetForm = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    req.flash("error", "Invalid user!");
    return res.redirect("/forgot-password");
  }

  res.render("users/resetPassword", { user });
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    await user.setPassword(req.body.password);
    await user.save();

    req.flash("success", "Password updated!");
    res.redirect("/login");
  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.redirect("/forgot-password");
  }
};

module.exports = {
  renderSignupForm,
  signup,
  renderLoginForm,
  login,
  redirect,
  logout,
  renderForgotForm,
  handleForgotPassword,
  renderResetForm,
  resetPassword,
};