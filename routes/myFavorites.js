const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    //Get user id from cookie
    const sqlQuery = `SELECT * FROM guitars
    JOIN user_favorites ON user_favorites.guitar_id = guitars.id
    JOIN users ON guitars.id = users.id
    WHERE user_favorites.user_id = 1
    LIMIT 10`;
    // const values = [user.id];
    db.query(sqlQuery)
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => console.log(e))
  });
  return router;
};
