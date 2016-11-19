var canvas = document.getElementById('playground')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext('2d')

var NOTES = []
var LANES = []

var SCORE = 0
var LIFE = 5
var HITBOX = 30

var LANE_NUMBER = 2
var KEY_MAPPING = 'azerty'
var START_GAME = false

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function foreachLane(callback) {
  for(var x=0;x<LANES.length;x++) {
      callback(LANES[x],x)
  }
}

function foreachNote(callback) {
  for(var x=0;x<NOTES.length;x++) {
      callback(NOTES[x],x)
  }
}

function startWithConf() {
  START_GAME = true;
  LANE_NUMBER=document.getElementById('laneNumber').value

  document.getElementById('form').remove()
}

function STARTGAME() {
  for(var l=0;l<LANE_NUMBER;l++) {
    var lane = new Lane(l)
    lane.createNote()
    LANES.push(lane)
  }

  window.addEventListener('keypress', function(e) {
    if(e.code == 'Space') {
      NOTES = []
      SCORE = 0
      LIFE = 5
      foreachLane(function(lane) {
          lane.timming = {
            min:100,
            max: 1500
          }
      })
    }
    foreachLane(function(lane){
      var key = lane.key
      if(e.key !=  key || e.key.toLowerCase() != key) return

      for(var a = 0; a<NOTES.length;a++) {
          var ind = NOTES[a]

          if(ind.lane != lane) continue

          if(ind.note.x <= lane.hitbox.x + HITBOX
           && ind.note.x + (ind.note.size * 2) >= lane.hitbox.x ) {

            ind.note.stop = true
            if(ind.note.success == false) SCORE++
            ind.note.success = true
          }
      }
    })

  })

  function frame() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    requestAnimationFrame(frame)

    if(LIFE == 0) {

      stopGame()
      return
    }

    ctx.beginPath()
    ctx.font="30px Arial";
    ctx.fillStyle = '#000'
    ctx.fillText("SCORE : " + SCORE,5,35);
    ctx.closePath()

    ctx.beginPath()
    ctx.font="30px Arial";
    ctx.fillStyle = '#000'
    ctx.fillText("LIFE : " + LIFE,5,75 );
    ctx.closePath()


    ctx.beginPath()
    ctx.font="20px Arial";
    ctx.fillStyle = '#000'
    ctx.fillText("Press space to reset",5,110 );
    ctx.closePath()

    foreachLane(function(lane){
      lane.drawLane()
    })

    foreachNote(function(ind,i) {
      if(typeof ind != 'undefined'
        && Date.now() - ind.created_at >= ind.limit) {
          ind.note.destroy(function() {
            NOTES.splice(i,1);
          })
        } else {
          ind.note.update()
        }
    })
  }

  frame()
}
var canStart = setInterval(function () {
  if(START_GAME == false) return
  STARTGAME()
  clearInterval(canStart)
}, 10);

function stopGame() {
  ctx.beginPath()
  ctx.font="50px Arial";
  ctx.fillStyle = '#000'
  ctx.fillText("You lost. Press space to retry.",15,window.innerHeight / 2 - 35 );

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
}
