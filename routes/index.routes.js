const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const Character = require('../models/Character.model');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/profile", isLoggedIn, (req, res, next) => {
	console.log(req.session.currentUser)
	res.render("profile", { currentUser: req.session.currentUser })
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
