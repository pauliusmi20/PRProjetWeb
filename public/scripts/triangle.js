class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
		
	pMoy(a) {
		return new Point((this.x + a.x)/2 , (this.y + a.y)/2 )
	}
}

class Triangle{
	constructor(a, b, c){
		this.a = a;
		this.b = b;
		this.c = c;

	}
	getListTriangles(){

		var ab = this.a.pMoy(this.b);
		var ac = this.a.pMoy(this.c);
		var bc = this.b.pMoy(this.c)
		
		return [ new Triangle(this.a,ab,ac),
				 new Triangle(ab,this.b,bc),
				 new Triangle(ac,bc,this.c)] ;
	} 	
}
/*
function newTriangle(l){
	var canvas = document.getElementById('canvas');
	var b = new Point((canvas.width-l)/2,(canvas.height- ( Math.sqrt((l**2) - (( l/2)**2) ) )  -l )/2 );
	
	var a = new Point( b.x + l/2, b.y + Math.sqrt( l**2 - (l/2)**2 ) );
	var c = new Point(b.x+l, b.y  );
	
	var l1 = new Line (b,a);
	var l2 = new Line ( a ,c);
	var l3 = new Line (c ,b );
	return [l1 , l2, l3];
										
}
*/
function newTriangle(l){
	var canvas = document.getElementById('canvas');
	var b = new Point((canvas.width-l)/2,(canvas.height- ( Math.sqrt((l**2) - (( l/2)**2) ) )  -l )/2 );
	var a = new Point( b.x + l/2, b.y + Math.sqrt( l**2 - (l/2)**2 ) );
	var c = new Point(b.x+l, b.y  );

	return new Triangle(a,b,c);
}
	
function drawLine(a,b){
	var canvas = document.getElementById('canvas');
	 	if (canvas.getContext) {	
    		var ctx = canvas.getContext('2d');
    		ctx.beginPath();
    		ctx.moveTo(a.x , a.y); 
    		ctx.lineTo(b.x , b.y);
    		ctx.stroke();
    	}
}

function getListTrianglesSmaller(a){
	var res = a.slice();
	for (var i=0 ; i<a.length;i++){
		var temp = a[i].getListTriangles();
		for (var j=0 ; j<temp.length ;j++){
			res.unshift(temp[j]);
		}	
	}	
	return res;	
}

function getListTrianglesN(n,a){
	var res = a;
	for (var i=0; i<n; i++){
		res = getListTrianglesSmaller(res);
	}
	return res;
}

function drawTriangle(n){
	drawLine(n.a , n.b);
	drawLine(n.b , n.c);
	drawLine(n.c , n.a);
}



function drawLesTriangles(a){
	for(var i=0; i<a.length; i++){
		drawTriangle(a[i]);		
	}
}


function reset () {
	var canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTriangleMain() {
	reset ();
	var p1 = new Point (100,100);

	var n = document.getElementById("n").value;
	var size = document.getElementById("size").value;

	var temp = newTriangle(parseInt(size));
	
	var temp = temp.getListTriangles();
	var temp = getListTrianglesN(n,temp);
	drawLesTriangles(temp);
}

