const router = require("express").Router();
const User = require("./../models/User.model");
const bcrypt = require("bcryptjs");
const Character = require("../models/Character.model");
const salt = 11;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/signup", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      return res.render("auth/signup", {
        errorMessage: "Please put your username and your password",
      });
    }

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      return res.render("auth/signup", {
        errorMessage: "Username already taken",
      });
    }

    const generatedSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password) {
      return res.render("auth/login", {
        errorMessage: "Both fields are mandatory",
      });
    }
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.render("auth/login", {
        errorMessage: "This user isn't found !",
      });
    }

    const samePassword = await bcrypt.compare(password, foundUser.password);

    if (!samePassword) {
      return res.render("auth/login", {
        errorMessage: "Wrong password",
      });
    }

    req.session.currentUser = foundUser;

    if (req.session.search) {
      res.redirect(`/search?superheroes=${req.session.search}`);
      return;
    }

    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res, next) => {
  await req.session.destroy();
  res.redirect("/");
});

module.exports = router;
