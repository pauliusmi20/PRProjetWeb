module.exports = (app) =>{
app.get('/Dashboard', (req, res) =>{
	res.render( 'palette.hbs',{ user :'Paulius', navbar: 'navigationbar' , socialmedia : 'socialmedia'});
} );


}
/*
	app.post('/Dashboard', (req, res) =>{
	
});

} );

}


*/