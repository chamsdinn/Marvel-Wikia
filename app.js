// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
const port = process.env.PORT;
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//const capitalize = require("./utils/capitalize");
const projectName = "MARVEL WIKIA";

app.locals.appTitle = `${projectName}`;

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// const isLoggedIn = require('./middleware/isLoggedIn');
// app.use(isLoggedIn);
const displayUser = require("./middleware/exposeUsertoView");
app.use(displayUser);
// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
