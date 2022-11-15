const express = require('express');
const bcrypt = require('bcryptjs');
const { response } = require('../app');
const isLoggedIn = require('../middleware/isLoggedIn');
const Character = require('../models/Character.model');
const User = require('../models/User.model');
const router = express.Router();
const salt = 11
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/profile", isLoggedIn, (req, res, next) => {
	console.log(req.session.currentUser)
	res.render("profile", { currentUser: req.session.currentUser })
})

router.post("/profile/:id/edit", async(req,res,next)=>{
  try {
    const {password, newpassword} = req.body

    const samePassword = await bcrypt.compare(password, req.session.currentUser.password)
    if (!samePassword) {
      return res.render("update-profile", {
        currentUser: req.session.currentUser,
        errorMessage: "Wrong password"
      })
    }

    const generatedSalt = await bcrypt.genSalt(salt)
  const hashedPassword = await bcrypt.hash(newpassword, generatedSalt)

    const updateProfile = await User.findByIdAndUpdate(
        req.params.id,
        {password: hashedPassword},
        {
          new: true,
        }
    )
    res.redirect("/profile")
  } catch (error) {
    next(error);
  }
})

router.get("/profile/:id/edit", async(req,res,next)=>{
  try {
    res.render('update-profile',  { currentUser: req.session.currentUser })
  } catch (error) {
    next(error);
  }
})

router.get("/main", (req,res,next)=>{
  res.render("main")
})
router.get("/favorites", async (req,res,next)=>{
  try {
    const allFavCharacters = await Character.find();
    console.log(allFavCharacters)
    res.render("/favorites", {allFavCharacters});
  } catch (error) {
    console.log(error)
  }
  res.render("favorites")
})

router.get("/search", async(req, res, next)=>{
  try {
    const {superheroes} = req.query
    
    const searchQ = new RegExp(superheroes, "gi");
    console.log(superheroes)
    let searchedHero = [];
    if (superheroes) {
      searchedHero = await Character.find({name: searchQ})
    }
    res.render("search", {searchedHero})
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
