//ROUTE
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('search')
  });

  router.post("/", (req, res) => {
    const guitarSearch = {
      price: req.body['guitar-price'],
      type: req.body['guitar-type'],
      name: req.body['guitar-name']
    }

    const sqlParams = [];
    let sqlQuery = `SELECT * FROM guitars`;

    if (guitarSearch.price) {
      sqlParams.push(`${guitarSearch.price}`)
      sqlQuery += `WHERE price = $${sqlParams.length}`
    }

    if (guitarSearch.type) {
      if (sqlParams.length) {
        sqlParams.push(`${guitarSearch.type}`);
        sqlQuery += `AND type = $${sqlParams.length}`
      } else {
        sqlParams.push(`${guitarSearch.type}`);
        sqlQuery += `WHERE type = $${sqlParams.length}`
      }
    }

    if (guitarSearch.name) {
      if (sqlParams.length) {
        sqlParams.push(`${guitarSearch.name}`);
        sqlQuery += `AND name = $${sqlParams.length}`
      } else {
        sqlParams.push(`${guitarSearch.name}`);
        sqlQuery += `WHERE name = $${sqlParams.length}`
      }
    }

    console.log('query   ', sqlQuery)
    console.log('query   ', sqlParams)

    db.query(sqlQuery, sqlParams)
    .then(data => {
      if(data.rows.length) {
        res.send("Worked")
      } else {
        res.send("Didn't work");
      }
    })
    .catch(e => console.log(e))

  });
  return router;
};
