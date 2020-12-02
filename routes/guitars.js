/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  router.get("/guitars", (req, res) => {
    console.log('TESTTESTEST:' + req.session['user_id']);
    let query = `SELECT *, user_favorites.id AS fave_ID
                  FROM guitars
                  LEFT JOIN user_favorites
                  ON guitars.id = guitar_id
                  AND user_id = ${req.session['user_id']}`;
    if (!req.session['user_id']) {
      query = `SELECT * FROM guitars`;
    }
    db.query(query)
      .then(data => {
        console.log(data.rows);
        const guitars = data.rows;
        res.json({ guitars });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
