const mongoose = require("mongoose");
const crypto = require("crypto");
const Character = require("../models/Character.model");
require("dotenv").config();

// ℹ️ Connects to the database
require("../db");

const timestamp = Date.now();
const route = "/v1/public/characters";

const hash = crypto
  .createHash("md5")
  .update(
    `${timestamp}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`
  )
  .digest("hex");

const fetchUrl = `${process.env.BASE_URL}${route}?ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`;
let total = null;
let offset = 0;

async function seedCharacters() {
  try {
    await Character.deleteMany();

    let { data } = await (
      await fetch(`${fetchUrl}&limit=100&offset=${offset}`)
    ).json();

    total = data.total - 100;
    offset += 100;

    let seed = await Character.create(data.results);
    console.log(seed);
    for (let i = total; i > 0; i -= 100) {
      const response = await (
        await fetch(`${fetchUrl}&limit=100&offset=${offset}`)
      ).json();
      data = response.data;

      seed = await Character.create(data.results);
      console.log(seed);
      offset += 100;
    }

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

seedCharacters();
