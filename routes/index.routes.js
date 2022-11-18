const express = require("express");
const bcrypt = require("bcryptjs");
const uploader = require("./../config/cloudinary");
const isLoggedIn = require("../middleware/isLoggedIn");
const Character = require("../models/Character.model");
const User = require("../models/User.model");
const FavCharacter = require("../models/FavCharacter.model");
const router = express.Router();
const salt = 11;
/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const allCharacters = await Character.find();
    const randomCharacters = [];

    for (let index = 0; index < 6; index++) {
      const randomCharacter = allCharacters.splice(
        Math.floor(Math.random() * allCharacters.length),
        1
      )[0];
      randomCharacters.push(randomCharacter);
    }

    // console.log(randomCharacters)
    res.render("index", { randomCharacters });
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { superheroes } = req.query;
    req.session.search = superheroes;

    const searchQ = new RegExp(superheroes, "gi");
    //console.log(superheroes)
    let searchedHero = [];
    if (superheroes) {
      searchedHero = await Character.find({ name: searchQ });
    }
    res.render("search", { searchedHero });
  } catch (error) {
    next(error);
  }
});

router.use(isLoggedIn);

router.get("/profile", (req, res, next) => {
  // console.log(req.session.currentUser)
  res.render("profile");
});

router.post(
  "/profile/:id/edit",
  uploader.single("picture"),
  async (req, res, next) => {
    try {
      const { password, newpassword } = req.body;
      let hashedPassword;
      if (newpassword) {
        if (password === newpassword) {
          return res.render("update-profile", {
            currentUser: req.session.currentUser,
            errorMessage: "it's the same password",
          });
        }
        const samePassword = await bcrypt.compare(
          password,
          req.session.currentUser.password
        );
        if (!samePassword) {
          return res.render("update-profile", {
            currentUser: req.session.currentUser,
            errorMessage: "Wrong password",
          });
        }

        const generatedSalt = await bcrypt.genSalt(salt);
        hashedPassword = await bcrypt.hash(newpassword, generatedSalt);
      }

      const updateProfile = await User.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword, image: req.file?.path },
        {
          new: true,
        }
      );
      req.session.currentUser = updateProfile;

      res.redirect("/profile");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/profile/:id/edit", async (req, res, next) => {
  try {
    res.render("update-profile");
  } catch (error) {
    next(error);
  }
});

router.get("/main", (req, res, next) => {
  res.render("main");
});
router.get("/profile/favorites", async (req, res, next) => {
  try {
    const allFavCharacters = await FavCharacter.find({
      user: req.session.currentUser,
    }).populate("character");
    //console.log(allFavCharacters)
    res.render("favorites", { allFavCharacters });
  } catch (error) {
    next(error);
  }
});

router.post("/profile/favorites/:id/add", async (req, res, next) => {
  try {
    const q = {
      character: req.params.id,
      user: req.session.currentUser._id,
    };
    await FavCharacter.findOneAndUpdate(q, q, { upsert: true });

    res.redirect("/profile/favorites");
  } catch (error) {
    next(error);
  }
});
router.post("/profile/favorites/:id/delete", async (req, res, next) => {
  try {
    await FavCharacter.findOneAndDelete({
      character: req.params.id,
      user: req.session.currentUser._id,
    });
    res.redirect("/profile/favorites");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
