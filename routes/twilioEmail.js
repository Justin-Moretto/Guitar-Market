const express = require('express');
const router  = express.Router();

//Twilio API For Email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

module.exports = (db) => {
  router.post("/", (req, res) => {
    // console.log("EMAIL ", Object.keys(req.body)[0])
    // console.log("BODY ", req.body[`${Object.keys(req.body)[0]}`])
    const msg = {
      to: `${Object.keys(req.body)[0]}`,
      from: 'jaredflomen@gmail.com',
      subject: 'Guitar For Sale',
      text: req.body[`${Object.keys(req.body)[0]}`],
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
