const LinkedList = require("./../linked_list_vertical/linked_list_vertical");
const LeftBracket = require("./left_bracket");
const RightBracket = require("./right_bracket");

class HashMap {
  constructor(numBuckets, ctx) {
    this.store = undefined;
    this.setStore(numBuckets, ctx);
    this.count = 0;

    this.ctx = ctx;
    this.render(ctx);
  }

  setStore(numBuckets, ctx) {
    this.store = [];
    let x = 50 + 37.5 + 25 + 37.5;
    for (let i = 0; i < numBuckets; i++) {
      this.store.push(new LinkedList(ctx, x));
      x = x + 75 + 25;
    }
  }

  render() {
    const leftBracket = new LeftBracket(50, 250, "blue");
    const rightBracket = new RightBracket(950, 250, "blue");
    leftBracket.draw(this.ctx);
    rightBracket.draw(this.ctx);


    let x = 50 + 37.5;
    let y = 250 + 200;
    for (let i = 0; i < 8; i++) {
      x = x + 25;
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "blue";

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      x = x + 75;
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

}

module.exports = HashMap;
