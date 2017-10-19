class RightArrow {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(this.xPos - 10, this.yPos - 10); // 0,0
    ctx.lineTo(this.xPos, this.yPos); // 10,10
    ctx.lineTo(this.xPos - 10,this.yPos + 10); // 0,20
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos - 50, this.yPos);
    ctx.stroke();
  }
}

module.exports = RightArrow;
