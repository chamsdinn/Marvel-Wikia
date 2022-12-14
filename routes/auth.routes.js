const router = require("express").Router();
const User = require("./../models/User.model");
const bcrypt = require("bcryptjs");
const uploader = require("./../config/cloudinary");
const Character = require("../models/Character.model");
const FavCharacter = require("../models/FavCharacter.model");
const salt = 11;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/signup", uploader.single("picture"), async (req, res, next) => {
  const { username, password, email, image } = req.body;
  // console.log(req.file)
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
      image: req.file.path,
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

    if (req.session.charToAdd) {
      const q = {
        character: req.session.charToAdd,
        user: req.session.currentUser._id,
      };
      await FavCharacter.findOneAndUpdate(q, q, { upsert: true });

      delete req.session.charToAdd
      res.redirect(`/profile/favorites`);
      return;
    }

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
