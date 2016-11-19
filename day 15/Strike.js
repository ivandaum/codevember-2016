var Strike = function(params) {
  this.size = 1
  this.createdAt = params.createdAt
  this.easing = params.easing ||  random(0.05,0.01)

  variation = 150
  this.x = random(window.innerWidth / 2 - variation,window.innerWidth / 2 + variation)
  this.y = random(window.innerHeight / 2 - variation,window.innerHeight / 2 + variation)

  this.x = params.x || this.x
  this.y = this.size

  this.fSize = random(2,20)
  this.fy = (window.innerHeight / 2) + (variation / 2)
  this.limit = random(300,2500)
  this.time = this.size
  this.falling = random(0,80) > 50 ? true : false
}

Strike.prototype.update = function() {
  this.size = this.size > this.fSize ? this.fSize : this.size + this.easing

  if(this.falling) {
      this.y += this.easing / 100
  }

  this.draw()
}

Strike.prototype.destroy = function(callback) {
  this.size -= this.easing / 5

  if(this.size < 1) {
    this.size = 1
    callback()
  }

  if(this.falling) {
      this.y += this.easing * 10
  }

  this.draw()
}

Strike.prototype.draw = function() {
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
  //ctx.rect(this.x - (this.size / 2),this.y - (this.size / 2),this.size,this.size)
  ctx.fill()

  ctx.closePath()
}
