const express = require('express');
const app = express()
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, response) => {
// Query to add a new listing to the website
  const sqlQuery = `
    INSERT INTO guitars (seller_id, name, price, type, img_url, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `
  const values = [req.body.seller_id, req.body.name, req.body.price, req.body.type, req.body.img_url, req.body.description,]
  db.query(sqlQuery, values)
    .then(res => res.rows)
  });
  return router
}

