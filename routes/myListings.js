//Routes

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    //*** GET USER ID FROM COOKIE */
    const sqlQuery = `SELECT * FROM guitars
    JOIN users ON guitars.seller_id = users.id
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



