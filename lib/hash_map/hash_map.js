const LinkedList = require("./../linked_list/linked_list");
const LeftBracket = require("./left_bracket");
const RightBracket = require("./right_bracket");

class HashMap {
  constructor(numBuckets, ctx) {
    // this.store = undefined;
    // this.setStore(numBuckets);
    // this.count = 0;

    this.ctx = ctx;
    this.render(ctx);
  }

  // setStore(numBuckets) {
  //   this.store = [];
  //   for (let i = 0; i < numBuckets; i++) {
  //     this.store.push(new LinkedList());
  //   }
  // }

  render() {
    const leftBracket = new LeftBracket(50, 200, "blue");
    const rightBracket = new RightBracket(950, 200, "blue");
    leftBracket.draw(this.ctx);
    rightBracket.draw(this.ctx);
  }

}

module.exports = HashMap;
