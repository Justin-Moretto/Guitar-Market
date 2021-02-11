/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  console.log('INSIDE guitars.js')
  router.get('/guitars', async (req, res) => {
    res.header({ 'Access-Control-Allow-Origin': '*' })
    let query;
    const cookie = req.session['user_id'];
    if (req.session['user_id'] === undefined) {
      query = `SELECT *, guitars.id AS product_id, user_favorites.id AS fave_id
              FROM guitars
              LEFT JOIN user_favorites
              ON guitars.id = guitar_id
              AND user_id = (SELECT id FROM users WHERE email = '${cookie}')
              ORDER BY product_id`
        ;
    } else {
      query = `SELECT guitars.id AS product_id, seller_id, name, price, type, img_url, description, sold, user_favorites.id AS fave_id, (SELECT id FROM users WHERE email = '${cookie}') AS current_user
              FROM guitars
              LEFT JOIN user_favorites ON guitars.id = guitar_id
              AND user_id = (SELECT id FROM users WHERE email = '${cookie}')
              ORDER BY product_id`;
    }
    //const values = [req.session['user_id']];
    let guitarsFromDatabase = await db.query(query)
      .then(data => {
        const guitars = data.rows;
        console.log('GUITARS .THEN')
        return res
          .status(200)
          .json({ guitars })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      res.send(guitarsFromDatabase)
      res.end()
  });
  return router;
};
