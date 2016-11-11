var canvas = document.getElementById('playground')
var ctx = canvas.getContext('2d')
var PARTICULES = []

var first = new Ball()
PARTICULES.push({ball:first,created_at:Date.now()})

window.addEventListener('click',function(e) {
  var ball = new Ball(e.clientX,e.clientY)
  PARTICULES.push({ball:ball,created_at:Date.now()})
})

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function frame() {
  requestAnimationFrame(frame)
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  ctx.beginPath()
  ctx.font="30px Arial";
  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.fillText('CLICK ME',window.innerWidth /2 - 100,window.innerHeight / 2);
  ctx.closePath()

  for(var i=0;i<PARTICULES.length;i++) {
    if(typeof PARTICULES[i].ball != 'undefined' && Date.now() - PARTICULES[i].created_at >= 5000) {
      PARTICULES[i].ball.destroy(function() {
        PARTICULES.splice(i,1);
      });
    } else {
      PARTICULES[i].ball.update()
    }
  }

}

frame()
