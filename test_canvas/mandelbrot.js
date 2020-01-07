//Calcule si appartient au set de mandelbrot puis renvoie u


function appartientAMandelbrot(x, y) {
	var partieReel = x;
	var partieImaginaire = y;

	var iterations = document.getElementById('iterations').value;

	for(var i = 0; i < iterations; i++) {
    	var tempX = partieReel * partieReel - partieImaginaire * partieImaginaire + x;
  	   	var tempY = 2 * partieReel * partieImaginaire+ y;
     	partieReel = tempX;
   		partieImaginaire = tempY;
		if (partieReel * partieImaginaire > 5)
    		return ( (i/iterations )* 100 );	// renvoie un nombre en pourcentage pour hsl 
    }
	return 0;
}


function draw(){
	var myCanvas = document.getElementById("canvas");
	var ctx = myCanvas.getContext("2d");

	var facteur = document.getElementById('facteur').value ;
	var panX = document.getElementById("panX").value / 100;
	var panY = document.getElementById("panY").value / 100;
	var couleur = document.getElementById("couleur").value;

	for(var x=0; x < myCanvas.width; x++) {
    	for(var y=0; y < myCanvas.height; y++) {
       		var appartient = appartientAMandelbrot(x/facteur - panX, y/facteur - panY);
			if(appartient == 0) {
    			ctx.fillStyle = '#000';
    			ctx.fillRect(x,y, 1,1); 
			} 
			else {
    			ctx.fillStyle = 'hsl('+ couleur+ ', 100%, '+ appartient + '%)';
    			ctx.fillRect(x,y, 1,1); 
			}
		}
	}
}