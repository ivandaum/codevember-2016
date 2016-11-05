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

var R = 300
var number = 0

function generateParticules() {
  requestAnimationFrame(generateParticules)

  if(random(0,100) < 95) return

  for(var i = 0;i<15;i++) {

    var position = {
      x:random((window.innerWidth /2) - 200, (window.innerWidth /2) + 200),
      y: random((window.innerHeight / 2) - 200, (window.innerHeight / 2) + 200)
    }
/*
    if(number == 1) {
      position = {
        x:(window.innerWidth / 2) - 200,
        y:(window.innerHeight / 2)
      }
    }

    if(number == 2) {
      position = {
        x:(window.innerWidth / 2) + 200,
        y:(window.innerHeight / 2)
      }
    }

    if(number == 3) {
      position = {
        x:(window.innerWidth / 2) - 100,
        y:(window.innerHeight / 2) + 100
      }
    }

    if(number == 0) {
      position = {
        x:(window.innerWidth / 2) - 100,
        y:(window.innerHeight / 2) + 100
      }
    }
    */

    previous = false

    if(typeof PARTICULES[PARTICULES.length - 1] != 'undefined') {
      previous = PARTICULES[PARTICULES.length - 1].item
    }

    var particule = new Particule({
      size: 1,
      ctx:ctx,
      x:position.x,
      y:position.y,
      previous:previous
    })

    PARTICULES.push({item:particule,created_at:Date.now()})


    number = number > 3 ? 0 : number+1
  }
}

generateParticules()

function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  requestAnimationFrame(frame)

  for(var i=0; i<PARTICULES.length;i++) {
    if(typeof PARTICULES[i].item != 'undefined' && Date.now() - PARTICULES[i].created_at >= 500) {

      PARTICULES[i].item.destroy()
      PARTICULES.splice(i,1);
    } else {
      PARTICULES[i].item.update()
    }
  }

}

frame()
