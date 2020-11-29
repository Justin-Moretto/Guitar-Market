const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('register')
  });

  router.post("/", (req, res) => {

    //Data inputted into the register form
    const user_name = req.body.input_name;
    const user_email = req.body.email;
    const user_password = req.body.password;

    //Checks if the inputs are blank
    if (user_name === '' || user_email === '' || user_password === '') {
      res.send('Error')
    } else if (user_email) {

      //Checks if the email exists in the database
      const sqlQuery = `SELECT * FROM users WHERE email = $1`
      const sqlValues = [user_email]
      db.query(sqlQuery, sqlValues)
      .then(data => {
        //If query has a truthy length -> the email exists in the databse
        if (data.rows.length) {
          res.send('That email already exists, please login')
        } else {
          //Creates a new user in the users database
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

//Test
