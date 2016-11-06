var canvas = document.getElementById('playground')
var colors = ['#FFD54F','#EF5350','#FFA726','darkgreen','cyan']
var mouse = {x:window.innerWidth / 2,y:window.innerHeight /2 }

COLOR = colors[0]

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

    //mouse = {x:window.innerWidth / 2,y:window.innerHeight /2 }
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight)
    //weirdo.update()
})


var weirdo = new Weirdo({
  segmentCount:100,
  ctx:ctx,
  width:50
})


function frame() {
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight)
  requestAnimationFrame(frame)
  weirdo.update()
}
frame()

function changeColor() {

  var rand = Math.floor(random(0,colors.length - 1))
  var i = colors.indexOf(COLOR)

  if(i+1 == colors.length) i = 0
  else i++

  COLOR = colors[i]
}

canvas.addEventListener('click', function() {
    changeColor()
})

setInterval(function(){

},1000)
