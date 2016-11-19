var Ink = function(params) {
  this.color = chooseColor()
  this.number = params.number + 1
  this.size = 1
  this.finalSize = random(5,15)
  this.easing = random(0.05,0.5)
  var radian = (this.number * (Math.PI * 2)) / CIRCLES_NUMBER


  this.x = random(-window.innerWidth / 2,window.innerWidth / 2)
  this.y = random(-window.innerHeight/ 2,window.innerHeight / 2)

  this.x = R * Math.cos(radian)
  this.y = R * Math.sin(radian)

  this.x += window.innerWidth / 2
  this.y += window.innerHeight / 2

  this.createdAt = params.createdAt
}

Ink.prototype.update = function() {
  this.x += 0.5
  this.y += 0.5

  this.size += 0.3
  if(this.size > this.finalSize) {
    this.size = this.finalSize
  }
  this.draw()
}

Ink.prototype.destroy = function(callback) {
  this.size -= this.easing

  this.x += 0.5
  this.y += 0.5
  if(this.size < 1 ) {
    callback()
  }

  this.draw()
}

Ink.prototype.draw = function() {
    if(this.size < 1) return

    ctx.beginPath()
    ctx.fillStyle = this.color
    // ctx.arc(this.x, this.y, this.size,0,Math.PI * 2)
    ctx.rect(this.x, this.y, this.size,this.size)
    ctx.fill()
    ctx.closePath()
}
