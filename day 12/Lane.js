class Lane {
  constructor(number) {
    this.number = number
    this.y = (window.innerHeight / 2)
    this.timming = {
      min:100,
      max: 1500
    }

    var offset = 100
    var totalHeight = 100 * LANE_NUMBER

    this.y -= (totalHeight / 2) - (offset * number)
    this.key = KEY_MAPPING[number]
    this.timeRepeat = 3000
    this.hitbox = {
      x: window.innerWidth / 2,
      y: this.y
    }

  }

  createNote() {
    this.timeRepeat = random(this.timming.min,this.timming.max)

    var note = new Note(this.y)
    this.timming.min -= 10
    this.timming.max -= 10

    if (this.timming.min <=500) this.timming.min = 500
    if (this.timming.max <=1000) this.timming.max = 1000

    NOTES.push({note:note,created_at:Date.now(),lane:this,limit:10000})


    var _this = this

    setTimeout(function() {
      _this.createNote()
    },this.timeRepeat)
  }

  drawLane() {

    // KEY INDICATOR
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.font="20px Arial";
    ctx.rect(0,this.y,window.innerWidth,1)
    ctx.fillText(this.key,this.hitbox.x + 30,this.hitbox.y + 30 );
    ctx.fill()
    ctx.closePath()

    // LANE
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.rect(0,window.innerHeight / 2,window.innerWidth,1)
    ctx.fill()
    ctx.closePath()

    // ARC
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1
    ctx.arc(this.hitbox.x,this.hitbox.y,HITBOX,0,Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

  }
}
