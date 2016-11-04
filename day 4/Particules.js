class Particule {
  constructor(conf) {
    this.easing = conf.easing || 0.05
    this.size = conf.size

    this.position = {
      x: conf.x,
      y: conf.y
    }
    this.color = conf.color
    this.ctx = conf.ctx
    this.endPosition = {x:this.position.x,y:window.innerHeight - random(0, window.innerHeight)}
    this.INIT_POSITION = this.position
    this.hasMultiple = Math.floor(random(0,100))
    this.velocity = 0
  }

  update() {

    this.velocity = (this.endPosition.y - this.position.y) * this.easing

    this.position.y += this.velocity

    if(Math.ceil(this.position.y) >= Math.floor(this.endPosition.y) - this.size) {
      this.position.y = this.endPosition.y - this.size
    }

    this.draw()
  }

  draw(conf) {
    this.size = this.size - 0.1

    if(this.size <= 0) this.size = 0
    var ctx = this.ctx
    var position = this.position

    ctx.beginPath()
    ctx.fillStyle = this.color

    if(this.hasMultiple > 30) {
      //ctx.arc(position.x,position.y,2,0,Math.PI * 2)
      if(this.hasMultiple > 50) {
        ctx.arc(position.x + (this.size /2 ),position.y - this.size,this.size / 2.5,0,Math.PI * 2)
      }
    }
    ctx.arc(position.x,position.y - Math.floor((this.size * 2)),this.size,0,Math.PI * 2)

    ctx.rect(this.INIT_POSITION.x ,this.endPosition.y - (this.size *2 ),this.size /10,15 - this.velocity)
    ctx.fill()
    ctx.closePath()
  }
}
