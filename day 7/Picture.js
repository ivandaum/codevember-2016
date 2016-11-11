class Particule {
  constructor(image,ctx,number) {
    this.size = 1
    this.ctx = ctx
    this.number = number
    this.image = image
    this.random = random(1,100)
    this.velocity = {
      x:0,
      y:0
    }

    this.capacity = Math.sqrt(PARTS)

    this.startDrawingAt = {
      x: (window.innerWidth / 2) - (image.width / 2),
      y: (window.innerHeight / 2) - (image.height / 2)
    }
  }

  update() {

    if(row.x >= this.capacity) {
      row.x = 0
      row.y += 1
    }

    this.startXClipping = (image.width / this.capacity) * row.x
    this.startYClipping = (image.height / this.capacity) * row.y

    this.position = {
      x: this.startXClipping + this.startDrawingAt.x,
      y: this.startYClipping + this.startDrawingAt.y
    }

    // var endX = this.position.x * (mouse.x / this.random)
    // var endY =  this.position.y * (mouse.y / this.random)
    var endX = this.position.x * (mouse.x / this.random)
    var endY =  this.position.y * (mouse.y / this.random)

    this.velocity = {
      x: (endX - this.position.x) * 0.1,
      y: (endY - this.position.y) * 0.1
    }

    //console.log(endX, this.position.x)

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    var imageWidth = image.width / this.capacity
    var imageHeight = image.height / this.capacity

    row.x++
    this.draw(imageWidth,imageHeight)
  }

  draw(imageWidth,imageHeight) {
    var ctx = this.ctx

    ctx.beginPath()

    ctx.drawImage(
      this.image,
      this.startXClipping,
      this.startYClipping,
      imageWidth,
      imageHeight,
      this.position.x,
      this.position.y,
      imageWidth * this.size,
      imageHeight * this.size
    )

    ctx.fill()
    ctx.closePath()

  }
}
