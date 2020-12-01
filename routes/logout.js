const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('login')
  });
  
  router.post('/', (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};
