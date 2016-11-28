var canvas = document.getElementById('playground')
var TOTAL = 10
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext('2d')
var mouse = {x:window.innerWidth / 2,y:window.innerHeight / 2}

window.addEventListener('mousemove',function(e){
  if(e.clientX) {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }
})
var Rect = function(number,color) {

  var width = window.innerWidth / TOTAL
  var height = window.innerHeight
  this.number = number
  this.width = width
  this.height = height
  this.color = color
  this.pos = {x:0 + (width*number),y:0}
  this.distance = width / 2
  this.easing = 0.1
  this.cpos = {
    x:this.width,
    y:this.pos.y
  }
  this.cposEnd = {
    x:this.width,
    y:this.pos.y
  }
}

Rect.prototype.update = function() {

    this.cpos.x += (mouse.x - this.cpos.x) * this.easing
    this.cposEnd.x += (mouse.x - this.cpos.x) * this.easing

    this.cposEnd.y = mouse.y
    this.cpos.y = mouse.y

    if(this.number == 0) {
      this.cposEnd.x = 0
    }

    this.draw()
}

Rect.prototype.draw = function() {
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.strokeStyle = this.color

  ctx.moveTo(this.pos.x,this.pos.y)

  ctx.lineTo(this.pos.x + this.width,this.pos.y)

  ctx.quadraticCurveTo(
    this.cpos.x,
    this.cpos.y,
    this.pos.x + this.width,
    this.pos.y + this.height
  )

  ctx.lineTo(
    this.pos.x,
    this.pos.y + this.height
  )

  ctx.quadraticCurveTo(
    this.cposEnd.x,
    this.cposEnd.y,
    this.pos.x,
    this.pos.y
  )

  ctx.fill()
  ctx.stroke()
  ctx.closePath()

}

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
var rects_array = []
for(var i =0;i<TOTAL;i++) {
  console.log('#00' + i + i + i + i)
  rects_array.push(new Rect(i,'#00' + i + i + i + i))
}

function frame() {
  requestAnimationFrame(frame)
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  for(var a = 0;a<rects_array.length;a++) {
    rects_array[a].update()
  }
}

frame()
