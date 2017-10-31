const Node = require("./node");
const RightArrow = require("./right_arrow");
const LeftArrow = require("./left_arrow");

class LinkedList {
  constructor(ctx) {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.ctx = ctx;

    this.render(ctx);
  }

  draw(ctx) {
    ctx.fillStyle = "#ffce00";
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

  includes(key) {
    let count = 0;
    this.each((node) => {
      if (node.key === key) count = count + 1;
    });

    return count > 0;
  }

  remove(key) {
    this.each((node) => {
      if (node.key === key) {
        node.remove();
        return node.val;
      }
    });

    return null;
  }

  get(key) {
    this.each((node) => {
      if (node.key === key) return node.val;
    });

    return null;
  }

  update(key, val) {
    this.each((node) => {
      if (node.key === key) {
        node.val = val;
        return node;
      }
    });
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
    const numNodes = 7; // Will become linkedList.count
    const numSpaces = numNodes - 1;
    const spaceSize = (1000 - (numNodes * 70) - (numSpaces * 50)) / 2; // Will become a default diameter
    const xInit = 1000 - spaceSize - 35; // Will become a deafult radius
    const yInit = 525;

    let x = xInit;
    let y = yInit;
    let currentNode = this.tail; // Because we want to draw the head too
    let rightArrow;
    let leftArrow;
    let keyText;
    let valText;
    this.ctx.font = '20px serif';

    while (currentNode !== this.head) { // Aka the tail
      currentNode.draw(this.ctx, x, y);
      keyText = "k: " + currentNode.key;
      valText = "v: " + currentNode.val;
      this.ctx.fillStyle = "black";
      if(currentNode === this.tail) {
        this.ctx.fillText("Tail", x - 17, y + 5);
      } else {
        this.ctx.fillText(keyText, x - 17, y - 5);
        this.ctx.fillText(valText, x - 17, y + 20);
      }

      rightArrow = new RightArrow(x - 70 + 35, y - (70 / 4), "#ffce00");
      rightArrow.draw(this.ctx);

      leftArrow = new LeftArrow(x - 50 - 35, y + (70 / 4), "#ffce00");
      leftArrow.draw(this.ctx);

      x = x - 35 - 50 - 35;
      currentNode = currentNode.prev;
    }

    currentNode.draw(this.ctx, x, y); // Need to draw the tail
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Head", x - 22, y + 5);
    x = x - 35 - 50 - 35;
    currentNode = currentNode.prev;
  }

}

module.exports = LinkedList;
