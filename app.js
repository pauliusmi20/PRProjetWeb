const express = require('express');
const hbs = require('express-handlebars');
var path = require('path');
const mongoose = require('mongoose');
const sendHtml = require('./sendHtml.js');
//Ajax

//initi le module express
const app = express();

//DB Config
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:3k9XdNKUvHjKHpB@projetweb-mk8hk.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // performredi actions on the collection object
  client.close();
});


app.use(express.static('public'));
app.set('views',path.join(__dirname,'views'));

app.set ('view engine', 'hbs') ;
app.engine( 'hbs', hbs( {
  defaultLayout: 'main',
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
}));


// body parser
app.use(express.urlencoded({extended: false}));

//routes
app.use('/',require('./routes/index.js'));
app.use('/users',require('./routes/users.js'));



const User = require('./models/User.js');
//new user
app.post('/register', (req, res) =>{
  const {name , email, password1, password2 } = req.body;
  let errors = [];

  if (password1!== password2){
    errors.push({msg: 'Passwords do not match'})
  }

  if (password1.length < 6){
    errors.push({msg: 'Password too short'})
  }

  if (errors.length > 0){
    res.sendFile(__dirname + '/public/html/register.html')
  }else{
    const newUser = new User({
      name,
      email,
      password1
    });
    console.log('test passed');
    newUser.save();//.then(user => {
    console.log('user saved');
    res.sendFile(__dirname  + '/public/html/login.html');  
  /*  0   }
      .catch((err) => {console.log(err)});
  }*/
}
    console.log(errors);  
});
//ecoute get renvoie res html
sendHtml(app);

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
});


/*

fraTestUser

   readWriteAnyDatabase@admin
pass fradant 
	SCRAM



	mongodb+srv://fraTestUser:<password>@projetweb-mk8hk.gcp.mongodb.net/test?retryWrites=true&w=majority



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fraTestUser:<password>@projetweb-mk8hk.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


*/