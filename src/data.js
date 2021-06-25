const fs = require('fs');
const path = require('path');

const accountData = fs.readFileSync('./src/json/accounts.json');
const accounts = JSON.parse(accountData);
const usertData = fs.readFileSync('./src/json/users.json');
const users = JSON.parse(usertData);

writeJSON(() => {
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync('./src/json/accounts.json', accountsJSON);
});