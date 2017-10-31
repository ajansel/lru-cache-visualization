/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
      xPos, yPos, 35, 0, 2*Math.PI, true
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class RightArrow {
  constructor(xPos, yPos, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
  }

  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.xPos - 10, this.yPos - 10); // 0,0
    ctx.lineTo(this.xPos, this.yPos); // 10,10
    ctx.lineTo(this.xPos - 10,this.yPos + 10); // 0,20
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos - 50, this.yPos);
    ctx.stroke();
  }
}

module.exports = RightArrow;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class LeftArrow {
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
    ctx.lineTo(this.xPos + 10,this.yPos + 10); // 0,20
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos + 50, this.yPos);
    ctx.stroke();
  }
}

module.exports = LeftArrow;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);
const RightArrow = __webpack_require__(1);
const LeftArrow = __webpack_require__(2);
const LinkedList = __webpack_require__(4);
const HashMap = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 1200;
  canvasEl.height = 800;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle="#262228";
  ctx.fillRect(0,0, 1000,600);

  buildHashingMachine(ctx);
  buildLRUCache(ctx);
});

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

const timeOut = (ms) => new Promise(res => setTimeout(res, ms))

const buildHashingMachine = async (ctx) => {
  // Draw hashing machine first
  ctx.fillStyle="#007849";

  // Draw left triangle
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#007849";
  ctx.beginPath();
  ctx.moveTo(400, 25);
  ctx.lineTo(400, 125);
  ctx.lineTo(475,75);
  ctx.lineTo(400, 25);
  ctx.stroke();
  ctx.fill();

  // Draw right triangle
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#007849";
  ctx.beginPath();
  ctx.moveTo(600, 25);
  ctx.lineTo(600, 125);
  ctx.lineTo(525, 75);
  ctx.lineTo(600, 25);
  ctx.stroke();
  ctx.fill();

  // Draw rectangle of hashing machine
  ctx.fillRect(450,25, 100, 100);
  ctx.font = '20px serif';
  ctx.fillStyle = "#262228";
  ctx.fillText("Hashing Function", 432, 80);
  await timeOut(1000);
}

const buildLRUCache = async (ctx) => {
  const linkList = new LinkedList(ctx);
  const hashMap = new HashMap(8, ctx);
  sampleValues = [9,7,2,5,8];

  // Now show value, then spit it out the other end
  for (let i = 0; i < sampleValues.length; i++) {
    await timeOut(1000);
    linkList.append(sampleValues[i], sampleValues[i] ** 2);
    await timeOut(1000);

    ctx.font = '28px serif';
    ctx.fillStyle = "#007849";
    text = String(sampleValues[i])
    ctx.fillText(text, 325, 85);
    await timeOut(1000);

    // Draw Arrow
    leftArrow = new RightArrow(395, 75, "#007849");
    leftArrow.draw(ctx);
    await timeOut(1000);

    // Draw Arrow
    leftArrow = new RightArrow(655, 75, "#007849");
    leftArrow.draw(ctx);
    await timeOut(1000);

    textHash = text.hashCode();
    ctx.font = '26px serif';
    ctx.fillStyle = "#007849";
    ctx.fillText("Hash Value: " + textHash, 660, 85);
    await timeOut(1000);
    ctx.font = '26px serif';
    ctx.fillStyle = "#007849";
    ctx.fillText("Mod by num buckets:", 660, 115);
    await timeOut(1000);
    ctx.font = '26px serif';
    ctx.fillStyle = "#007849";
    ctx.fillText(textHash + " % 8 = " + (textHash % 8), 660, 145);
    await timeOut(1000);
    hashMap.set(sampleValues[i], linkList.getLetter(sampleValues[i]))
    await timeOut(1000);
    clearHashingMachineIO(ctx)
    await timeOut(1000);
  }
}

const clearHashingMachineIO = async (ctx, value) => {
  ctx.fillStyle = "#262228"
  ctx.fillRect(320, 20, 80, 110);
  ctx.fillRect(600, 20, 400, 150);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);
const RightArrow = __webpack_require__(1);
const LeftArrow = __webpack_require__(2);

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
    this.ctx.fillRect(0, 570, 1000, 30);
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
        this.ctx.fillText(currentNode.letter, x - 10, y + 65 );
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const LinkedList = __webpack_require__(6);
const LeftBracket = __webpack_require__(10);
const RightBracket = __webpack_require__(11);

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
    const leftBracket = new LeftBracket(50, 200 - 27, "#037584");
    const rightBracket = new RightBracket(950, 200 - 27, "#037584");
    leftBracket.draw(this.ctx);
    rightBracket.draw(this.ctx);


    let x = 50 + 37.5;
    let y = 210 + 200;

    this.ctx.font = '24px serif';
    this.ctx.fillStyle = "#037584";
    this.ctx.fillText("Index:", x - 40, y + 25 );

    for (let i = 0; i < 8; i++) {
      x = x + 25;
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "#037584";

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      x = x + 75;
      this.ctx.lineTo(x, y);
      this.ctx.stroke();

      this.ctx.font = '24px serif';
      this.ctx.fillStyle = "#037584";
      this.ctx.fillText(String(i), x - 42, y + 25 );
    }
  }

}

module.exports = HashMap;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(7);
const UpArrow = __webpack_require__(8);
const DownArrow = __webpack_require__(9);

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
      keyText = "K: " + currentNode.key;
      valText = "V: " + currentNode.val;
      this.ctx.fillStyle = "#262228";
      if(currentNode === this.tail) {
        this.ctx.fillText("Tail", x - 13, y + 5);
      } else {
        this.ctx.fillText(keyText, x - 15, y - 5);
        this.ctx.fillText(valText, x - 15, y + 15);
      }

      rightArrow = new DownArrow(x - (35 / 4), y + 25, "#ffce00");
      rightArrow.draw(this.ctx);

      leftArrow = new UpArrow(x + (35 / 4) , y + 25 + 35, "#ffce00");
      leftArrow.draw(this.ctx);

      y = y + 25 + 35 + 25;
      currentNode = currentNode.prev;
    }

    currentNode.draw(this.ctx, x, y); // Need to draw the tail
    this.ctx.fillStyle = "#262228";
    this.ctx.fillText("Head", x - 18, y + 5);
    y = y + 25 + 35 + 25;
    currentNode = currentNode.prev;
  }

}

module.exports = LinkedList;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports) {

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
    ctx.moveTo(this.xPos + 7, this.yPos - 7); // 0,0
    ctx.lineTo(this.xPos, this.yPos); // 7,7
    ctx.lineTo(this.xPos - 7,this.yPos - 7); // 0,20
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos, this.yPos - 35);
    ctx.stroke();
  }
}

module.exports = UpArrow;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

class DownArrow {
  constructor(xPos, yPos, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
  }

  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.xPos + 7, this.yPos + 7); // 0,0
    ctx.lineTo(this.xPos, this.yPos); // 7,7
    ctx.lineTo(this.xPos - 7,this.yPos + 7); // 0,20
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos, this.yPos + 35);
    ctx.stroke();
  }
}

module.exports = DownArrow;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

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


/***/ }),
/* 11 */
/***/ (function(module, exports) {

class RightBracket {
  constructor(xPos, yPos, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
  }

  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(this.xPos - 37.5, this.yPos);
    ctx.lineTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos, this.yPos + 210 + 27);
    ctx.lineTo(this.xPos - 37.5, this.yPos + 210 + 27);
    ctx.stroke();
  }
}

module.exports = RightBracket;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map