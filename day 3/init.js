var canvas = document.getElementById('playground')
var mouse = {x:0,y:0}
var PARTICULES = []
var DISTORTION = 1;
var POSITIONS = []

for(var n=-300;n<=0;n=n+10) {

  var positionY = random(-190,-200);

  var offset = 30
  var rotation = (n / 2)

  POSITIONS.push([n,random(-45,-55)])
  POSITIONS.push([n-offset,random(45,55)])

  POSITIONS.push([(positionY - 100 - rotation),n+offset+100])
  POSITIONS.push([(positionY - rotation),n+offset+100])
}


var R = 70
for(var n=0;n<=300;n=n+10) {
  var radian = (300 + (n * Math.PI) / 280)
  var arcPosition = {
    x:50,
    y:-90
  }
  POSITIONS.push([arcPosition.x + R * Math.cos(radian),(arcPosition.y) + R * Math.sin(radian)])
  POSITIONS.push([arcPosition.x + R * Math.cos(radian),(arcPosition.y+140) + R * Math.sin(radian)])

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
      size:random(1,15),
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
