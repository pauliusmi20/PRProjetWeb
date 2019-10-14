function draw() {
       	var canvas = document.getElementById('canvas');

        	for (var i = 0, j = 0; i< 1600; i++ , j+=15)
        	if (canvas.getContext) {
        	var ctx = canvas.getContext('2d');
        		ctx.fillStyle = 'rgba(0, 0, 200, 0.03)';
        		ctx.fillRect(i, i, i, i);
        		/*
        		ctx.fillStyle = 'rgba(200, 0, 0, 0.2)';
        		ctx.fillRect(1600-i,1600- i, i-1000, i-1000);
				*/
			}
}
