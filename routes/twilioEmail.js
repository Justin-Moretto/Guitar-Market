const express = require('express');
const router  = express.Router();

//Twilio API
const accountSid = 'AC83f462406d86c6e814bf6a8135b04dce';
const authToken = 'b681748802209b3144813af719cc260f';
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

module.exports = (db) => {
  router.post("/", (req, res) => {
    const msg = {
      to: 'jaredflomentickets@gmail.com',
      from: 'jaredflomen@gmail.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email Sent')
        res.redirect('/')
      })
      .catch((error) => {
        console.log(error)
      })
  });
  return router;
};
