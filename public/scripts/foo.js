
/*function draw() {
       	var canvas = document.getElementById('canvas');
       	
        	for (var i = 0; i< 1600; i++){
        		if (canvas.getContext) {
        			var ctx = canvas.getContext('2d');
        			ctx.fillStyle = 'rgba(0, 0, 200, 0.03)';
        			ctx.fillRect(i, i, i, i);
        		}
			}
}


*/



function draw() {
	var p1 = new Point (40,50);
	var p2 = new Point (700,800);
	var p3 = new Point (500,500);
	
	var test = new Triangle(p3,100);
	drawLine(p1,p2);
	drawLine(p3,p1);
	drawTriangle(test);
}





