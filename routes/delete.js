const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (request, response) => {
    // query to select the owner of a product
    const sqlQuery = `
    DELETE FROM guitars
    WHERE id = $1;
    `
    const values = [request.body.product_id]
    db.query(sqlQuery, values)
      .then(res => response.json(res.rows))
      .catch(e => console.log(e))
  });
  return router;
};
