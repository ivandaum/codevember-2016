var DATA = []
DATA.push({
    color:'#FFFF00',
    datas:['Rose','Rouge','Aucune','Aucune','Bleu','Aucune','Aucune','Rose','Bleu','Aucune','Bleu','Bleu','Bleu','Bleu','Bleu','Bleu','Bleu','Vert','Vert','Aucune','Bleu','Toutes','Jaune','Jaune','Rouge','Camel','Bleu','Bleu','Orange','Bleu','Fushia','Transparent','Bleu','Vert','Gris']
})
DATA.push({
  color:'#00FBE0',
  datas:['Epinay-sur-Orge','Paris','Bussy-Saint-Georges','Paris','Paris','Paris','Paris','Argenteuil','Charenton','Bussy-Saint-Georges','Rosny-sous-Bois','levallois','Paris','Paris','Levallois','Noisy-le-Grand','Paris','Paris','Paris','Paris','Paris','Vitry','Paris','Noisy-le-Sec','Paris','Paris','Paris','Paris','Orly sur Morin','Paris','paris','Le Kremlin-Bicêtre','Paris','Paris','Châtenay-Malabry','Paris','Paris']
})
DATA.push({
  color:'#22FE16',
  datas: ['Aucun','Chat','Chien','Lama','Chien','Chat','Aucun','Vache','Loup','Aucun','Chat','Chien','Chat','Poule','Éléphant','Ours','Chat','Chien','Éléphant','Renard','Paresseux','Aucun','Chien','Girafe','Chimpanzé','Chien','Lion','Chat','Chat','Chat','Chat','Chat','Tartigrade','Chatte','Chat','Chat','Aucun','Chat']
})
DATA.push({
  color:'#FB0001',
  datas:['1994','1995','1996','1994','1993','1994','1995','1996','1994','1996','1996','1991','1993','1993','1994','1994','1994','1995','1995','1996','1995','1995','1995','1996','1994','1994','1995','1993','1996','1995','1993','1995','1994','1995','1996','1995','1996']
})

var Circle = function(param) {
  this.value = param.value
  this.category = param.category
  this.number = param.number
  this.color = param.color
  this.size = 1
  this.position = {}
  this.initPosition = {}
  this.sizeRatio = 0.3
  this.easing = random(0.1,1)
  this.rotate = 0
}

Circle.prototype.updateWithStats = function() {
    var category = this.category
    var rayon = globalR / 2

    this.initPosition = circlePoint(globalR,this.number,category.datas.length)

    var variation = {
      x:random(this.number - 100, this.number + 100),
      y:random(this.number - 100, this.number + 100)
    }

    if(this.initPosition.x < rayon) {
        this.initPosition.x += variation.x
    } else {
      this.initPosition.x -= variation.x
    }

    if(this.initPosition.y < rayon) {
      this.initPosition.y += variation.y
    } else {
      this.initPosition.y -= variation.y
    }

    this.position = this.initPosition
    this.size = this.percent * this.sizeRatio
    this.easing = this.size / 50
}

Circle.prototype.update = function() {
  this.rotate += 0.1

  if(this.rotate == 360) this.rotate = 0
  this.position.x += GLOBAL_CHANGE.x * this.easing
  this.position.y += GLOBAL_CHANGE.y * this.easing
  this.draw()
}

Circle.prototype.draw = function() {
  ctx.save();
  ctx.beginPath()
  ctx.translate(window.innerWidth /2 ,window.innerHeight / 2)
  ctx.rotate((this.rotate *this.easing)*Math.PI/180)
  ctx.fillStyle = this.color
  ctx.arc(this.position.x,this.position.y,this.size,0,Math.PI * 2)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}
var Category = function(param) {
  this.color = param.color
  this.title = param.title
  this.number = param.number
  datas = []
  var currentCategory = this

  param.datas.forEach(function(data,number) {
    var circle = new Circle({
      value:data,
      category: currentCategory,
      number:number,
      color:param.color
    })
    datas.push(circle)
  })

  this.datas = datas
  this.setCirclesStats()
}

Category.prototype.setCirclesStats = function() {
  values = []
  this.stats = []

  var circles = this.datas
  var count = 0

  for(var a =0; a<circles.length; a ++) {
      var circle = this.datas[a]

      if(typeof values[circle.value] == 'undefined') {
        values[circle.value] = 1
      } else {
        values[circle.value]++
      }
      count++
  }

  for(var e=0;e<circles.length; e++) {
    for (value in values) {
      var ind = values[value]

      if(circles[e].value != value) continue

      var percent = ind * 100 / count
      percent = percent * 100
      percent = Math.round(percent)
      percent = percent / 100

      this.datas[e].count = ind
      this.datas[e].percent = percent
      this.datas[e].updateWithStats()
    }
  }
}

Category.prototype.show = function() {
  this.drawCircles()
}

Category.prototype.writeTitle = function() {
  var p = document.createElement('p')
  var span = document.createElement('span')
 text = document.createTextNode(this.title)

 var color = document.createElement('span')
 color.className += 'color'
 color.style.backgroundColor = this.color
 p.appendChild(span)
 p.appendChild(color)
 span.appendChild(text)
 var div = document.getElementById('legend').appendChild(p)
}

Category.prototype.drawCircles = function() {

  for(var w=0;w<this.datas.length;w++) {
      var circle = this.datas[w]
      circle.update()
  }
}

var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext('2d')
var CATEGORIES = []
var globalR = Math.min(window.innerHeight, window.innerWidth) / 4
var activeCategoryR = Math.min(window.innerHeight, window.innerWidth) / 7
var GLOBAL_CHANGE = {
  x:0,
  y:0
}
var ROTATE = 0
var TIMMING = 0

// window.addEventListener('mousemove',function(e){
//   if(e.clientX) {
//     GLOBAL_CHANGE.x = ((window.innerWidth / 2 ) - e.clientX) / 100
//     GLOBAL_CHANGE.y = ((window.innerHeight / 2 ) - e.clientY) / 100
//   }
//
//   console.log(GLOBAL_CHANGE)
// })

setInterval(function() {
  var localR = Math.min(window.innerHeight, window.innerWidth) / 10
  var max = 100
  //
  // GLOBAL_CHANGE.x = circlePoint(localR,TIMMING,max).x / 250
  // GLOBAL_CHANGE.y = circlePoint(localR,TIMMING,max).y / 250

  if(TIMMING == max)  TIMMING = 0
  TIMMING++

},100)

function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function circlePoint(ratio,number,count) {
  number++

  var radian = (number * (Math.PI * 2)) / count
  return {
    x: ratio * Math.cos(radian),
    y: ratio * Math.sin(radian)
  }
}

// FILL CATEGORIES
for(var x=0;x<DATA.length;x++) {
  var data = DATA[x]
  var category = new Category({
    title:data.title,
    color:data.color,
    datas:data.datas,
    number:x
  })
  CATEGORIES.push(category)

}

function frame() {

  requestAnimationFrame(frame)
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  for(var b=0;b<CATEGORIES.length;b++) {
    CATEGORIES[b].show()
  }
}

frame()
