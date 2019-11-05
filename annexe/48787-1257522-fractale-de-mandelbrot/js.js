var width; //Largeur du canvas.
var height; //Hauteur du canvas.
var maxIter; //Pr�cision du dessin.
var minX, maxX, minY, maxY; //Variables permettant de d�finir la zone � dessiner.
var pressed = false; //Permet de savoir si on a press� la souris pour d�finir la zone � zoomer.
var rect; //Rectangle de zoom.
var rectX; //Coordonn�e x du rectangle de zoom.
var rectY; //Coordonn�e y du rectangle de zoom.
var canvas; //Canvas o� est dessin�e la fractale.

//On cr�e le canvas (on ne le fait pas dans le html pour avoir une page valide).
function init() {
	canvas = document.createElement('canvas');
	canvas.height = document.getElementById('size').value;
	canvas.width = document.getElementById('size').value;
	canvas.setAttribute('onmousedown', 'start(event);');
	document.getElementById('canvasDiv').appendChild(canvas);
	draw();
}

//Fonction permettant de convertir les coordonn�es d'un point du canvas en des coordonn�es de nombre complexe.
function coordComplex(coordXY, isX) {
	if(isX)
		return coordXY * ((maxX - minX) / width) + minX;
	return coordXY * ((maxY - minY) / height) + minY;
}

//Fonction permettant de d�terminer si le nombre complexe correspondant � la position (x, y) appartient � l'ensemble de Mandelbrot.
function nbIter(x, y) {
	var iter = 0;
	var zReal = 0;
	var zImag = 0;
	var zRealTmp = 0;
	while (zReal * zReal + zImag * zImag < 4 && iter <= maxIter) {
		zRealTmp = zReal;
		zReal = zReal * zReal - zImag * zImag + coordComplex(x, true);
		zImag = 2 * zRealTmp * zImag + coordComplex(y, false);
		iter++;
	}
	return iter;
}

//Dessine la fractale.
function draw() {
	if (canvas.getContext){
		minX = parseFloat(document.getElementById('minX').value);
		maxX = parseFloat(document.getElementById('maxX').value);
		minY = parseFloat(document.getElementById('minY').value);
		maxY = parseFloat(document.getElementById('maxY').value);
		maxIter = document.getElementById('maxIter').value;
		width = height = document.getElementById('size').value;
		var coordsInv = 'Coordonn�es invalides :\n';
		if(maxX == minX)
			coordsInv += 'maxX = minX.\n';
		if(maxY == minY)
			coordsInv += 'maxY = minY.';
		if(coordsInv != 'Coordonn�es invalides :\n')
			return alert(coordsInv);
		var r = (maxX - minX) / (maxY - minY); //Permet d'adapter la taille du canvas en fonction des coordonn�es donn�es (ou de la zone dessin�e).
		if(r >= 1) {
			width *= r;
		} else {
			height /= r;
		}
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext('2d');
		for(var x = 0; x < width; x++) {
			for(var y = 0; y < height; y++) {
				var iter = nbIter(x, y);
				//Si il existe |Zn|� < 4, le nombre complexe n'appartient pas � l'ensemble de Mandelbrot.
				//On d�termine alors une couleur d�pendant de iter.
				if (iter < maxIter) {
					var color = 255 - Math.floor(255 * (iter / maxIter));
					ctx.fillStyle = 'rgb(' + color + ', ' + color + ', ' + color + ')';
				} else {
					ctx.fillStyle = '#000000';
				}
				ctx.fillRect(x, y, 1, 1);
			}
		}
	} else {
		alert('Vous utilisez un navigateur qui ne supporte pas la technologie Canvas.');
	}
}

//R�cup�re la position de la souris d�s l'appui sur un bouton de la souris.
function start(e) {
	rectX = e.pageX;
	rectY = e.pageY;
	rect = document.createElement('div');
	rect.style.cssText = 'border:solid 1px #000000; background-color:#C0C0C0; opacity:0.5; position:absolute; top:' + e.pageY + 'px; left :' + e.pageX + 'px;';
	document.body.appendChild(rect);
	pressed = true;
}

//Dessine le rectangle lors du mouvement de la souris.
function move(e) {
	if(pressed) {
		if(e.pageX - rectX > 0) {
			rect.style.width = (e.pageX - rectX) + 'px';
		} else {
			rect.style.left = e.pageX + 'px';
			rect.style.width = (rectX - e.pageX) + 'px';
		}
		if(e.pageY - rectY > 0) {
			rect.style.height = (e.pageY - rectY) + 'px';
		} else {
			rect.style.top = e.pageY + 'px';
			rect.style.height = (rectY - e.pageY) + 'px';
		}
	}
}

//Zoome sur la fractale lors du rel�chement de la souris.
function stop(e) {
	if(pressed) {
		document.body.removeChild(rect);
		rectX -= canvas.offsetLeft;
		rectY -= canvas.offsetTop;
		document.getElementById('minX').value= Math.min(coordComplex(rectX, true), coordComplex(e.pageX - canvas.offsetLeft, true));
		document.getElementById('maxX').value = Math.max(coordComplex(rectX, true), coordComplex(e.pageX - canvas.offsetLeft, true));
		document.getElementById('minY').value = Math.min(coordComplex(rectY, false), coordComplex(e.pageY - canvas.offsetTop, false));
		document.getElementById('maxY').value = Math.max(coordComplex(rectY, false), coordComplex(e.pageY - canvas.offsetTop, false));
		draw();
		pressed = false;
	}
}