const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const port = process.env.port || 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, '/views/', 'index.html'));
  res.render('index', 
             { 
              title: 'Index'
             }
  );
});

app.listen(port, function(){
  // debug('listerning on port ${chalk.green('3000')}');
  console.log('PS Project Running on port ' + port);
});