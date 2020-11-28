const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('login')
  });

  router.post("/", (req, res) => {
    const user_email = req.body.email;
    const user_password = req.body.password;

    //Function to check email and password
    const checkEmail = function(user_email, user_password) {
        const sqlQuery = `SELECT * FROM users WHERE email = '${user_email}';`
        db.query(sqlQuery)
        .then(data => {
          //Compares the passwords and if the query returned the proper data
          if (data.rows.length && bcrypt.compareSync(user_password, data.rows[0].password)) {
            res.render('index')
          } else {
            res.send('error')
          }
        })
    }
    checkEmail(user_email, user_password);
  });

  return router;
};
