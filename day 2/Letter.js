class Letter {
  constructor(conf) {
    this.height = conf.height
    this.width = conf.width

    this.easing = conf.easing || 0.1

    this.position = {
      x: conf.x,
      y: conf.y
    }
    this.endPosition = this.position
    this.INIT_POSITION = conf.init_position

    this.ctx = conf.ctx
    this.letter = conf.letter
  }

  update() {
    var velocity = [0,0]

    //console.log("mouse",mouse,"position",this.INIT_POSITION)
    if(
      mouse.x >= this.INIT_POSITION.x
      && mouse.x <= this.INIT_POSITION.x + WORD_CONF.width
      && mouse.y >= this.INIT_POSITION.y - WORD_CONF.height
      && mouse.y <= this.INIT_POSITION.y
    ) {
      this.endPosition = mouse
    } else {
      this.endPosition = this.INIT_POSITION
    }
    velocity[0] = (this.endPosition.x - this.position.x) * this.easing
    velocity[1] = (this.endPosition.y - this.position.y) * this.easing

    this.position.x += velocity[0]
    this.position.y += velocity[1]

    this.draw()
  }

  draw(conf) {
    var ctx = this.ctx
    var letter = this.letter
    var position = this.position

    ctx.beginPath()
    //ctx.fillStyle = '#fff'
    ctx.rect(position.x,position.y - WORD_CONF.height,WORD_CONF.width,WORD_CONF.height)
    //ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.font = "100px 'Quicksand',sans-serif";
    ctx.fillText(letter,this.position.x , this.position.y)
    ctx.fill()
    ctx.closePath()
  }
}
