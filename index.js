const express = require('express');
const hbs = require('express-handlebars');
const app = express();


app.use(express.static('public'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/',
}));

app.set('view engine', 'hbs');


app.get('/forgetPwd', function (req, res) {
  res.sendFile(__dirname + "/public/html/forgetPwd.html");
})

app.get('/signup', function (req, res) {
  res.sendFile(__dirname + "/public/html/signup.html");
})

app.get('/tree', function (req, res) {
  res.sendFile(__dirname + "/public/html/tree.html");
})

app.get('/triangle', function (req, res) {
  res.sendFile(__dirname + "/public/html/triangle.html");
})

app.get('/flocon', function (req, res) {
  res.sendFile(__dirname + "/public/html/flocon.html");
})

app.get('/*', function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
})

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})


