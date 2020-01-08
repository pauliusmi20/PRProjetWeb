/*
	Based on @Shiffman / The coding train
  https://thecodingtrain.com/CodingChallenges/021-mandelbrot-p5.html
	https://thecodingtrain.com/CodingChallenges/022-juliaset.html
*/

let toggle = false

function palette(t){
  // http://iquilezles.org/www/articles/palettes/palettes.htm
  // color(t) = a + b * cos[2π(c*t+d)]
	const a = { x:0.5, y:0.5, z:0.5 }
	const b = { x:0.5, y:0.5, z:0.5 }
	const c = { x:1.0, y:1.0, z:1.0 }
	const d = { x:0.0, y:0.1, z:0.2 }
  
	return {
    r: (a.x + b.x * cos(TWO_PI * (c.x * t + d.x))) * 255,
		g: (a.y + b.y * cos(TWO_PI * (c.y * t + d.y))) * 255,
		b: (a.z + b.z * cos(TWO_PI * (c.z * t + d.z))) * 255
  }
}

function setup() {
  createCanvas(300,300)
  pixelDensity(1)
  background(255)
  loadPixels();
  for (var x = 0 ; x< width; x++){
    for(var y = 0 ; y<height; y++)
  }
}

function draw() {

  renderjulia();
  updatePixels()

  noLoop()
}

function renderjulia(){
  let C = new Complex(map(mouseX, 0, width, -2.5, 1), map(mouseY, 0, height, 1, -1))

  loadPixels()
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let Z = new Complex(map(x, 0, width, -2.5, 1), map(y, 0, height, 1, -1))
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
function rendermandelbrot(){

}


function mousePressed() {
  toggle = !toggle;
  loop()
}

function mouseMoved() {
  loop()
}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  pos += event.delta;
  //uncomment to block page scrolling
  //return false;


function julia(Z, C) {
  let bright = 0
  const maxIterations = 50
  for (let n = 0; n <= maxIterations; n++) {
    Z.multSelf(Z.copy()).addSelf(C)

    if (Z.magSquared() > 16) break

    bright = n / maxIterations
  }
  return bright
}

f
function mandelbrot(Z, C) {
  let bright = 0
  const maxIterations = 50
  for (let n = 0; n <= maxIterations; n++) {
    Z.multSelf(Z.copy()).addSelf(C)

    if (Z.magSquared() > 16) break

    bright = n / maxIterations
  }
  return bright
}