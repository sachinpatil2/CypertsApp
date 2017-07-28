var nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sachinpatildhotri@gmail.com',
    pass: 'sachinpatil@dhotri'
  }
});
