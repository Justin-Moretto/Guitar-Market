const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (request, response) => {
    // query to select the owner of a product
    const sqlQuery = `
      SELECT email
      FROM users
      WHERE id = $1
    `
    const values = [request.body.seller_id]
    db.query(sqlQuery, values)
      .then(res => response.json(res.rows))
      .catch(e => console.log(e))
  });
  return router;
};
