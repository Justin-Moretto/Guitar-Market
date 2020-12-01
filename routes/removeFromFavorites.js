const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (request, response) => {
    const sqlQuery = `
      DELETE FROM user_favorites
      WHERE user_id = (SELECT users.id FROM users WHERE email = $1)
      AND guitar_id = $2;
    `
    const values = [request.session['user_id'], request.body.product_id]
    console.log('REMOVING')
    db.query(sqlQuery, values)
      .then(res => response.json(res.rows))
      .catch(e => console.log(e))
  });
  return router;
};
