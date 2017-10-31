const Node = require("./node");
const RightArrow = require("./right_arrow");
const LeftArrow = require("./left_arrow");

class LinkedList {
  constructor(ctx, cacheSize = 5) {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.ctx = ctx;
    this.cacheSize = cacheSize;

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
    let currentNode = this.head.next;

    while (currentNode !== this.tail) {
      if (currentNode.key === key) {
        count = count + 1;
        currentNode = this.tail;
      } else {
        currentNode = currentNode.next;
      }
    }

    return count > 0;
  }

  remove(key) {
    let nodeReturn = undefined;
    let currentNode = this.head.next;

    while (currentNode !== this.tail) {
      if (currentNode.key === key) {
        currentNode.remove();
        nodeReturn = currentNode.val;
        currentNode = this.tail;
      } else {
        currentNode = currentNode.next;
      }
    }

    return nodeReturn;
  }

  get(key) {
    let nodeReturn = undefined;
    let currentNode = this.head.next;

    while (currentNode !== this.tail) {
      if (currentNode.key === key) {
        nodeReturn = currentNode.val;
        currentNode = this.tail;
      } else {
        currentNode = currentNode.next;
      }
    }

    return nodeReturn;
  }

  getLetter(key) {
    let nodeReturn = undefined;
    let currentNode = this.head.next;

    while (currentNode !== this.tail) {
      if (currentNode.key === key) {
        nodeReturn = currentNode.letter;
        currentNode = this.tail;
      } else {
        currentNode = currentNode.next;
      }
    }

    return nodeReturn;
  }

  update(key, val) {
    let nodeReturn = undefined;
    let currentNode = this.head.next;

    while (currentNode !== this.tail) {
      if (currentNode.key === key) {
        currentNode.val = val;
        nodeReturn = currentNode;
        currentNode = this.tail;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.remove(nodeReturn.key);
    this.append(nodeReturn.key, nodeReturn.val);

    return nodeReturn;
  }

  append(key, val) {
    if (this.includes(key)) {
      return this.update(key, val);
    } else {
      const newNode = new Node(key, val);

      this.tail.prev.next = newNode;
      newNode.prev = this.tail.prev;
      newNode.next = this.tail;
      this.tail.prev = newNode;

      let count = 0;
      this.each(() => {
        count = count + 1;
      });

      if (count > this.cacheSize) this.remove(this.head.next.key);

      this.render(this.ctx);

      return newNode;
    }
  }

  each(callback) {
    let currentNode = this.head.next;

    while (currentNode !== this.tail) {
      callback(currentNode);
      currentNode = currentNode.next;
    }
  }

  setLetters() {
    let count = 0;
    let currentNode = this.head.next;
    let letters = ["A", "B", "C", "D", "E"];

    while (currentNode !== this.tail) {
      currentNode.letter = letters[count];
      count = count + 1;
      currentNode = currentNode.next;
    }
  }

  clearLetters() {
    this.ctx.fillStyle = "#262228";
    this.ctx.fillRect(0, 565, 1000, 35);
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
      keyText = "K: " + currentNode.key;
      valText = "V: " + currentNode.val;
      this.ctx.fillStyle = "#262228";
      if(currentNode === this.tail) {
        this.ctx.fillText("Tail", x - 17, y + 5);

        this.clearLetters();
        this.setLetters();
      } else {
        this.ctx.fillText(keyText, x - 20, y - 5);
        this.ctx.fillText(valText, x - 20, y + 20);

        this.ctx.font = '24px serif';
        this.ctx.fillStyle = "#ffce00";
        this.ctx.fillText(currentNode.letter, x - 10, y + 60 );
        this.ctx.font = '20px serif';
      }

      rightArrow = new RightArrow(x - 70 + 35, y - (70 / 4), "#ffce00");
      rightArrow.draw(this.ctx);

      leftArrow = new LeftArrow(x - 50 - 35, y + (70 / 4), "#ffce00");
      leftArrow.draw(this.ctx);

      x = x - 35 - 50 - 35;
      currentNode = currentNode.prev;
    }

    currentNode.draw(this.ctx, x, y); // Need to draw the tail
    this.ctx.fillStyle = "#262228";
    this.ctx.fillText("Head", x - 22, y + 5);
    x = x - 35 - 50 - 35;
    currentNode = currentNode.prev;
  }

}

module.exports = LinkedList;
