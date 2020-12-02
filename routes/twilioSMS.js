const express = require('express');
const router  = express.Router();

//Twilio API For SMS
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



module.exports = (db) => {
  router.post("/", (req, res) => {
    client.messages
    .create({
      body: `${req.body['twilio-sms']}`,
      from: '+15013827815',
      to: '+14167271411'
      })
    .then(message => console.log('TEXT SENT', message.sid))
    .then(res.redirect('/'))
  });
  return router;
};
