const express = require('express');
const router  = express.Router();

//Twilio API For Email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (db) => {
  router.post("/", (req, res) => {
    // console.log("EMAIL ", Object.keys(req.body)[0])
    // console.log("BODY ", req.body[`${Object.keys(req.body)[0]}`])
    const msg = {
      to: `${Object.keys(req.body)[0]}`,
      from: 'jaredflomen@gmail.com',
      subject: 'Guitar For Sale',
      text: `${req.body[`${Object.keys(req.body)[0]}`]}`,
      html: `<strong>${req.body[`${Object.keys(req.body)[0]}`]}</strong>`
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
