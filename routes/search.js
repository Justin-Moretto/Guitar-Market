const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Double check this does something???
  router.get("/", (req, res) => {
    res.render('guitars')
  });

  router.post("/", (req, res) => {
    const guitarSearch = {
      price: req.body['guitar-price'],
      type: req.body['guitar-type'],
      name: req.body['guitar-name']
    }

    const sqlParams = [];
    let sqlQuery = `SELECT * FROM guitars `;

    if (guitarSearch.price) {
      sqlParams.push(`${guitarSearch.price}`);
      sqlQuery += `WHERE price/100 = $${sqlParams.length}`;
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
    //   if(data.rows.length) {
    //     // console.log("DATA: ", data.rows)
    //     res.json(data.rows)
    //   } else {
    //     res.json(data.rows)
    //   }
    .catch(e => console.log(e))

  });
  return router;
};
