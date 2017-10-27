class Node {
  constructor(key = null, val = null) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }

  draw(ctx, xPos, yPos) {
    ctx.fillStyle = "#ffce00";
    ctx.beginPath();
    ctx.arc(
      xPos, yPos, 25, 0, 2*Math.PI, true
    );
    ctx.fill();
  }

  remove() {
    if (this.prev) this.prev.next = this.next;
    if (this.next) this.next.prev = this.prev;
    this.next = null;
    this.prev = null;
    return this;
  }

}

module.exports = Node;
