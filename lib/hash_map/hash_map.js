const LinkedList = require("./../linked_list/linked_list");

class HashMap {
  constructor(numBuckets) {
    this.store = undefined;
    this.setStore(numBuckets);
    this.count = 0;
  }

  setStore(numBuckets) {
    this.store = [];
    for (let i = 0; i < numBuckets; i++) {
      this.store.push(new LinkedList());
    }
  }

  draw(ctx) {
    // ctx.fillStyle = "yellow";
    // ctx.beginPath();
    // ctx.arc(
    //   this.xPos, this.yPos, 35, 0, 2*Math.PI, true
    // );
    // ctx.fill();
  }

}

module.exports = HashMap;
