const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (request, response) => {
    const sqlQuery = `
      INSERT INTO user_favorites (user_id, guitar_id)
      VALUES ((SELECT users.id FROM users WHERE email = $1), $2)
      RETURNING *;
    `
    const values = [request.session['user_id'], request.body.product_id]

    console.log("ADDING")
    db.query(sqlQuery, values)
      .then(res => response.json(res.rows))
      .catch(e => console.log(e))
  });
  return router;
};
