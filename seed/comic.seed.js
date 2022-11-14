const crypto = require("crypto");
require('dotenv').config();

const timestamp = Date.now();
const route = "/v1/public/comics";

const hash = crypto.createHash('md5')
.update(`${timestamp}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`)
.digest("hex");

const fetchUrl = `${process.env.BASE_URL}${route}?ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`;

console.log(fetchUrl)
