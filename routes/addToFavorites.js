const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (request, response) => {
    const sqlQuery = `
      INSERT INTO user_favorites (user_id, guitar_id)
      VALUES
    `
    const values = []
    db.query(sqlQuery, values)
      .then(res => res.rows)
      .catch(e => console.log(e))
  });
  return router;
};
