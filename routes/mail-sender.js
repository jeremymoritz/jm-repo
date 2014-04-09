//  send email
var moment = require('moment');
var path = require('path');
var templatesDir = path.resolve(__dirname, '../public/_inc', 'email-templates');
var emailTemplates = require('email-templates');
var nodemailer = require('nodemailer');
var _assign = require('lodash-node').assign;
var jm = require('jeremy-moritz');

exports.sendContactFormMailer = function sendContactFormMailer(req, res) {
  emailTemplates(templatesDir, function(err, template) {
    if (err) { console.log(err); return; }

    var p = req.body; //  postData object
    _assign(p, {
      date: moment().format('YYYY-MM-DD h:mm A'),
      ip: req.connection.remoteAddress
    });

    // console.log('result of test: ' + jm.isBlacklistedIP(p.ip));

    jm.isBlacklistedIP(p.ip, function blackListResult(ipIsBlack) {
      if (ipIsBlack) {
        console.log('IP (' + p.ip + ') is blacklisted! No email sent!');
        return;
      }

      // Send a single email
      template('contact-form', p, function(err, html, text) {
        if (err) { console.log(err); return; }

        // Prepare nodemailer transport object
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'Gmail',
          auth: {
            user: jm.config.gmailUser,
            pass: jm.config.gmailPass
          }
        });

        var mailOptions = {
          from: jm.config.contactFormFromAddress, // sender address
          to: jm.config.contactFormToAddress, // list of receivers (comma separated)
          subject: 'Web Contact: ' + p.name, // Subject line
          html: html, // html body
          // text: text // plaintext body
          generateTextFromHTML: true, //  generate text version automatically if "text" is not set
          headers: {
            'Reply-To': p.name + ' <' + p.email + '>'
          }
        };

        smtpTransport.sendMail(mailOptions, function(err, res) {
          console.log(err || 'Message sent: ' + res.message);

          smtpTransport.close(); // shut down the connection pool, no more messages
        });
      });
    });
  });
};
