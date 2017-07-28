var nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '<you_gmailId>',
    pass: '<your_password>'
  }
});
