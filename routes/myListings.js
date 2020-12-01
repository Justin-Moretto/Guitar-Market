//Routes

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const sqlQuery = `SELECT * FROM guitars
    JOIN users ON users.id = guitars.seller_id
    WHERE users.id = 1
    LIMIT 10`
    // const values = [user.id];
    db.query(sqlQuery)
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => console.log(e))
  });
  return router;
};



