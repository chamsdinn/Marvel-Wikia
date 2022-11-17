module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.currentUser) {
    res.locals.isLoggedIn = false;

    const regex = /\/profile\/favorites\/[0-9a-f]+\/add/gi;
    if (req.originalUrl.search(regex) === 0) {
      req.session.charToAdd = req.originalUrl.split("/")[3];
    }

    return res.redirect("/auth/login");
  }
  res.locals.currentUser = req.session.currentUser;
  res.locals.isLoggedIn = true;
  next();
};
