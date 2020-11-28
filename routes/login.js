const express = require('express');
const router  = express.Router();
const {Pool} = require('pg');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('login')
  });

  router.post("/", (req, res) => {
    const user_email = req.body.email;
    const user_password_input = req.body.password;

    //Get user email
    const getEmail = function(user_email) {
        const sqlQuery = `SELECT * FROM users WHERE email = '${user_email}';`
        db.query(sqlQuery)
        .then(data => {
          //If the return object has a truthy length, then the query worked
          if (data.rows.length) {
            res.render('index')
          } else {
            res.send('error')
          }
        })
    }
    getEmail(user_email);
  });

  return router;
};
