var canvas = document.getElementById('playground')
var mouse = {x:window.innerWidth / 2,y:window.innerWidth / 2}
var isClicked = false;
var PARTICULES = []
var colors = ['#FFD54F','#EF5350','#FFA726']
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

canvas.addEventListener('mousedown', function() {
  isClicked = true
})

canvas.addEventListener('mouseup', function() {
  isClicked = false
})

canvas.addEventListener('mousemove', function(e) {

    if(e.clientX) {
        mouse = {x:e.clientX,y:e.clientY}
    } else {
        mouse = {x:window.innerWidth / 2,y:window.innerHeight /2 }
    }
})

function generateParticules() {
  requestAnimationFrame(generateParticules)

  var particule = new Particule({
    size: random(15,20),
    ctx:ctx,
    x:random(0,window.innerWidth),
    y:random(0,window.innerHeight),
    color: colors[Math.floor(random(0,colors.length))]

  })

  PARTICULES.push({item:particule,created_at:Date.now()})

}
generateParticules()

function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  requestAnimationFrame(frame)


  for(var i=0; i<PARTICULES.length;i++) {
    if(typeof PARTICULES[i].item != 'undefined' && Date.now() - PARTICULES[i].created_at >= 3000) {
      PARTICULES.splice(i,1);
    } else {
      PARTICULES[i].item.update()
    }
  }

}

frame()
