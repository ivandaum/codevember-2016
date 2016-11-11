var canvas = document.getElementById('playground')
var ctx = canvas.getContext('2d')
var PARTICULES = []
var mouse = {x:window.innerWidth /2,y:window.innerHeight /2}
var circle = new Circle()
var INTERVAL = 250
var SPACEBAR = false

PARTICULES.push({circle:circle,created_at:Date.now()})
window.addEventListener('keypress', function(e) {
  if(e.code == 'Space') SPACEBAR = !SPACEBAR
})
window.addEventListener('mousemove', function(e) {
  mouse = {
    x:e.clientX,
    y:e.clientY
  }
})

function init() {
  var interval = setInterval(function() {
    var circle = new Circle(mouse.x,mouse.y)
    PARTICULES.push({circle:circle,created_at:Date.now()})

    INTERVAL -= SPACEBAR == true ? -10 : 10

    if(INTERVAL <= 50) INTERVAL = 50
    if(INTERVAL >= 250) INTERVAL = 250

    clearInterval(interval)
    init()
  },INTERVAL)
}

init()

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function frame() {
  requestAnimationFrame(frame)
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  var text = 'Press spacebar to '

  text += SPACEBAR == true ? 'go faster' : 'go slower'

  ctx.beginPath()
  ctx.font="15px Arial";
  ctx.fillStyle = '#000'
  ctx.fillText(text,50,window.innerHeight - 50 );
  ctx.fill()
  ctx.closePath()

  for(var i=0;i<PARTICULES.length;i++) {

    if(typeof PARTICULES[i].circle != 'undefined' && Date.now() - PARTICULES[i].created_at >= 1500) {
      PARTICULES[i].circle.destroy(function() {
        PARTICULES.splice(i,1);
      });
    } else {
      PARTICULES[i].circle.update()
    }

  }

}

frame()
