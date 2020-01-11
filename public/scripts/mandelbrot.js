/*
  Based on @Shiffman / The coding train
  https://thecodingtrain.com/CodingChallenges/021-mandelbrot-p5.html
  https://thecodingtrain.com/CodingChallenges/022-juliaset.html
*/
  
let toggle = true;
let zoom = 2; ;
var colours = 'blue';
let maxIterations = 100;
let panX = 0; 
let panY = 0;

let minX= -2.5;
let maxX=2;
let minY=1;
let maxY=-1;


function palette(t){
  // http://iquilezles.org/www/articles/palettes/palettes.htm
  // color(t) = a + b * cos[2π(c*t+d)]
    var a = { x:0.5, y:0.5, z:0.5 }
    var b = { x:0.5, y:0.5, z:0.5 }
    var c = { x:1.0, y:1.0, z:1.0 }
    var d = { x:0.0, y:0.1, z:0.2 }
      if (colours==='blue'){
        a = { x:0.5, y:0.5, z:0.5 }
        b = { x:0.5, y:0.5, z:0.5 }
        c = { x:2.0, y:1.0, z:0.0 }
        d = { x:0.50, y:0.20, z:0.25}
      }
     
  return {
    r: (a.x + b.x * cos(TWO_PI * (c.x * t + d.x))) * 255,
    g: (a.y + b.y * cos(TWO_PI * (c.y * t + d.y))) * 255,
    b: (a.z + b.z * cos(TWO_PI * (c.z * t + d.z))) * 255
  }
}
function setup() {
  createCanvas(500,500);
  pixelDensity(1);
  background(0);
}



function draw() {
  let C = new Complex(map(mouseX, 0, width, -2.5, 1), map(mouseY, 0, height, 1, -1))

  loadPixels()
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let Z = new Complex (map(x, 0, width, minX, maxX), map(y, 0, height, minY, maxY ) ) ;
      if (toggle) C = Z.copy()
      
      let bright = julia(Z, C)
      const c = palette(bright)

      const index = (x + y * width) * 4
      pixels[index] = c.r
      pixels[index + 1] = c.g
      pixels[index + 2] = c.b
      pixels[index + 3] = 255
    }
  }
  updatePixels()

  noLoop()
}

function mousePressed() {
 // toggle = !toggle
 // loop()
  panX = map(mouseX, 0, width, minX , maxX);
  panY = map(mouseY, 0, height,  minY, maxY);
  minX= (minX + panX )/zoom;
  maxX= (maxX + panX )/zoom;
  minY= (minY + panY )/zoom;
  maxY= (maxY + panY )/zoom;
}

function mouseMoved() {
  loop()
}

function julia(Z, C) {
  let bright = 0

  for (let n = 0; n <= maxIterations; n++) {
    Z.multSelf(Z.copy()).addSelf(C)

    if (Z.magSquared() > 16) break;
    bright = n / maxIterations;
  }
  return bright;
}



function mandelbrot(Z, C) {
  let bright = 0
  const maxIterations = 50
  for (let n = 0; n <= maxIterations; n++) {
    Z.multSelf(Z.copy()).addSelf(C)

    if (Z.magSquared() > 16) break
    bright = n / maxIterations
  }
  return bright;
}
function reset (){
minX= -2.5;
 maxX=2;
 minY=-1;
 maxY=2.5;


}
