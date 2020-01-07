module.exports = (app) => {

app.get('/Informations', function (req, res) {
  res.sendFile(__dirname + "/public/html/Informations.html");
});

app.get('/signup', function (req, res) {
  res.sendFile(__dirname + "/public/html/signup.html");
});

app.get('/Home', function (req, res) {
  res.sendFile(__dirname + "/public/html/PrinciplePage.html");
});

app.get('/SignIn', function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get('/forgetPwd', function (req, res) {
  res.sendFile(__dirname + "/public/html/forgetPwd.html");
});

app.get('/return', function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
});

};