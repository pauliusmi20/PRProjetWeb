const express = require('express');
const hbs = require('express-handlebars');
//contient le module pour les pages de début et les formes d'inscription, renvoie html au client
const listeningSendsHtml = require('./startCommands.js');
//initi le module express
const app = express();

//<script src="../p5.min.js"></script>

app.use(express.static('public'));

app.engine( 'hbs', hbs( {
  defaultLayout: 'main',
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');

listeningSendsHtml(app);
/*
app.post('/login', , )
*/

app.get('/*', function (req, res) {
  res.sendFile(__dirname + "/public/html/PrinciplePage.html");
})

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})


