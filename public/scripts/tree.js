function draw(startX, startY, len, angle) {

  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {  

    var ctx = canvas.getContext('2');
 
   ctx.beginPath();
   ctx.save();
  
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
   ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();
  
    if(len < 10) {
      ctx.restore();
    return;
    }
  
    draw(0, -len, len*0.8, -15);
    draw(0, -len, len*0.8, 15);
  
    ctx.restore();
  }

}
/