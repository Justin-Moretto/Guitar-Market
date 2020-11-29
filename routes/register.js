const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('register')
  });

  router.post("/", (req, res) => {
    const user_name = req.body.input_name;
    const user_email = req.body.email;
    const user_password = req.body.password;
    if (user_email === '' || user_password === '' || user_password === '') {
      res.send('Error')
    } else if (user_email) {
      //Checking if the email exists
      const sqlQuery = `SELECT * FROM users WHERE email = '${user_email}'`
      db.query(sqlQuery)
      .then(data => {
        if (data.rows.length) {
          res.send('That email already exists, please login')
        } else {
          const updateQuery = `INSERT INTO users (name, email, password)
          VALUES (${user_name}, ${user_email}, ${user_password}) RETURNING*;`
          db.query(updateQuery)
          .then(res => res.render('index'))
        }
      })
    }
  })


  return router;
};
