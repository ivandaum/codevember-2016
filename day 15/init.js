var canvas = document.getElementById('playground')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')
var STRIKES = []
var STRIKE_NUMBER = 200

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  requestAnimationFrame(frame)

  STRIKES.forEach(function(strike,index) {
    if(Date.now() - strike.createdAt >= strike.limit) {
      strike.destroy(function() {
          STRIKES.splice(index,1)
      })
    } else {
      strike.update()
    }
  })
}

frame()


setInterval(function() {
  for(var i =0;i<STRIKE_NUMBER;i++) {
    STRIKES.push(new Strike({
      x:random(0, window.innerWidth),
      createdAt:Date.now(),
      easing:random(0.05,0.9)
    }))
  }
},1000)
//
// setInterval(function() {
//   for(var i =0;i<STRIKE_NUMBER;i++) {
//     STRIKES.push(new Strike({
//       x:random(window.innerWidth / 1.5, window.innerWidth),
//       easing: 1.25,
//       createdAt:Date.now()
//     }))
//   }
// },1000)
