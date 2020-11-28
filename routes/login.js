const express = require('express');
const router  = express.Router();
const {Pool} = require('pg');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('login')
  });

  router.post("/", (req, res) => {
    const user_email = req.body.email;
    const checkEmail = getEmail(user_email);
    if (checkEmail) {
      res.send('Worked')
    }
  });

  return router;
};
