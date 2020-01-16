const express = require('express');
var userGet = 'paulius';

const router = express.Router();
//contient le module pour les pages de début et les formes d'inscription, renvoie res au client

const User = require('../models/User.js');


/*
router.get('/register', function (req, res) {
  res.render('palette.hbs', {});
});
*/
router.post('/register', (req, res) =>{
  const {name , email, password1, password2 } = req.body;
  let errors = [];

  if (password1!== password2){
    errors.push({msg: 'Passwords do not match'})
  }

  if (password1.length < 6){
    errors.push({msg: 'Password too short'})
  }

  if (errors.length > 0){
    res.sendStatus('error: passwords dont match');
  }else{
  	const newUser = new User({
  		name,
  		email,
  		password1
  	});
  	console.log('test passed');
  	newUser.save();//.then(user => {
  	console.log('user saved');
  	res.sendFile(__dirname  + '/../public/html/register.html'); 		
  /*	0		}
  		.catch((err) => {console.log(err)});
	}*/
  }
} ) ;
 
router.get('/login', (req, res) =>{
  res.sendFile(__dirname + "/../public/html/login.html");
});


module.exports = router;
