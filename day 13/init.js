var canvas = document.getElementById('playground')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext('2d')
PARTICULES = []
PARTICULES_NUMBER = 50
CIRCLE_SIZE = window.innerWidth / 7

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function foreachPARTICULES(callback) {
  for(var x = 0;x<PARTICULES.length;x++) {
    callback(PARTICULES[x],x)
  }
}
function generate() {
  var radian = 0
  var R = 0

  for(var i=0;i<PARTICULES_NUMBER;i++) {
    R = (window.innerHeight / 2)
    radian = (i * (Math.PI * 2)) / PARTICULES_NUMBER + 10
    PARTICULES.push(new Particule({
      size:1,
      color:'#161616',
      y:CIRCLE_SIZE * Math.sin(radian),
      x:CIRCLE_SIZE* Math.cos(radian),
    }))

    PARTICULES.push(new Particule({
      size:1,
      color:'#ffc433',
      y:(CIRCLE_SIZE - 5) * Math.sin(radian),
      x:(CIRCLE_SIZE - 5) * Math.cos(radian),
    }))

    PARTICULES.push(new Particule({
      size:1,
      color:'#ff7b0d',
      y:(CIRCLE_SIZE - 35) * Math.sin(radian),
      x:(CIRCLE_SIZE - 35) * Math.cos(radian),
    }))

  }

  PARTICULES_NUMBER = random(30,60)
}

function frame() {

  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  requestAnimationFrame(frame)
  new Particule({
    size:CIRCLE_SIZE,
    color:'#ffc433',
    primary:true
  }).draw()

  new Particule({
    size:CIRCLE_SIZE - 5,
    color:'#ff7b0d',
    primary:true
  }).draw()


  new Particule({
    size:CIRCLE_SIZE - 35,
    color:'#ff5222',
    primary:true
  }).draw()

  foreachPARTICULES(function(particule,ind) {
    if(typeof particule != 'undefined' && Date.now() - particule.createdAt >= particule.timeLimit) {
      particule.destroy(function() {
        PARTICULES.splice(ind,1)
      })
    } else {
      particule.update()
    }
  })

}

frame()
generate()
setInterval(generate,500)
