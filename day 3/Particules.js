class Particule {
  constructor(conf) {
    this.easing = conf.easing || 0.1
    this.size = conf.size
    this.position = {
      x: conf.x,
      y: conf.y
    }
    this.ctx = conf.ctx
    this.endPosition = this.position
    this.INIT_POSITION = this.position

    this.INIT_SIZE = this.size
    this.endSize = this.size
  }

  update() {
    var velocity = [0,0]

    velocity[0] = (this.endPosition.x - this.position.x) * this.easing
    velocity[1] = (this.endPosition.y - this.position.y) * this.easing

    this.position.x += velocity[0]
    this.position.y += velocity[1]

    if(this.size >= this.endSize) {
      this.endSize = this.INIT_SIZE * random(-50,0.4)
      this.size = this.INIT_SIZE
    }

    this.size = this.size + (Math.random() + 1)
    this.draw()
  }

  draw(conf) {
    var ctx = this.ctx
    var position = this.position
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.arc(position.x,position.y,this.size,0,Math.PI * 2)
    ctx.fill()
    ctx.closePath()

  }
}
