class Weirdo {

  constructor(conf) {
    this.segmentCount = conf.segmentCount
    this.ctx = conf.ctx
    this.variations = {x:0,y:0}
    this.segments = []

    for(var i=0;i<this.segmentCount;i++) {
      var segmentConf = conf
      segmentConf.number = i

      var segment = new Segment(segmentConf)
      this.segments.push(segment)
    }

  }

  update() {
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;
    var variations = 0
    var percentProgression = i / this.segmentCount * 100;
    var c = this.segmentCount

    if(mouse.x != centerX) {
        this.variations.x = mouse.x < centerX ? - (centerX - mouse.x) : mouse.x - centerX
    }

    if(mouse.y != centerY) {
        this.variations.y = mouse.y < centerY ? - (centerY - mouse.y) : mouse.y - centerY
    }

    this.variations = {
      x:this.variations.x * 0.5,
      y: this.variations.y * 0.5
    }

    for(var i=0;i<this.segments.length;i++) {
      this.segments[i].update(this.variations)
    }
  }

}
