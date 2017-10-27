class UpArrow {
  constructor(xPos, yPos, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
  }

  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.xPos + 10, this.yPos - 10); // 0,0
    ctx.lineTo(this.xPos, this.yPos); // 10,10
    ctx.lineTo(this.xPos - 10,this.yPos - 10); // 0,20
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos, this.yPos - 50);
    ctx.stroke();
  }
}

module.exports = UpArrow;
