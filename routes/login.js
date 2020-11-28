const express = require('express');
const router  = express.Router();
const {Pool} = require('pg');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('login')
  });

  router.post("/", (req, res) => {
    const user_email = req.body.email;
    let query = `SELECT * FROM users
    // WHERE email = '${user_email}`;
    db.query(query)
    .then(res.send('worked'))
    .catch(err => res.send('error'));
  });
  return router;
};
