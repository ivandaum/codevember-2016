// Functions
function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function circlePoint(ratio,number,count) {
  number++

  var radian = (number * (Math.PI * 2)) / count
  return {
    x: ratio * Math.cos(radian),
    y: ratio * Math.sin(radian)
  }
}

var R = Math.min(window.innerHeight,window.innerWidth) / 8
var TOTAL = 2000
var RATIO = 6

// Object
var Point = function(number) {
  this.number = number

  this.variations = {
    x: random((window.innerWidth / 2) - 100, window.innerWidth / 2 ),
    y: random(window.innerHeight / 2 - 100, window.innerHeight / 2 + 100)
  }

  this.position = circlePoint(R,number,TOTAL)

  this.ratio = RATIO

  this.position.x += this.variations.x
  this.position.y += this.variations.y

  this.initPosition = this.position

  this.size = 1
  this.rotate = 0

  this.easing = this.number * 0.1
}

Point.prototype.update = function() {

  var end = 360 * this.easing
  var next = circlePoint(R,this.rotate,end)


  this.position.x = this.variations.x + next.x
  this.position.y = this.variations.y + next.y

  this.rotate++

  if(this.rotate>=end) this.rotate = 0

  this.draw()
}

Point.prototype.draw = function() {
  ctx.beginPath()
  ctx.fillStyle = '#fff'
  ctx.arc(this.position.x,this.position.y,this.size,0,Math.PI * 2)
  ctx.fill()
  ctx.closePath()
}

var canvas = document.getElementById('playground')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext('2d')
var Points = []

for(var a=0; a<TOTAL; a++) {
  Points.push(new Point(a))
}


function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  requestAnimationFrame(frame)
  for(var i=0;i<Points.length;i++) {
    Points[i].update()
  }
}

frame()
