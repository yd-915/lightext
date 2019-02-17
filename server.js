const express = require('express');
const next = require('next');
const path = require('path');
//body-parser
const bodyParser = require("body-parser");
//logger
const morgan = require("morgan");
//cookier-parser
const cookieParser = require("cookie-parser");
//delete, edit
const methodOverride = require("method-override");
const cors = require("cors");
//SET UP MONGOOSE
const mongoose = require("mongoose");
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Account = require('./models/Account')
const Request = require('./models/Request')
const User = require('./models/User')

app.prepare()
.then(() => {
  const server = express();
  server.use(bodyParser.json());
//account
  server.post('/newAccount', (req, res) =>{
    const accountData = req.body;
    const account = new Account(accountData);
    

    account.save((err, createdAccount) => {
      if(err){
        return res.status(422).send(err);
      }
      return res.json(createdAccount);
    });
  });
//request
  server.post('/newRequest', (req, res) =>{
    const requestData = req.body;
    const request = new Request(requestData);
    

    request.save((err, createdRequest) => {
      if(err){
        return res.status(422).send(err);
      }
      return res.json(createdRequest);
    });
  });


  server.post('/newRequest', function (req, res) {
    var accountId = req.body.accountId;
    var user = req.user;
  
    Account.findOne({ _id: accountId })
    .then(function (account) {
      var request = new Request({
        message: req.body.message,
        account: accountId,
        guest: user.id
      });
  
      return request.save();
    })
    .then(function () {
      notifier.sendNotification();
      res.redirect('/');
    })
    .catch(function(err) {
      console.log(err);
    });
  });
  


// POST: /reservations/handle
router.post('/handle', twilio.webhook({validate: false}), function (req, res) {
  var from = req.body.From;
  var smsRequest = req.body.Body;

  var smsResponse;

  User.findOne({phoneNumber: from})
  .then(function (host) {
    return request.findOne({status: 'pending'});
  })
  .then(function (request) {
    if (request === null) {
      throw 'No pending requests';
    }
    request.status = smsRequest.toLowerCase() === "accept" ? "confirmed" : "rejected";
    return request.save();
  })
  .then(function (request) {
    var message = "You have successfully " + request.status + " the request";
    respond(res, message);
  })
  .catch(function (err) {
    var message = "Sorry, it looks like you do not have any requests to respond to";
    respond(res, message);
  });
});


//user
  server.post('/newUser', (req, res) =>{
    const userData = req.body;
    const user = new User(userData);
    

    user.save((err, createdUser) => {
      if(err){
        return res.status(422).send(err);
      }
      return res.json(createdUser);
    });
  });

  const faviconOptions = {
    root: __dirname + '/static/'
  };
  server.get('/favicon.ico', (req, res) => (
    res.status(200).sendFile('favicon.ico', faviconOptions)
  ));

  server.get('*', (req, res) => {
    return handle(req, res)
  })


  const PORT = process.env.PORT || 3000;

  // Mongoose Connection
const mongoUri =
process.env.MONGODB_URI || "mongodb://localhost:27017/toshi";
mongoose.connect(
mongoUri,
{
  useNewUrlParser: true
}
);

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on port ' + PORT)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})