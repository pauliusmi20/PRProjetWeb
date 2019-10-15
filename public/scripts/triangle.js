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
/*	constructor(a, b, c){
		this.a = a;
		this.b = b;
		this.c = c;
	} */
	constructor(b, l){
		this.a = new Point( b.x + l/2, b.y + Math.sqrt( l**2 - (l/2)**2 ) );
		this.b = b;
		this.c = new Point(b.x+l, b.y );
	}
	
	getListTriangles(){
		var triangles = new Array();
		
		var ab = this.a.pMoy(b);
		var ac = this.a.pMoy(c);
		var bc = this.b.pMoy(c);
		
			triangles.unshift(new Triangle(a,ab,ac) );
			triangles.unshift(new Triangle(ab,b,bc) );
			triangles.unshift(new Triangle(ab,bc,ac));
			triangles.unshift(new Triangle(ac,bc,c) );
		return triangles;
	} 	
}
	
function drawLine(a,b){
	var canvas = document.getElementById('canvas');
	 	if (canvas.getContext) {	
    		var ctx = canvas.getContext('2d');
    		ctx.beginPath();
    		ctx.moveTo(a.x,a.y); 
    		ctx.lineTo(b.x,b.y);
    		ctx.stroke();
    	}
}


function drawTriangle(n){
	drawLine(n.a , n.b);
	drawLine(n.b , n.c);
	drawLine(n.c , n.a);
}

function drawLesTriangles(a){
}



function getListPoint(){} 
