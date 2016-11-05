class Particule {
  constructor(conf) {
    this.easing = conf.easing || 0.03
    this.size = conf.size
    this.finalSize = Math.floor(random(2,5))

    this.position = {
      x: conf.x,
      y: conf.y
    }

    this.previous = conf.previous

    this.color = 'rgba(255,255,255,0.2)'

    this.ctx = conf.ctx

    this.INIT_POSITION = this.position

    this.endPosition = {
      x:this.INIT_POSITION.x > (window.innerWidth / 2) ? window.innerWidth + 100: -100,
      y:this.INIT_POSITION.y > (window.innerHeight / 2) ? window.innerHeight + 100 : -100
    }

    this.velocity = {y:0,y:0}
  }

  update() {

    this.velocity.x = (this.endPosition.x - this.position.x) * this.easing - random(-10,10)
    this.velocity.y = (this.endPosition.y - this.position.y) * this.easing - random(-10,10)

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    var tempoSize = (this.finalSize - this.size) * 0.05
    this.size += tempoSize

    this.draw()
  }

  destroy() {
    this.size = this.size / 2

    this.update()
  }

  draw(conf) {
    var ctx = this.ctx
    var position = this.position

    ctx.beginPath()
    ctx.fillStyle = '#27dc73'
    ctx.strokeStyle = '#27dc73'
    ctx.arc(this.position.x ,this.position.y ,this.size,0,Math.PI * 2)

    if(this.previous != false) {
      ctx.moveTo(this.position.x,this.position.y)
      ctx.lineTo(this.previous.position.x,this.previous.position.y)
      ctx.stroke()
    }
    ctx.fill()
    ctx.closePath()

  }
}
