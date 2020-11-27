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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/guitars", guitarsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/login', (req, res) => {
  res.render('login');
});

//Query to return user's listings
const getMyListings = function(user) {
  const sqlQuery = `SELECT * FROM guitars
  JOIN users ON users.id = guitars.seller_id
  WHERE users.id = $1
  LIMIT 10`
  const values = [user.id];
  return pool.query(sqlQuery, values)
  .then(res => res.rows)
}

//Query to return user's favorites
const getMyFavs = function(user) {
  const sqlQuery = `SELECT * FROM user_favorites
  JOIN guitars ON user_favorites.guitar_id = guitars.id
  JOIN users ON guitars.id = users.id
  WHERE users.id = $1
  LIMIT 10`;
  const values = [user.id];
  return pool.query(sqlQuery, values)
  .then(res => res.rows)
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
