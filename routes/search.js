const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Double check this does something???
  router.get("/", (req, res) => {
    res.render('guitars')
  });

  router.post("/", (req, res) => {
    const guitarSearch = {
      min_price: req.body['guitar-price-min'],
      max_price: req.body['guitar-price-max'],
      type: req.body['guitar-type'],
      name: req.body['guitar-name']
    }

    const sqlParams = [];
    let sqlQuery = `SELECT * FROM guitars `;

    if (guitarSearch.min_price){
      if (guitarSearch.max_price) {
        sqlParams.push(`${guitarSearch.min_price}`);
        sqlQuery += `WHERE price/100 >= $${sqlParams.length}`;
        sqlParams.push(`${guitarSearch.max_price}`);
        sqlQuery += `AND price/100 <= $${sqlParams.length}`;
      } else {
        sqlParams.push(`${guitarSearch.min_price}`);
        sqlQuery += `WHERE price/100 >= $${sqlParams.length}`;
      }
    }

    if (guitarSearch.max_price) {
      sqlParams.push(`${guitarSearch.max_price}`);
      sqlQuery += `WHERE price/100 <= $${sqlParams.length}`;
    }

    if (guitarSearch.type) {
      if (sqlParams.length) {
        sqlParams.push(`%${guitarSearch.type}%`);
        sqlQuery += `AND type LIKE $${sqlParams.length}`
      } else {
        sqlParams.push(`%${guitarSearch.type}%`);
        sqlQuery += `WHERE type LIKE $${sqlParams.length}`
      }
    }

    if (guitarSearch.name) {
      if (sqlParams.length) {
        sqlParams.push(`%${guitarSearch.name}%`);
        sqlQuery += `AND name LIKE $${sqlParams.length}`
      } else {
        sqlParams.push(`%${guitarSearch.name}%`);
        sqlQuery += `WHERE name LIKE $${sqlParams.length}`
      }
    }

    db.query(sqlQuery, sqlParams)
    .then(data => { res.json(data.rows)})
    .catch(e => console.log(e))

  });
  return router;
};
