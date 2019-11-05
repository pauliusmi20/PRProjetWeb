Fractale de mandelbrot----------------------
Url     : http://codes-sources.commentcamarche.net/source/48787-fractale-de-mandelbrotAuteur  : macsou01Date    : 28/08/2013
Licence :
=========

Ce document intitulé « Fractale de mandelbrot » issu de CommentCaMarche
(codes-sources.commentcamarche.net) est mis à disposition sous les termes de
la licence Creative Commons. Vous pouvez copier, modifier des copies de cette
source, dans les conditions fixées par la licence, tant que cette note
apparaît clairement.

Description :
=============

Petite application Javascript permettant de repr&eacute;senter la fractale de Ma
ndelbrot et de zoomer sur cette derni&egrave;re.
<br />Si vous voulez juste ess
ayer, l'adresse est la suivante : <a href='http://sd-1.archive-host.com/membres/
up/70845355/mandelbrot/index.html.' target='_blank'>http://sd-1.archive-host.com
/membres/up/70845355/mandelbrot/index.html.</a> Sinon t&eacute;l&eacute;chargez 
le zip qui contient le html, le css et le js.
<br />Si vous constatez un bug ou
 si vous voulez faire une suggestion n'h&eacute;sitez pas.
<br /><a name='sourc
e-exemple'></a><h2> Source / Exemple : </h2>
<br /><pre class='code' data-mode
='basic'>
var width; //Largeur du canvas.
var height; //Hauteur du canvas.
va
r maxIter; //Précision du dessin.
var minX, maxX, minY, maxY; //Variables perme
ttant de définir la zone à dessiner.
var pressed = false; //Permet de savoir si
 on a pressé la souris pour définir la zone à zoomer.
var rect; //Rectangle de 
zoom.
var rectX; //Coordonnée x du rectangle de zoom.
var rectY; //Coordonnée 
y du rectangle de zoom.
var canvas; //Canvas où est dessinée la fractale.

//
On crée le canvas (on ne le fait pas dans le html pour avoir une page valide).

function init() {
	canvas = document.createElement('canvas');
	canvas.height =
 document.getElementById('size').value;
	canvas.width = document.getElementById
('size').value;
	canvas.setAttribute('onmousedown', 'start(event);');
	documen
t.getElementById('canvasDiv').appendChild(canvas);
	draw();
}

//Fonction pe
rmettant de convertir les coordonnées d'un point du canvas en des coordonnées de
 nombre complexe.
function coordComplex(coordXY, isX) {
	if(isX)
		return coo
rdXY * ((maxX - minX) / width) + minX;
	return coordXY * ((maxY - minY) / heigh
t) + minY;
}

//Fonction permettant de déterminer si le nombre complexe corre
spondant à la position (x, y) appartient à l'ensemble de Mandelbrot.
function n
bIter(x, y) {
	var iter = 0;
	var zReal = 0;
	var zImag = 0;
	var zRealTmp =
 0;
	while (zReal * zReal + zImag * zImag &lt; 4 &amp;&amp; iter &lt;= maxIter)
 {
		zRealTmp = zReal;
		zReal = zReal * zReal - zImag * zImag + coordComplex(
x, true);
		zImag = 2 * zRealTmp * zImag + coordComplex(y, false);
		iter++;

	}
	return iter;
}

//Dessine la fractale.
function draw() {
	if (canvas.g
etContext){
		minX = parseFloat(document.getElementById('minX').value);
		maxX
 = parseFloat(document.getElementById('maxX').value);
		minY = parseFloat(docum
ent.getElementById('minY').value);
		maxY = parseFloat(document.getElementById(
'maxY').value);
		maxIter = document.getElementById('maxIter').value;
		width 
= height = document.getElementById('size').value;
		var coordsInv = 'Coordonnée
s invalides :\n';
		if(maxX == minX)
			coordsInv += 'maxX = minX.\n';
		if(m
axY == minY)
			coordsInv += 'maxY = minY.';
		if(coordsInv != 'Coordonnées in
valides :\n')
			return alert(coordsInv);
		var r = (maxX - minX) / (maxY - mi
nY); //Permet d'adapter la taille du canvas en fonction des coordonnées données 
(ou de la zone dessinée).
		if(r &gt;= 1) {
			width *= r;
		} else {
			hei
ght /= r;
		}
		canvas.width = width;
		canvas.height = height;
		var ctx = 
canvas.getContext('2d');
		for(var x = 0; x &lt; width; x++) {
			for(var y = 
0; y &lt; height; y++) {
				var iter = nbIter(x, y);
				//Si il existe |Zn|²
 &lt; 4, le nombre complexe n'appartient pas à l'ensemble de Mandelbrot.
				//
On détermine alors une couleur dépendant de iter.
				if (iter &lt; maxIter) {

					var color = 255 - Math.floor(255 * (iter / maxIter));
					ctx.fillStyle 
= 'rgb(' + color + ', ' + color + ', ' + color + ')';
				} else {
					ctx.fi
llStyle = '#000000';
				}
				ctx.fillRect(x, y, 1, 1);
			}
		}
	} else {

		alert('Vous utilisez un navigateur qui ne supporte pas la technologie Canvas
.');
	}
}

//Récupère la position de la souris dès l'appui sur un bouton de 
la souris.
function start(e) {
	rectX = e.pageX;
	rectY = e.pageY;
	rect = d
ocument.createElement('div');
	rect.style.cssText = 'border:solid 1px #000000; 
background-color:#C0C0C0; opacity:0.5; position:absolute; top:' + e.pageY + 'px;
 left :' + e.pageX + 'px;';
	document.body.appendChild(rect);
	pressed = true;

}

//Dessine le rectangle lors du mouvement de la souris.
function move(e) 
{
	if(pressed) {
		if(e.pageX - rectX &gt; 0) {
			rect.style.width = (e.page
X - rectX) + 'px';
		} else {
			rect.style.left = e.pageX + 'px';
			rect.st
yle.width = (rectX - e.pageX) + 'px';
		}
		if(e.pageY - rectY &gt; 0) {
			r
ect.style.height = (e.pageY - rectY) + 'px';
		} else {
			rect.style.top = e.
pageY + 'px';
			rect.style.height = (rectY - e.pageY) + 'px';
		}
	}
}

/
/Zoome sur la fractale lors du relâchement de la souris.
function stop(e) {
	i
f(pressed) {
		document.body.removeChild(rect);
		rectX -= canvas.offsetLeft;

		rectY -= canvas.offsetTop;
		document.getElementById('minX').value= Math.min
(coordComplex(rectX, true), coordComplex(e.pageX - canvas.offsetLeft, true));
	
	document.getElementById('maxX').value = Math.max(coordComplex(rectX, true), coo
rdComplex(e.pageX - canvas.offsetLeft, true));
		document.getElementById('minY'
).value = Math.min(coordComplex(rectY, false), coordComplex(e.pageY - canvas.off
setTop, false));
		document.getElementById('maxY').value = Math.max(coordComple
x(rectY, false), coordComplex(e.pageY - canvas.offsetTop, false));
		draw();
	
	pressed = false;
	}
}
</pre>
<br /><a name='conclusion'></a><h2> Conclusion
 : </h2>
<br />Ca reste assez lent mais on peut pas vraiment faire mieux je pe
nse en Javascript (j'ai utilis&eacute; Canvas pour la repr&eacute;sentation grap
hique).
<br />PS : j'ai un peu comment&eacute; le javascript, mais pour mieux c
omprendre, il est mieux de conna&icirc;tre les nombres complexes et de se rensei
gner sur la fractale de Mandelbrot.
