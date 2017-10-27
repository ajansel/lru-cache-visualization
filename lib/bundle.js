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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);
const RightArrow = __webpack_require__(1);
const LeftArrow = __webpack_require__(2);
const LinkedList = __webpack_require__(3);
const HashMap = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 1000;
  canvasEl.height = 600;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle="black";
  ctx.fillRect(0,0, 1000,600);

  hashValues(ctx);
  buildHashMap(ctx);
  buildLinkList(ctx);

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

const hashValues = async (ctx) => {
  sampleValues = [9,2,5,7,1];

  // Draw hashing machine first
  ctx.fillStyle="green";

  // Draw left triangle
  ctx.lineWidth = 3;
  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(400, 25);
  ctx.lineTo(400, 125);
  ctx.lineTo(475,75);
  ctx.lineTo(400, 25);
  ctx.stroke();
  ctx.fill();

  // Draw right triangle
  ctx.lineWidth = 3;
  ctx.strokeStyle = "green";
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
  ctx.fillStyle = "black";
  ctx.fillText("Hashing Function", 432, 80);
  await timeOut(1000);

  // Now show value, then spit it out the other end
  for (let i = 0; i < sampleValues.length; i++) {
    ctx.font = '28px serif';
    ctx.fillStyle = "green";
    text = String(sampleValues[i])
    ctx.fillText(text, 325, 85);
    await timeOut(1000);

    // Draw Arrow
    leftArrow = new RightArrow(395, 75, "green");
    leftArrow.draw(ctx);
    await timeOut(1000);

    // Draw Arrow
    leftArrow = new RightArrow(655, 75, "green");
    leftArrow.draw(ctx);
    await timeOut(1000);

    textHash = text.hashCode();
    ctx.font = '26px serif';
    ctx.fillStyle = "green";
    ctx.fillText("Hash Value: " + textHash, 660, 85);
    await timeOut(1000);
    ctx.font = '26px serif';
    ctx.fillStyle = "green";
    ctx.fillText("Mod by num buckets:", 660, 115);
    await timeOut(1000);
    ctx.font = '26px serif';
    ctx.fillStyle = "green";
    ctx.fillText(textHash + " % 8 = " + (textHash % 8), 660, 140);
    await timeOut(1000);
    break
  }
}

const buildHashMap = async (ctx) => {
  const hashMap = new HashMap(8, ctx);
}

const buildLinkList = async (ctx) => {
  // await timeOut(7000);
  const linkList = new LinkedList(ctx);
  await timeOut(1000);
  linkList.append(9, 81);
  await timeOut(1000);
  linkList.append(2, 4);
  await timeOut(1000);
  linkList.append(5, 25);
  await timeOut(1000);
  linkList.append(7, 49);
  await timeOut(1000);
  linkList.append(1, 1);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const LinkedList = __webpack_require__(9);
const LeftBracket = __webpack_require__(6);
const RightBracket = __webpack_require__(7);

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
      this.store[i].append(9, 81);
      x = x + 75 + 25;
    }
  }

  render() {
    const leftBracket = new LeftBracket(50, 200, "blue");
    const rightBracket = new RightBracket(950, 200, "blue");
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


/***/ }),
/* 6 */
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
    ctx.lineTo(this.xPos, this.yPos + 250);
    ctx.lineTo(this.xPos + 37.5, this.yPos + 250);
    ctx.stroke();
  }
}

module.exports = LeftBracket;


/***/ }),
/* 7 */
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
    ctx.lineTo(this.xPos, this.yPos + 250);
    ctx.lineTo(this.xPos - 37.5, this.yPos + 250);
    ctx.stroke();
  }
}

module.exports = RightBracket;


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(12);
const UpArrow = __webpack_require__(11);
const DownArrow = __webpack_require__(10);

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
    const yInit = 240;

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

      rightArrow = new DownArrow(x - (35 / 4), y + 25, "#ffce00");
      rightArrow.draw(this.ctx);

      leftArrow = new UpArrow(x + (35 / 4) , y + 25 + 35, "#ffce00");
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


/***/ }),
/* 10 */
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
/* 11 */
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
/* 12 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map