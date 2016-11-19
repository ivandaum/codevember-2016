class Note {
  constructor() {
      this.x = 0
      this.y = window.innerHeight / 2

      this.max = {
        x: window.innerWidth
      }

      this.size = 10
      this.stop = false
      this.color = '#000'
      this.success = false
      this.isMissed = false
      this.intensity = 1
  }

  update() {
    if (this.x >= window.innerWidth / 2 + 20 && this.isMissed == false) {
        this.isMissed = true
        if(LIFE > 0)LIFE--
    }

    if(this.stop == false) {
      this.x += this.max.x / 200
    }

    if(this.x >= window.innerWidth / 2 + 20 && !this.success) {
      this.color = 'red'
      this.y = random((window.innerHeight / 2)-3,(window.innerHeight / 2) + 3)
    }
    if(this.success == true) this.color = 'green'

    if(this.stop == true) {
      this.destroy()
    } else {
      this.draw()
    }

  }
  destroy(callback) {

    this.size += 3
    this.intensity -= 0.1

    if(this.size >= 20) {
      if(typeof callback == 'function') callback()
    }

    if(this.size <= 0 ) {
      this.size = 0
    }

    if(this.success == true) this.color = 'rgba(0,255,0,' + this.intensity + ')'
    this.draw()
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
    ctx.fill()
    ctx.closePath()

  }
}
