//on creer variable globa 
function setup() {
  createCanvas(100,100);
  pixelDensity(1);

}
//var canvas=getElementsByTagName('canvas');
var panX = 0;
var panY = 0; 
var amplification = 0; 

var colours;
var bright;
	


const maxiterations = 100;


var tempX = 0.01;
var tempY = 0.01;
var scaleX = 0.01;
var scaleY = 0.01;
  // Start at negative half the width and height

function updateDisplay(){

}

function belongsToMandelbrot (){

}

function draw() {
	background(0);

  	text("X: "+mouseX, 0, height/4);
  	text("Y: "+mouseY, 0, height/2);
  	loadPixels();

	const w = 8 + amplification;
	const h = ( w* height) / width;
	
	const xmin =-w/2 + panX;
	const ymin = -h/2 + panY;

  
  // Maximum number of iterations for each point on the complex plane
  const maxiterations = 100;
  // x goes from xmin to xmax
  const xmax = xmin + w;
  // y goes from ymin to ymax
  const ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  const dx = (xmax - xmin) / (width);
  const dy = (ymax - ymin) / (height);
  tempX = dx;
  tempY = dy;
  // Start y
  let y = ymin;
  for (let j = 0; j < height; j++) {
    // Start x
    let x = xmin;
    for (let i = 0; i < width; i++) {

      // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
      let a = x + panX;
      let b = y + panY;
      let n = 0;
      while (n < maxiterations) {
        const aa = a * a;
        const bb = b * b;
        const twoab = 2.0 * a * b;
        a = aa - bb + x;
        b = twoab + y;
        // Infinty in our finite world is simple, let's just consider it 16
        if (dist(aa, bb, 0, 0) > 16) {
          break;  // Bail
        }
        n++;
      }

      // We color each pixel based on how long it takes to get to infinity
      // If we never got there, let's pick the color black
      const pix = (i+j*width)*4;
      const norm = map(n, 0, maxiterations, 0, 1);
      let bright = map(sqrt(norm), 0, 1, 0, 255);

      if (n == maxiterations) {
        bright = 0;
      } else {
        // Gosh, we could make fancy colors here if we wanted
        pixels[pix + 0] = bright + x
        pixels[pix + 1] = bright
        pixels[pix + 2] = bright
        pixels[pix + 3] = 255;
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
}


function mouseClicked() {
	panX += 0.2;
	panY += 0.2;
}


function appartient_au_set(a) {
	// body...
}

/*
 loadPixels();
  for (var x =0; x< width; x++) {
  	for (var y = 0; y<height; y++ ){

  		var a = map(x, 0, width, -2, 2);
  		var b = map(y, 0, height, -2, 2);

  		var cstA = a;
  		var cstB = b; 
  		var n = 0;
  		var z = 0;

  		while (n<100){
  			var aa = a * a - b * b;
  			var bb =2 * a * b ;
  			a=aa + cstA;
  			b=bb + cstB;
  			if (abs(a + b)> 16){
  				break;
  			}
  			n++;
  		}
  	}

  	if ()
  }
}
*/