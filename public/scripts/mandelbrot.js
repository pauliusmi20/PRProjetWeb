let isZooming = false;
let toggle = false;
let zoom = 2; ;
let maxIterations = 250 ; //document.getElementById('maxIterations').value;
let panX = 0; 
let panY =0 ;
//var colours = 'a' ; 
 let minX= -2.5;
 let maxX=2;
let  minY=-1;
 let maxY=2.5;

let init = true;
function palette(t, colours){
  // http://iquilezles.org/www/articles/palettes/palettes.htm
  // color(t) = a + b * cos[2π(c*t+d)]
    var a = { x:0.5, y:0.5, z:0.5 }
    var b = { x:0.5, y:0.5, z:0.5}
    var c = { x:1.0, y:1.0, z:1.0 }
    var d = { x:0.0, y:0.1, z:0.2 }
      if (colours==='a'){
        a = { x:0.5, y:0.5, z:0.5 }
        b = { x:0.5, y:0.5, z:0.5 }
        c = { x:2.0, y:1.0, z:0.0 }
        d = { x:0.50, y:0.20, z:0.25 }
      }else if (colours==='b'){
        a = { x:0.5, y:0.5, z:0.5}
        b = { x:0.5, y:0.5, z:0.5}
        c = { x:2.0, y:1.0, z:0.0 }
        d = { x:0.50, y:0.20, z:0.25 }
      }else if (colours==='c'){
        a = { x:0.5, y: 0.5, z: 0.5}  
        b = { x:0.5, y: 0.5, z: 0.5}
        c = { x:1.0, y: 1.0, z: 1.0}
        d = { x:0.30,y:  0.20 , z:0.20}  
      }else if (colours==='d'){
        a ={ x:0.5, y: 0.5, z: 0.5}   
        b={ x:0.5, y: 0.5, z: 0.5}
        c={ x:1.0, y: 1.0, z: 0.5}
        d={ x:0.80,y:  0.90 ,z: 0.30} 
      }
      else if (colours==='e'){
        a ={ x:0.5, y: 0.5, z: 0.5}   
        b={ x:0.5, y: 0.5, z: 0.5} 
        c={ x:1.0, y: 0.7, z: 0.4} 
        d={ x:0.00,y:  0.15 ,z: 0.20}  
        }
      else if (colours==='f'){
        a ={ x:0.5, y: 0.5, z: 0.5}   
        b={ x:0.5, y: 0.5, z: 0.5} 
        c={ x:2.0, y: 1.0, z: 0.0} 
        d={ x:0.50,y:  0.20 ,z: 0.25}  
      }
      else if (colours==='g'){
        a ={ x:0.8, y: 0.5, z: 0.4}   
        b={ x:0.2, y: 0.4, z: 0.2} 
        c={ x:2.0, y: 1.0, z: 1.0} 
        d={ x:0.00,y:  0.25 ,z: 0.25} 
      }
return {
    r: (a.x + b.x * cos(TWO_PI * (c.x * t + d.x))) * 255,
    g: (a.y + b.y * cos(TWO_PI * (c.y * t + d.y))) * 255,
    b: (a.z + b.z * cos(TWO_PI * (c.z * t + d.z))) * 255
  }
}
function setup() {
  createCanvas(1000 ,1000);
  pixelDensity(1);
  background(0);
}
/*selectElem.addEventListener('change', function() {
  var index = selectElem.selectedIndex;
  // Rapporter cette donnée au <p>
  pElem.innerHTML = 'selectedIndex: ' + index;
})
 */
/*
  if (type ==='magicselect'){
    toggle=false;
    return new Complex(map(mouseX, 0, width, -2.5, 1), map(mouseY, 0, height, 1, -1) );
  }else if (type==='mandelbrot') {
    toggle=true;
    return;
*/
const gr = (1 + Math.sqrt(5))/2; // nombre d'or 
const julia1 = new Complex(0.285,0) ; 

const julia2 = new Complex(0.285,0) ; 
const julia3 = new  Complex(0.285 , 0.01);
const julia4 = new Complex( 0.45, 0.1428)  ; 
const julia5 = new Complex(-0.70176, 0.3842) ; 
const julia6 = new Complex(-0.835 ,-0.2321) ; 
const julia7 = new Complex(-0.8, 0.156) 
const julia8 = new Complex(-0.7269,  0.1889) ;
const goldenratio = new Complex(1-gr, 0) ;

//on choisis le type de fractale;
function chooseConstant(type) {
  if (type==="julia1"){
     C = julia1 ;
 }else if (type === "mandelbrot"){
    toggle=true;
  }else if  (type==="julia2"){
     toggle=false;
     C = julia2;
  }else if  (type==="julia3"){
    toggle=false;
    C = julia3 ;
  }else if  (type==="julia4"){
    toggle=false;
    C = julia1;
  }else if  (type==="julia5"){
     toggle=false;
     C = julia5
  }else if  (type==="julia6"){
      toggle=false;
      C = julia6
  }else if  (type==="julia7"){
      toggle=false;
         C = julia7;
  }else if  (type==="julia8"){
      toggle=false; 
         C = julia8;
  }else if  (type==="goldenratio"){
       toggle=false;
        C = goldenratio;
  }
}
//fonction anonyme inutile
()=>{
  if (init){  
    let Ctemp =chooseConstant();
    console.log(Ctemp);//= new Complex(map(mouseX, 0, width, -2.5, 1), map(mouseY, 0, height, 1, -1) );
    init= false;
  }
  c = Ctemp;
}

//DATE DES DONNEES AVANT DRAW
var typeSelected = document.getElementById('fractal');
var constantSelected = typeSelected.options[typeSelected.selectedIndex].value ;
console.log('init :'  + constantSelected);

typeSelected.addEventListener('change', () =>{
      temp = document.getElementById('fractal');
      constantSelected =temp.options[temp.selectedIndex].value;
      console.log('sucess:'+ constantSelected);
      reset();
});
var colourSelected = document.getElementById('colours');
var colours = colourSelected.options[colourSelected.selectedIndex].value;;
colourSelected.addEventListener('change', () =>{
      temp = document.getElementById('colours');
      colours = temp.options[temp.selectedIndex].value;
      console.log('sucess:'+ colours);

});

document.getElementById('iterations').addEventListener('change', ()=>{
  maxIterations = document.getElementById('iterations').value;
});

function draw() {

  type = constantSelected;
  if (type==="julia1"){
     C = julia1 ;
 }else if (type === "mandelbrot"){
    toggle=true;
  }else if  (type==="julia2"){
     toggle=false;
     C = julia2;
  }else if  (type==="julia3"){
    toggle=false;
    C = julia3 ;
  }else if  (type==="julia4"){
    toggle=false;
    C = julia1;
  }else if  (type==="julia5"){
     toggle=false;
     C = julia5
  }else if  (type==="julia6"){
      toggle=false;
      C = julia6
  }else if  (type==="julia7"){
      toggle=false;
         C = julia7;
  }else if  (type==="julia8"){
      toggle=false; 
         C = julia8;
  }else if  (type==="goldenratio"){
       toggle=false;
        C = julia9;
  }
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let Z = new Complex (map(x, 0, width, minX, maxX), map(y, 0, height, minY, maxY ) ) ;
      if (toggle) C = Z.copy();
      let bright = julia(Z, C);
      const c = palette(bright, colours);
      const index = (x + y * width) * 4;
      if (bright = 0){
        pixels[index] = 255;
        pixels[index + 1] = 255;
        pixels[index + 2] = 255;
        pixels[index + 3] = 255;  
      }else{
        pixels[index] = c.r;
        pixels[index + 1] = c.g;
        pixels[index + 2] = c.b;
        pixels[index + 3] = 255;  
      }
      
    }
  }
  updatePixels();
}

function mousePressed() {
 // toggle = !toggle
  panX = map(mouseX, 0, width, minX , maxX);
  panY = map(mouseY, 0, height,  minY, maxY);
  minX= (minX + panX )/zoom;
  maxX= (maxX + panX )/zoom;
  minY= (minY + panY )/zoom;
  maxY= (maxY + panY )/zoom;
}


function julia(Z, C) {
  let bright = 0
  for (let n = 0; n <= maxIterations; n++) {
    Z.multSelf(Z.copy()).addSelf(C);
    if (Z.magSquared() > 16) break;
    bright = n / maxIterations;
  }
  return bright;
}

function zoomOut(){
  minX*=zoom;
  maxY*=zoom;
  minY*=zoom;
  maxY*=zoom;
}
//on remet à zero
function reset (){
  minX= -2.5;
  maxX=2;
  minY=-1;
  maxY=2.5;
}
//sauvegarde l'image
function saveImage(){
  let canvas = document.getElementById('defaultCanvas0');
  let image = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  window.location.href=image;
}


