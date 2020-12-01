//Routes

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const sqlQuery = `SELECT * FROM guitars
    JOIN users ON guitars.seller_id = users.id
    WHERE users.email = $1
    LIMIT 10`
    const values = [req.session['user_id']];
    db.query(sqlQuery, values)
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => console.log(e))
  });
  return router;
};
