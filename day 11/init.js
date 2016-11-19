var canvas = document.getElementById('playground')
var ctx = canvas.getContext('2d')
var NOTES = []
var SPACEBAR = false
var TIMMING = 1000
var LIFE = 5
var timming = {
  min:100,
  max: 1500
}
var SCORE = 0
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function createNote() {
  var note = new Note()
  TIMMING = random(timming.min,timming.max)
  NOTES.push({note:note,created_at:Date.now(),limit:5000})

  timming.min -= 10
  timming.max -= 10

  if (timming.min <=0) timming.min = 0
  if (timming.max <=400) timming.max = 400

  setTimeout(createNote,TIMMING)
}

createNote()


window.addEventListener('keypress', function(e) {
  if(e.code != 'Space') return

  for(var a = 0; a<NOTES.length;a++) {
      if(NOTES[a].note.x + NOTES[a].note.size >= window.innerWidth / 2 - 10 && NOTES[a].note.x <= window.innerWidth / 2 + 10) {
        NOTES[a].note.stop = true
        if(NOTES[a].note.success == false) SCORE++

        NOTES[a].note.success = true
      }
  }
})

function frame() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  requestAnimationFrame(frame)

  if(LIFE == 0) {

    ctx.beginPath()
    ctx.font="50px Arial";
    ctx.fillStyle = '#000'
    ctx.fillText("You lost. Refresh to retry.",15,window.innerHeight / 2 - 35 );

    var emot = ' '
    if(SCORE < 10) {
      emot += ':('
    } else if(SCORE >= 10 && SCORE < 50) {
        emot += ':)'
    } else if (SCORE >= 50 && SCORE < 100) {
      emot += ':o'
    } else if(SCORE >= 100) {
      emot += '(˚Õ˚)'
    }

    ctx.fillText("Score : " + SCORE,15,window.innerHeight / 2 + 50 );
    ctx.fillText(emot,15,window.innerHeight / 2 + 125 );
    ctx.fill()
    ctx.closePath()
    NOTES = []
    return
  }
  ctx.beginPath()
  ctx.font="30px Arial";
  ctx.fillStyle = '#000'
  ctx.fillText("SCORE : " + SCORE,5,window.innerHeight / 2 - 5 );

  ctx.beginPath()
  ctx.font="30px Arial";
  ctx.fillStyle = '#000'
  ctx.fillText("LIFE : " + LIFE,5,window.innerHeight / 2 - 35 );

  ctx.font="10px Arial";
  ctx.fillText("SPACEBAR",window.innerWidth / 2 - 27,window.innerHeight / 2 + 40 );
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.fillStyle = '#000'
  ctx.rect(0,window.innerHeight /2,window.innerWidth,1)
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.strokeStyle = '#000'
  ctx.fillStyle = '#fff'
  ctx.lineWidth = 5
  ctx.arc(window.innerWidth / 2,window.innerHeight /2 ,20,0,Math.PI * 2)
  ctx.stroke()
  ctx.fill()
  ctx.closePath()

  for(var i=0;i<NOTES.length;i++) {

    if(typeof NOTES[i].note != 'undefined' && Date.now() - NOTES[i].created_at >= NOTES[i].limit) {
      NOTES[i].note.destroy(function() {
          NOTES.splice(i,1);
      });

    } else {
      NOTES[i].note.update()
    }

  }
}

frame()
