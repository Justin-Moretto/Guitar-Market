const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  router.post("/", (request, response) => {
    console.log('PRODUCT ID::::' + request.body.product_id);
    const sqlQuery = `
      DELETE FROM user_favorites
      WHERE user_id = $1
      AND guitar_id = $2;
    `
    const values = [request.session['user_id'], request.body.product_id]
    db.query(sqlQuery, values)
      .then(res => {
        response.json(res.rows)
        console.log('REMOVING:::::::::::')
        console.log(res.rows)
      })
      .catch(e => console.log(e))
  });
  return router;
};
