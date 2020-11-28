const express = require('express');
const router  = express.Router();
const {Pool} = require('pg');
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('register')
  });

  return router;
};
