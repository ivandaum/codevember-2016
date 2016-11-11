class Circle {
  constructor(x,y) {
    this.size = 5
    this.start = {
      x: x || window.innerWidth / 2,
      y: y || window.innerHeight / 2
    }

    this.max = {
      x:window.innerWidth - this.size,
      y:window.innerHeight - this.size
    }

    this.easing = 0.1
    this.velocity = {x:0,y:0}
    this.accurency = 1
  }

  update() {
      this.size += this.size * this.easing
      this.accurency -= (this.accurency * 0.01)
      this.draw()
  }

  destroy() {
  }

  draw() {
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(0,0,0,' + this.accurency + ')'
    ctx.lineWidth = 1

    if(mouse.x <= window.innerWidth /2 ) {
      this.start.x -= this.start.x / 100
    } else {
      this.start.x += this.start.x / 100
    }

    if(mouse.y <= window.innerHeight /2) {
      this.start.y -= this.start.y / 100
    } else {
      this.start.y += this.start.y / 100  
    }

    var size = this.size
    ctx.arc(this.start.x,this.start.y,size,0,Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
  }
}
