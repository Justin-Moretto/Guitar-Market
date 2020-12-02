const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  router.post("/", (request, response) => {
    console.log('PRODUCT ID::::' + request.body.product_id);
    const sqlQuery = `
      INSERT INTO user_favorites (user_id, guitar_id)
      VALUES ($1, $2)
      RETURNING *;
    `
    const values = [request.session['user_id'], request.body.product_id]
    db.query(sqlQuery, values)
      .then(res => {
        response.json(res.rows)
        console.log('ADDING:::::::::')
        console.log(res.rows)
      })
      .catch(e => console.log(e))
  });
  return router;
};
