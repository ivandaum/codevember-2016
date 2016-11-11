var canvas = document.getElementById('playground')
var ctx = canvas.getContext('2d')
var PARTICULES = []
var SPACEBAR = false
var mouse = {x:window.innerWidth /2,y:window.innerHeight /2}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

window.addEventListener('keypress', function(e) {
  if(e.code == 'Space') SPACEBAR = !SPACEBAR
})
window.addEventListener('click',function(e) {
    mouse = {
      x:e.clientX,
      y:e.clientY
    }
    for(var x=0;x<100;x++) {
      var star = new Star(mouse.x,mouse.y)
      PARTICULES.push({star:star,created_at:Date.now()})
    }
})


function init() {
  requestAnimationFrame(init)
    if(SPACEBAR) {
      for(var x=0;x<10;x++) {
        var star2 = new Star(mouse.x,mouse.y)
        PARTICULES.push({star:star2,created_at:Date.now()})
      }
    }
    var star = new Star(window.innerWidth / 2,window.innerHeight / 2)
    PARTICULES.push({star:star,created_at:Date.now()})
}

init()

function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  requestAnimationFrame(frame)

  var text = 'Clic to generate some cool explosion / Press spacebar to '

  text += SPACEBAR == true ? 'go slower' : 'go faster'

  ctx.beginPath()
  ctx.font="15px Arial";
  ctx.fillStyle = '#000'
  ctx.fillText(text,50,window.innerHeight - 50 );
  ctx.fill()
  ctx.closePath()

  for(var i=0;i<PARTICULES.length;i++) {

    if(typeof PARTICULES[i].star != 'undefined' && Date.now() - PARTICULES[i].created_at >= 1500) {
      PARTICULES[i].star.destroy();
    } else {
      PARTICULES[i].star.update()
    }

  }
}

frame()
