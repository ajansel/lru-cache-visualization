class LeftBracket {
  constructor(xPos, yPos, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
  }

  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(this.xPos + 37.5, this.yPos);
    ctx.lineTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos, this.yPos + 210 + 27);
    ctx.lineTo(this.xPos + 37.5, this.yPos + 210 + 27);
    ctx.stroke();
  }
}

module.exports = LeftBracket;
