module.exports = (app) => {

app.get('/faq', function (req, res) {
  res.sendFile(__dirname + "/public/html/faq.html");
});

app.get('/register', function (req, res) {
  res.sendFile(__dirname + "/public/html/register.html");
});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + "/public/html/login.html");
});

app.get('/forgotpassword', function (req, res) {
  res.sendFile(__dirname + "/public/html/forgotpassword.html");
});

app.get('/return', function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get('/*', function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
});

};