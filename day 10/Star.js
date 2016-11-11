class Star {
    constructor(x,y) {
        this.x = x
        this.y = y

        this.end = {
          x:random(-100,100),
          y:random(-100,100)
        }

        this.size = random(10,50)
        this.velocity = this.end
        this.easing = random(0.003,0.1)
        this.intensity = 1
    }

    update() {
        this.y += this.end.y * this.easing
        this.x += this.end.x * this.easing

        this.intensity -= 0.05
        this.draw()
    }

    destroy() {

    }

    draw() {
      ctx.beginPath()
      ctx.fillStyle = 'rgba(0,0,0,' + this.intensity + ')'
      ctx.rect(this.x,this.y,this.size,this.size)
      ctx.fill()
      ctx.closePath()
    }
}
