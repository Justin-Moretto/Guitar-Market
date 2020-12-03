const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const app = express();


module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      error: null,
    }
    res.render('login', templateVars)
  });

  router.post("/", (req, res) => {
    const user_email = req.body.email;
    const user_password = req.body.password;

    //Function to check email and password
    const checkEmail = function(user_email, user_password) {
        const sqlQuery = `SELECT * FROM users WHERE email = $1;`
        const sqlValues = [user_email]
        db.query(sqlQuery, sqlValues)
        .then(data => {
          //Compares the passwords and if the query returned the proper data
          if (data.rows.length && bcrypt.compareSync(user_password, data.rows[0].password)) {
            req.session['user_id'] = data.rows[0].email;
            const templateVars = {
              currentUser: undefined,
            }
            if (req.session['user_id']) {
              templateVars.currentUser = req.session['user_id']
            }
            res.redirect('/')
          } else {
            const templateVars = {
              error: 'login-exists'
            }
            res.render('login', templateVars)
          }
        })
    }

    //Calls the checkEmail function
    checkEmail(user_email, user_password);
  });

  return router;
};
