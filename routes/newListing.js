const express = require('express');
const app = express()
const router  = express.Router();

module.exports = (db) => {
  router.post('/guitars', (req, res) => {
    db.addListing(req.body)
    .then(guitar => {
      res.send(guitar);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });
  return router
}

