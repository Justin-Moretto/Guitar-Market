//Routes

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const sqlQuery = `SELECT guitars.id AS product_id, guitars.name, guitars.price, guitars.type, guitars.img_url, guitars.description, guitars.seller_id, guitars.sold FROM guitars
    JOIN user_favorites ON user_favorites.guitar_id = guitars.id
    JOIN users ON user_favorites.user_id = users.id
    WHERE users.email = $1
    LIMIT 10`;
    const values = [req.session['user_id']];
    db.query(sqlQuery, values)
    .then(data => {
      //DELETE THIS WHEN COMPLETE
      console.log('QUERY INFORMATION: ', data.rows)
      //DELETE THIS WHEN COMPLETE
      res.json(data.rows)
    })
    .catch(e => console.log(e))
  });
  return router;
};
