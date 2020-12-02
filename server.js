// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const guitarsRoutes = require("./routes/guitars");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const searchRoute = require("./routes/search");
const newProductRoute = require("./routes/newListing");
const myListings = require("./routes/myListings");
const myFavorites = require("./routes/myFavorites")
const contactOwner = require("./routes/contact");
const logoutRoute = require("./routes/logout");
const addFavorite = require("./routes/addToFavorites.js");
const rmFavorite = require("./routes/removeFromFavorites.js");
const deleteItem = require("./routes/delete.js");
const sold = require("./routes/markSold.js");
const twilioRoute = require("./routes/twilioEmail");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/", usersRoutes(db));
app.use("/api/", guitarsRoutes(db));
app.use("/myFavorites", myFavorites(db));
app.use("/myListings", myListings(db));
app.use("/login", loginRoute(db));
app.use("/register", registerRoute(db));
app.use("/search", searchRoute(db));
app.use("/newProduct", newProductRoute(db));
app.use("/contactSeller", contactOwner(db));
app.use("/logout", logoutRoute(db));
app.use("/addFavorite", addFavorite(db));
app.use("/rmFavorite", rmFavorite(db));
app.use("/delete", deleteItem(db));
app.use("/sold", sold(db));
app.use("/twilioEmail", twilioRoute(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const templateVars = {
    currentUser: undefined
  }
  if (req.session['user_id']) templateVars.currentUser = req.session['user_id'];
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
