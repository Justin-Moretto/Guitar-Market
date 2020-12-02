const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/", (req, res) => {
    client.messages
    .create({
      body: 'Is this grogu?',
      from: '+15013827815',
      to: '+14167271411'
      })
    .then(message => console.log('TEXT SENT', message.sid))
    .then(res.redirect('/'))
  });
  return router;
};
