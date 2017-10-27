const Node = require("./node");
const UpArrow = require("./up_arrow");
const DownArrow = require("./down_arrow");

class LinkedList {
  constructor(ctx, x) {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.ctx = ctx;

    this.x = x;
    this.render(ctx);
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(
      this.xPos, this.yPos, 35, 0, 2*Math.PI, true
    );
    ctx.fill();
  }

  empty() {
    return this.head.next === this.tail;
  }

  first() {
    if (this.empty() === true) {
      return null;
    } else {
      return this.head.next;
    }
  }

  last() {
    if (this.empty() === true) {
      return null;
    } else {
      return this.tail.prev;
    }
  }

  append(key, val) {
    const newNode = new Node(key, val);

    this.tail.prev.next = newNode;
    newNode.prev = this.tail.prev;
    newNode.next = this.tail;
    this.tail.prev = newNode;

    this.render(this.ctx);

    return newNode;
  }

  each(callback) {
    let currentNode = this.head.next;

    while (currentNode !== this.tail) {
      callback(currentNode);
      currentNode = currentNode.next;
    }
  }

  render() {
    // Because radius = 35
    const xInit = this.x;
    const yInit = 200;

    let x = xInit;
    let y = yInit;
    let currentNode = this.tail; // Because we want to draw the head too
    let rightArrow;
    let leftArrow;
    let keyText;
    let valText;
    this.ctx.font = '16px serif';

    while (currentNode !== this.head) { // Aka the tail
      currentNode.draw(this.ctx, x, y);
      keyText = "k: " + currentNode.key;
      valText = "v: " + currentNode.val;
      this.ctx.fillStyle = "black";
      if(currentNode === this.tail) {
        this.ctx.fillText("Tail", x - 13, y + 5);
      } else {
        this.ctx.fillText(keyText, x - 15, y - 5);
        this.ctx.fillText(valText, x - 15, y + 15);
      }

      rightArrow = new DownArrow(x - (35 / 4), y + 25, "yellow");
      rightArrow.draw(this.ctx);

      leftArrow = new UpArrow(x + (35 / 4) , y + 25 + 35, "yellow");
      leftArrow.draw(this.ctx);

      y = y + 25 + 35 + 25;
      currentNode = currentNode.prev;
    }

    currentNode.draw(this.ctx, x, y); // Need to draw the tail
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Head", x - 18, y + 5);
    y = y + 25 + 35 + 25;
    currentNode = currentNode.prev;
  }

}

module.exports = LinkedList;
