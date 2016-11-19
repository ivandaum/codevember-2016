var Particule = function(conf) {
  this.x = conf.x || window.innerWidth / 2
  this.y = conf.y || window.innerHeight / 2
  this.size = conf.size
  this.color = conf.color
  this.createdAt = Date.now()
  this.timeLimit = random(1500,2000)
  this.primary = conf.primary || false
  this.easing = 0.003

  if(!this.primary) {
      this.x += window.innerWidth / 2
      this.y += window.innerHeight / 2
  }
}

Particule.prototype.draw = function() {
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
  ctx.fill()
  ctx.closePath()
}

Particule.prototype.update = function() {
  if(this.primary) return

  this.size += 0.1
  this.draw()
}

Particule.prototype.destroy = function(callback) {
  this.size -= 0.1

  if(this.size <= 1) {
     this.size = 1;
      callback()
  }

  this.draw()
}
