var canvas = document.getElementById('playground')
var mouse = {x:0,y:0}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')
var STR = 'Hello codevember!'
var LETTER_ARRAY = []
var RANDOM_POS = {
  x:[],
  y: []
}
var WORD_CONF = {
    height:100,
    width:100
  }

var jump = {
  x: 0,
  y: 0
}

var wordInd = 0

for(var i = 0;i<STR.length;i++) {

  jump.x = WORD_CONF.width * wordInd
  wordInd++

  if(STR[i] == ' ') {
    jump.y += WORD_CONF.height
    wordInd = 0
  }

  var position = {
    x: 100 + jump.x,
    y: window.innerHeight /2 + jump.y
  }

  var letter = new Letter({
    x:position.x,
    y:position.y,
    ctx:ctx,
    letter:STR[i],
    init_position: position
  })

  if(i == 0) {
    RANDOM_POS.x.push(position.x)
    RANDOM_POS.y.push(position.y)
  }

  if(i == STR.length - 1) {
    RANDOM_POS.x.push(position.x)
    RANDOM_POS.y.push(position.y)
  }

  LETTER_ARRAY.push(letter)
}

ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

canvas.addEventListener('mousemove', function(e) {
  if(e.clientX) {
      mouse = {x:e.clientX,y:e.clientY}
  } else {
      mouse = {x:0,y:0}
  }
})

function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  requestAnimationFrame(frame)

  for(var i = 0;i<LETTER_ARRAY.length;i++) {
    LETTER_ARRAY[i].update()
  }

}

frame()


function randomPos(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

setInterval(function() {
  mouse = {
    x:randomPos(RANDOM_POS.x[0],RANDOM_POS.x[1]),
    y:randomPos(RANDOM_POS.y[0],RANDOM_POS.y[1])
  }
}, 1000);
