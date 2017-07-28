"use strict";

module.exports = function (app) {
var mongo = require('../models/mongo');
var url = "mongodb://localhost:27017/cyperts";
var session = require('express-session');
var OTP = require("otp");
var otp = OTP({codeLength:6});
var transporter = require("./nodemail").transporter;
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var sess ;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
var dbInstance = null;

mongo.connect(url,function(err,db){
  console.log("database created"+db);
  dbInstance=db;
});

app.get('/listUsers', function (req, res) {
  mongo.findUsers(dbInstance,function(err,result){
    console.log("result of listUsers: "+result);
    res.json( result );
    res.end();
  });
});
app.post('/registerUser', function (req, res) {
   console.log("request: ",req.body);
   var otpCode = otp.totp();
   console.log(otpCode);
   sess = req.session;
   sess.username = req.body.username;
   sess.email = req.body.email;
   sess.password = req.body.password;
   sess.otp = otpCode;
   console.log('session',sess);
   var mailOptions = {
     from: 'sachinpatildhotri@gmail.com',
     to: 'sachinpatildhotri@gmail.com',
     subject: 'OTP',
     text: 'OTP is'+ otpCode
   };

   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       res.json( {"otpSent":false} );
       res.end();
     } else {
       console.log('Email sent: ' + info.response);
       res.json( {"otpSent":true} );
       res.end();
     }
   });
});
app.post('/sendOtp', function (req, res) {
   console.log("request: ",req.body);
   sess = req.session;
   if(req.body.otp == sess.otp){
     var user = {
       "username":sess.username,
       "email":sess.email,
       "password":sess.password
     }
     mongo.insertUser(dbInstance,user,function(err,result){
       res.json( {"otp":true} );
       res.end();
     });
   }else{
     res.json( {"otp":false});
     res.end();
   }
});
app.post('/login', function (req, res) {
   console.log("login: ",req.body);
   mongo.findUser(dbInstance,req.body.email,function(err,result){
     console.log(result);
     if(result[0] == undefined || result[0] == null){
        res.json( {"Success":false} );
        res.end();
      }
     else if(result[0].password == req.body.password){
       res.json( {"Success":true} );
       res.end();
     }else {
       res.json( {"Success":false} );
       res.end();
     }
   });
});

};
