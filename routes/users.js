const express = require('express');
const router = express.Router();
var userGet = 'paulius';
//contient le module pour les pages de début et les formes d'inscription, renvoie res au client

//la pallette
//router.post('/Dashboard')
/*
router.get('/Dashboard', (req, res) =>{
	res.render( 'palette.hbs',{ user :'FREE'});
} );
*/
router.get('/Dashboard', (req, res) =>{
	res.render( 'palette.hbs',{ user :'Paulius'});
} );



router.get('/login', (req, res) =>{
  res.sendFile(__dirname + "/../public/html/login.html");
});

router.get('/register', function (req, res) {
  res.sendFile(__dirname + "/../public/html/register.html");
});


//post de nouvelle utilisateur
router.post('/register', (req, res) =>{
	console.log(req.body);
	const {name , email, password1, password2 } = req.body;
	let errors = []

	if (password1!== password2){
		errors.push({msg: 'Passwords do not match'})
	}

	if (password1.length < 6){
		errors.push({msg: 'Passwords too short'})
	}

	if (errors.length > 0){
		res.render('register',{
			errors,
			name,
			email,
			password,

		});
	
	}else{
		res.send('pass');
	}
})

module.exports=router;