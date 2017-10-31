const LinkedList = require("./../linked_list_vertical/linked_list_vertical");
const LeftBracket = require("./left_bracket");
const RightBracket = require("./right_bracket");

class HashMap {
  constructor(numBuckets, ctx) {
    this.store = undefined;
    this.setStore(numBuckets, ctx);
    this.count = 0;
    this.numBuckets = numBuckets;

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

  bucket(key) {
    String.prototype.hashCode = function(){
    	var hash = 0;
    	if (this.length === 0) return hash;
    	for (let i = 0; i < this.length; i++) {
    		let char = this.charCodeAt(i);
    		hash = ((hash<<5)-hash)+char;
    		hash = hash & hash; // Convert to 32bit integer
    	}
    	return hash;
    };

    return this.store[String(key).hashCode() % this.numBuckets];
  }

  includes(key) {
    return this.bucket(key).includes(key);
  }

  set(key, val) {
    if (this.count >= this.numBuckets) this.resize();

    if (this.includes(key)) {
      this.bucket(key).update(key, val);
    } else {
      this.bucket(key).append(key, val);
      this.count = this.count + 1;
    }
  }

  get(key) {
    this.bucket(key).get(key);
  }

  delete(key) {
    const removal = this.bucket(key).remove(key);
    if (removal !== undefined) this.count = this.count - 1;
    return removal;
  }

  resize() {
    const oldStore = this.store;
    this.numBuckets = this.numBuckets * 2;
    this.setStore(this.numBuckets, this.ctx);
    this.count = 0;

    oldStore.forEach((bucket) => {
      bucket.each((link) => this.set(link.key, link.val));
    });
  }

  render() {
    const leftBracket = new LeftBracket(50, 200, "#037584");
    const rightBracket = new RightBracket(950, 200, "#037584");
    leftBracket.draw(this.ctx);
    rightBracket.draw(this.ctx);


    let x = 50 + 37.5;
    let y = 250 + 200;
    for (let i = 0; i < 8; i++) {
      x = x + 25;
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "#037584";

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      x = x + 75;
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

}

module.exports = HashMap;
