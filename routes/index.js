const express = require('express');
const router = express.Router();
var userGet = 'paulius';
//contient le module pour les pages de début et les formes d'inscription, renvoie res au client
var url = require('url');


//la pallette
//router.post('/Dashboard')


//post de nouvelle utilisateur

module.exports=router;


router.post('/Dashboard', (req, res) =>{
	const fractal = req.body.fractal;
	res.render( 'palette.hbs',{ user :'ENJOY', src: fractal + '.js' })

} );


router.get('/Dashboard', (req, res) =>{
	res.render( 'palette.hbs',{ user :'Paulius'});
} );



module.exports=router;
