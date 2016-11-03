var canvas = document.getElementById('playground')
var mouse = {x:0,y:0}
var PARTICULES = []

var POSITIONS = []

for(var n=-100;n<=100;n=n+10) {
  POSITIONS.push([n,random(-95,-105)])
}

for(var n=100;n>0;n=n-10) {
  POSITIONS.push([n-15,n])
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')


function random(min, max) {
  return Math.random()*(max-min+1)+min
}

canvas.addEventListener('mousemove', function(e) {
  if(e.clientX) {
      mouse = {x:e.clientX,y:e.clientY}
  } else {
      mouse = {x:window.innerWidth / 2,y:window.innerHeight /2 }
  }
})

var position = {
  x: window.innerWidth / 2,
  y : window.innerHeight / 2
}

for(var x=0;x<POSITIONS.length;x++) {
    var particule = new Particule({
      size:random(5,15),
      ctx:ctx,
      x:position.x + POSITIONS[x][0],
      y:position.y + POSITIONS[x][1]

    })

    PARTICULES.push(particule)
}


function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  requestAnimationFrame(frame)
  for(var i =0;i<PARTICULES.length;i++) {
    PARTICULES[i].update()
  }
}

frame()
