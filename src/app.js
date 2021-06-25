const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const port = process.env.port || 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));

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

app.get('/profile', function(req, res) {
  res.render('profile', 
             { 
              user: users[0]
             }
  );
});

app.listen(port, function(){
  // debug('listerning on port ${chalk.green('3000')}');
  console.log('PS Project Running on port ' + port);
  console.log(users);
});