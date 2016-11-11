/* INIT */

var PARTICULES = [];
var PARTS = 1000
var canvas = document.getElementById('playground')
var mouse = {x:window.innerWidth / 2,y:window.innerHeight / 2}
var row = {x:0,y:0}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')
var image = new Image()

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function frame() {
  requestAnimationFrame(frame)

  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  for(var x=0;x<PARTICULES.length;x++) {
    PARTICULES[x].update()
  }

  row = {x:0,y:0}
}

canvas.addEventListener('mousemove', function(e) {
    if(e.clientX) {
        mouse = {x:e.clientX,y:e.clientY}
    } else {
        mouse = {x:window.innerWidth / 2,y:window.innerHeight / 2}
    }

    mouse.x = (window.innerWidth / 2) - mouse.x
    mouse.y = (window.innerHeight/ 2) - mouse.y
})


image.onload = function() {

  for(var i=0;i<PARTS;i++) {
    var particule = new Particule(image,ctx,i)
    PARTICULES.push(particule)
  }

  frame()
}
image.src = 'http://nsa38.casimages.com/img/2016/11/07/161107015516358284.jpg'
