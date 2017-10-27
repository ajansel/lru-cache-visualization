class DownArrow {
  constructor(xPos, yPos, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
  }

  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.xPos + 7, this.yPos + 7); // 0,0
    ctx.lineTo(this.xPos, this.yPos); // 7,7
    ctx.lineTo(this.xPos - 7,this.yPos + 7); // 0,20
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos, this.yPos + 35);
    ctx.stroke();
  }
}

module.exports = DownArrow;
