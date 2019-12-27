function createCanvas(){
	var myCanvas = document.createElement("canvas");
	myCanvas.setAttribute("id", "canvas");
    myCanvas.width=600;
    myCanvas.height=600;
    document.body.appendChild(myCanvas);

}


var iterations = 350;
var facteur = 200 ;
var panX = 0;
var panY = 0;





function appartientAMandelbrot(x, y, iterations) {
	var partieReel = x;
	var partieImaginaire = y;

	for(var i = 0; i < iterations; i++) {
    	var tempX = partieReel * partieReel - partieImaginaire * partieImaginaire + x;
  	   	var tempY = 2 * partieReel * partieImaginaire+ y;

     partieReel = tempX;
     partieImaginaire = tempY;
	}

if (partieReel * partieImaginaire >= 5)
    return ( (i/iterations )* 100 ); // In the Mandelbrot set

return 0;
}



function draw(){
	createCanvas();
	var myCanvas = document.getElementById("canvas");
	var ctx = myCanvas.getContext("2d");

	for(var x=0; x < myCanvas.width; x++) {
    	for(var y=0; y < myCanvas.height; y++) {
       		var belongsToSet = appartientAMandelbrot(x/facteur - panX, y/facteur - panY, iterations );
			if(belongsToSet == 0) {
    			ctx.fillStyle = '#000';
    			ctx.fillRect(x,y, 1,1); // Draw a black pixel
			} 
			else {
    			ctx.fillStyle = 'hsl(0, 100%,  ${belongsToSet} %)';
    			ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
			}
		}
	}
}