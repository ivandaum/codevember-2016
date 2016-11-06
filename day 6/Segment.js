class Segment {

  constructor(conf) {

    var ww = window.innerWidth / 2
    var wh = window.innerHeight / 2

    var width = conf.width

    this.base = {
      x: ww - (width / 2),
      y: window.innerHeight + width
    }

    this.number = conf.number
    this.particule = {
        height: (this.base.y / 2) / conf.segmentCount,
        width: width
    }

    this.count = conf.segmentCount

    this.ctx = conf.ctx
  }

  update(variation) {

    var percent = this.number / this.count * 100
    var endX = this.base.x + (variation.x * (percent / 500))
    var endY = this.base.y + (variation.y * (percent / 500))

    if(endX <= this.particule.width) endX = this.particule.width
    if(endX >= window.innerWidth - this.particule.width) endX = window.innerWidth - this.particule.width
    if(endY <= 0) endY = this.particule.width
    //if(endY >= window.innerHeight - this.particule.width) endY = window.innerHeight - this.particule.width



    if(variation.x <= 0 && endX < mouse.x - this.particule.width
    || variation.x > 0 && endX > mouse.x + this.particule.width ) endX = mouse.x


    if(variation.y <= 0 && endY < mouse.y) endY = mouse.y
    //if(variation.y > 0 && endY > mouse.y && percent >= 90) endY = window.innerHeight

    var velocity = (endX - this.base.x) * (this.number  / 100 ) * 0.8
    this.base.x += velocity

    velocity = (endY - this.base.y) * 0.8
    this.base.y += velocity

    this.draw()
  }

  draw() {
      var ctx = this.ctx
      var y = this.base.y - (this.number * this.particule.height)
      var x = this.base.x + (this.particule.width/ 2)

      ctx.beginPath()
      ctx.strokeStyle = COLOR
      ctx.fillStyle = COLOR
      ctx.lineWidth = this.particule.width

      //ctx.moveTo(x,y)
      //ctx.lineTo(x,y + this.particule.height)
      ctx.arc(x,y, this.particule.width,0,Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
      if( this.count - this.number == 1) {
        var newSize = this.particule.width / 3
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.lineWidth = this.particule.width

        //ctx.moveTo(x,y)
        //ctx.lineTo(x,y + this.particule.height)
        ctx.arc(x - (this.particule.width / 2),y, newSize,0,Math.PI * 2)
        ctx.arc(x + (this.particule.width / 2),y, newSize,0,Math.PI * 2)

        ctx.fill()
        ctx.closePath()
      }
  }
}
