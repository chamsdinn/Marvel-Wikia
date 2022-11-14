module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.currentUser) {
    res.locals.isLoggedIn = false
    return res.redirect("/auth/login");
  }
  res.locals.currentUser = req.session.currentUser
  res.locals.isLoggedIn = true
  next();
};
