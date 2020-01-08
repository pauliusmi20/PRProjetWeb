const express = require('express');
const router = express.Router();
var userGet = 'paulius';
//contient le module pour les pages de début et les formes d'inscription, renvoie res au client
var url = require('url');


//la pallette
//router.post('/Dashboard')




router.get('/Dashboard' ,(req, res) =>{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	res.render( 'palette.hbs',{ user :'ENJOY', src: 'query'});
	
} );


router.post('/Dashboard', (req, res) =>{
	const fractal = req.body.fractal;
	res.render( 'palette.hbs',{ user :'ENJOY', src: fractal + '.js' })

} );



module.exports=router;
