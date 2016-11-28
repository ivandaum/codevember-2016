var TOTAL = 100
var VARIATION = 30
var canvas = document.getElementById('playground')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext('2d')

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

var Point = function(number,R,color) {

  this.intensity = 1
  this.number = number
  this.easing = random(0.01,0.0001)
  this.color = color || '#23f2ef'
  this.size = 1
  this.destroy = false
  this.intensity = 1
  this.R = R
  this.position = circlePoint(this.R,number,TOTAL)

  this.variation = VARIATION
  this.movement = circlePoint(this.R + this.variation, number, TOTAL)

  this.position.x += window.innerWidth / 2
  this.position.y += window.innerHeight / 2

  this.movement.x += window.innerWidth / 2
  this.movement.y += window.innerHeight / 2
}

Point.prototype.update = function() {

  this.variation -= 1.5
  if(this.variation <= 0) {
    this.variation = 105
  }
  this.movement = circlePoint(this.R + this.variation, this.number, TOTAL)

  this.movement.x += window.innerWidth / 2
  this.movement.y += window.innerHeight / 2

  this.position.x += (this.movement.x - this.position.x) * this.easing
  this.position.y += (this.movement.y - this.position.y) * this.easing

}

var Thing = function(R,color) {
  this.Points = []
  this.R = R
  for(var a=0; a<TOTAL; a++) {
    this.Points.push(new Point(a,this.R,color))
  }
}

Thing.prototype.draw = function() {

  ctx.beginPath()


  var first = this.Points[0]

  ctx.moveTo(first.position.x,first.position.y)

  for(var i=0;i<this.Points.length;i++) {

    var point = this.Points[i]
    this.Points[i].update()

    ctx.fillStyle = point.color

    var next = first

    if(typeof this.Points[i+1] != 'undefined') {
      next = this.Points[i+1]
    }

    ctx.quadraticCurveTo(
      point.position.x,
      point.position.y,
      next.position.x,
      next.position.y
    )
  }

  ctx.fill()
  ctx.closePath()
}
var things = []
for(var i=0;i<15;i++) {
  things.push(new Thing(Math.min(window.innerHeight,window.innerWidth) / (i + 1),'#cc' + i + i + '25'))
}
// var thing = new Thing(Math.min(window.innerHeight,window.innerWidth) / 6)
// var thing2 = new Thing(Math.min(window.innerHeight,window.innerWidth) / 7,'#fff')
// var thing3 = new Thing(Math.min(window.innerHeight,window.innerWidth) / 9,'#ff3300')
console.log(things)
function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  requestAnimationFrame(frame)

  for(var i=0;i<things.length;i++) {
    things[i].draw()
  }
}

frame()
