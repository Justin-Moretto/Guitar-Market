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
    if (user_name === '' || user_email === '' || user_password === '') {
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
          VALUES ($1, $2, $3) RETURNING*;`
          const values = [user_name, user_email, bcrypt.hashSync(user_password, 10)]
          db.query(updateQuery, values)
          .then(res.render('index'))
        }
      })
    }
  })

  return router;
};
