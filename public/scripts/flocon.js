class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
		
	pMoy(a) {
		return new Point((this.x + a.x)/2 , (this.y + a.y)/2 );
	}
}

function getDistance (p1 , p2){
	return Math.sqrt( Math.pow( p1.x - p2.x, 2 ) + Math.pow( p1.y - p2.y));
}

class Line{
	constructor(p1,p2){
		this.p1 = p1;
		this.p2 = p2;
	}
	
	getSmallerLines() {
		var a = new Point((this.p1.x + this.p2.x)/3, (this.p1.y + this.p2.y)/3  );
		var b = new Point( a.x , a.y - getDistance(this.p1, a) );
		var c = new Point( a.x*2 , a.y*2 );
		return [
			new Line(this.p1, a),
			new Line(a,b),
			new Line(b,c),
			new Line(c,this.p2)];
	}
}


function drawLine(a){
	var canvas = document.getElementById('canvas');
	 	if (canvas.getContext) {	
    		var ctx = canvas.getContext('2d');
    		ctx.beginPath();
    		ctx.moveTo(a.p1.x , a.p1.y); 
    		ctx.lineTo(a.p2.x , a.p2.y);
    		ctx.stroke();
    	}
}

function getListSmallerLines(a){
	var res=[];
	for (var i = 0; i<a.length ; i++){
		var temp = a[i].getSmallerLines();
		for ( var j = 0; j< temp.length ; j++){
			res.unshift(temp[j]);
		}
	}
	return res;
}


function getListLinesN(n,a){
	var res = [];
	for (var i=0; i<n; i++){
		res = getListSmallerLines(res);
	}
	return res;
}



/*		renvoie liste de lignes telle qu'eelles forment un triangle, centrer au milleur de longeur de cote  = l*/

function newListLinesCenter(l){
	var canvas = document.getElementById('canvas');
	var b = new Point((canvas.width-l)/2,(canvas.height- ( Math.sqrt((l**2) - (( l/2)**2) ) )  -l )/2 );
	
	var a = new Point( b.x + l/2, b.y + Math.sqrt( l**2 - (l/2)**2 ) );
	var c = new Point(b.x+l, b.y  );
	
	var l1 = new Line (b,a);
	var l2 = new Line ( a ,c);
	var l3 = new Line (c ,b );
	return [l1 , l2, l3];
										
}
		
function drawLines(a){
	for(var i=0; i<a.length; i++){
		drawLine(a[i]);	
	}
}

function reset () {
	var canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
	reset ();
	var p1 = new Point (100,100);
/*
	var n = document.getElementById("n").value;
	var size = document.getElementById("size").value;

	var temp = newTriangle(p1,500);
	
	var temp = temp.getListTriangles();
	var temp = getListTrianglesN(n,temp);
	drawLesTriangles(temp);*/
	
	var test = newListLinesCenter(400);
	var temp = getListSmallerLines(test);
	drawLines(test);
	
}


