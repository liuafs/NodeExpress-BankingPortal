const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.port || 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.urlencoded({ extended: true}));

const accountData = fs.readFileSync('./src/json/accounts.json');
const accounts = JSON.parse(accountData);

const usertData = fs.readFileSync('./src/json/users.json');
const users = JSON.parse(usertData);

app.get('/', function(req, res) {
  res.render('index', 
             { 
              title: 'Account Summary',
              accounts: accounts
             }
  );
});

app.get('/savings', function(req, res) {
  res.render('account', 
             { 
              account: accounts.savings
             }
  );
});

app.get('/checking', function(req, res) {
  res.render('account', 
             { 
              account: accounts.checking
             }
  );
});

app.get('/credit', function(req, res) {
  res.render('account', 
             { 
              account: accounts.credit
             }
  );
});

app.get('/profile', function(req, res) {
  res.render('profile', 
             { 
              user: users[0]
             }
  );
});

app.get('/transfer', function(req, res) {
  res.render('transfer', 
             { 
              user: users[0]
             }
  );
});

app.post('/transfer', function(req, res) {
  const { from, to, amount } = req.body;
 // console.log('from: ' + from + ' to: ' + to + ' amount=' + amount);
  accounts[from].prior_balance = accounts[from].balance;
  accounts[from].balance = accounts[from].balance - parseInt(amount);
  accounts[from].amount = parseInt(amount);
  accounts[to].prior_balance = accounts[to].balance;
  accounts[to].balance = accounts[to].balance + parseInt(amount);
  accounts[to].amount = parseInt(amount);

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync('./src/json/accounts.json', accountsJSON);
  //console.log(acountsJSON);

  res.render('transfer', 
  { 
    message: "Transfer Completed"
  }
);
});

app.get('/payment', function(req, res) {
  res.render('payment', 
             { 
              account: accounts.credit,
             }
  );
});

app.post('/payment', function(req, res) {
  accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
  accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync('./src/json/accounts.json', accountsJSON);
  res.render('payment', 
             { 
              account: accounts.credit,
              message: "Payment Successful"
             }
  );
});

app.listen(port, function(){
  // debug('listerning on port ${chalk.green('3000')}');
  console.log('PS Project Running on port ' + port);
  //console.log(users);
});