var canvas = document.getElementById('playground')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')
var CIRCLES = []
var CIRCLES_NUMBER = 250
var R = window.innerHeight / 5
var DISTORTION = 0

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function chooseColor() {
    colors = ['#fff21d','#d82a83','#07faba','#0000ff']

    return colors[Math.floor(random(0,colors.length - 1))]
}

function frame() {
  requestAnimationFrame(frame)
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  CIRCLES.forEach(function(circle,index) {

    if(Date.now() - circle.createdAt >= 1000) {
      circle.destroy(function() {
          CIRCLES.splice(index,1)
      })
    } else {
      circle.update()
    }
  })
}

frame()

setInterval(function() {

  for(var i = 0; i<CIRCLES_NUMBER;i++) {
    CIRCLES.push(new Ink({number:i,createdAt:Date.now()}))
  }
},500)
