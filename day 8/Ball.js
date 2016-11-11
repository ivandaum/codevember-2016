class Ball {
  constructor(x,y) {
    this.size = 50
    this.start = {
      x: x || this.size,
      y: y || window.innerHeight / 3
    }
    this.color = '#db9e24'

    this.max = {
      x:window.innerWidth - this.size,
      y:window.innerHeight - this.size
    }

    this.min = {
      x:this.size,
      y:this.size
    }
    this.finalSize = this.size

    this.easing = {y:0.03,x:Math.exp(2)}
    this.velocity = {x:0,y:0}

  }

  update() {
      this.velocity = {
        x: this.easing.x,
        y: this.start.y * this.easing.y
      }

      this.start.x += this.velocity.x
      this.start.y += this.velocity.y

      if(this.start.x >= this.max.x || this.start.x <= this.min.x) {
        this.easing.x = - this.easing.x
      }

      if(this.start.y >= this.max.y || this.start.y <= this.min.y) {
          this.easing.y = - this.easing.y
      }
      this.draw()
  }

  destroy(callback) {
    this.size = this.size - 0.3
    if(this.size <= 2) {
      this.size = 1
      callback()
    }
    this.update()
  }

  draw() {
    var configs = []
    configs.push({
      color: this.color,
      x: this.start.x,
      y: this.start.y,
      size: this.size
    })

    // configs.push({
    //   color: 'rgba(255,255,255,0.7)',
    //   x: this.start.x,
    //   y: this.start.y,
    //   size: this.size / 1.2
    // })
    //
    // configs.push({
    //   color: this.color,
    //   x: this.start.x + 5,
    //   y: this.start.y + 5,
    //   size: this.size / 1.1
    // })

    for(var i=0;i<configs.length;i++) {
      this.drawBall(
        configs[i].color,
        configs[i].x,
        configs[i].y,
        configs[i].size
      )
    }
  }

  drawBall(color,x,y,size) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x,y,size,0,Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
}
