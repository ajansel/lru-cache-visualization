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
    ctx.fillStyle = "yellow";
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
    const numNodes = 7; // Will become linkedList.count
    const numSpaces = numNodes - 1;
    const spaceSize = (1000 - (numNodes * 70) - (numSpaces * 50)) / 2; // Will become a default diameter
    const xInit = spaceSize + 35; // Will become a deafult radius
    const yInit = 500;

    let x = xInit;
    let y = yInit;
    let currentNode = this.head; // Because we want to draw the head too
    let rightArrow;
    let leftArrow;
    let keyText;
    let valText;
    this.ctx.font = '20px serif';

    while (currentNode !== this.tail) { // Aka the tail
      currentNode.draw(this.ctx, x, y);
      keyText = "k: " + currentNode.key;
      valText = "v: " + currentNode.val;
      this.ctx.fillStyle = "black";
      if(currentNode === this.head) {
        this.ctx.fillText("Head", x - 22, y + 5);
      } else {
        this.ctx.fillText(keyText, x - 17, y - 5);
        this.ctx.fillText(valText, x - 17, y + 20);
      }

      rightArrow = new RightArrow(x + 35 + 50, y - (70 / 4), "yellow");
      rightArrow.draw(this.ctx);

      leftArrow = new LeftArrow(x + 35, y + (70 / 4), "yellow");
      leftArrow.draw(this.ctx);

      x = x + 35 + 50 + 35;
      currentNode = currentNode.next;
    }

    currentNode.draw(this.ctx, x, y); // Need to draw the tail
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Tail", x - 17, y + 5);
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
  asyncBuild(ctx);

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
  ctx.moveTo(400, 50);
  ctx.lineTo(400, 150);
  ctx.lineTo(475,100);
  ctx.lineTo(400, 50);
  ctx.stroke();
  ctx.fill();

  // Draw right triangle
  ctx.lineWidth = 3;
  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(600, 50);
  ctx.lineTo(600, 150);
  ctx.lineTo(525,100);
  ctx.lineTo(600, 50);
  ctx.stroke();
  ctx.fill();

  // Draw rectangle of hashing machine
  ctx.fillRect(450,50, 100, 100);
  ctx.font = '20px serif';
  ctx.fillStyle = "black";
  ctx.fillText("Hashing Function", 432, 105);
  await timeOut(1000);

  // Now show value, then spit it out the other end
  for (let i = 0; i < sampleValues.length; i++) {
    ctx.font = '28px serif';
    ctx.fillStyle = "red";
    text = String(sampleValues[i])
    ctx.fillText(text, 325, 110);
    await timeOut(1000);

    // Draw Arrow
    leftArrow = new RightArrow(395, 100, "green");
    leftArrow.draw(ctx);
    await timeOut(1000);

    // Draw Arrow
    leftArrow = new RightArrow(655, 100, "green");
    leftArrow.draw(ctx);
    await timeOut(1000);

    textHash = text.hashCode();
    ctx.fillStyle = "red";
    ctx.fillText("Hash Value: " + textHash, 660, 107);
    await timeOut(1000);
    ctx.fillStyle = "red";
    ctx.fillText("Mod by num buckets:", 660, 132);
    await timeOut(1000);
    ctx.fillStyle = "red";
    ctx.fillText(textHash + " % 8 = " + (textHash % 8), 660, 157);
    await timeOut(1000);
    break
  }
}

const asyncBuild = async (ctx) => {
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

// const buildLinkListAndAppend5Times = (ctx) => {
//   const linkList = new LinkedList(ctx);
//   setTimeout(() => {
//     linkList.append(9, 81);
//     setTimeout(() => {
//       linkList.append(2, 4);
//       setTimeout(() => {
//         linkList.append(5, 25);
//         setTimeout(() => {
//           linkList.append(7, 49);
//           setTimeout(() => {
//             linkList.append(1, 1);
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// };

// const buildLinkList = (ctx, skip) => {
//   // Build linkedList
//   const linkList = new LinkedList();
//   linkList.append(9, 81);
//   linkList.append(2, 4);
//   linkList.append(5, 25);
//   linkList.append(7, 49);
//   if(skip === true) linkList.append(1, 1);
//
//   // Because radius = 35
//   const numNodes = 7; // Will become linkedList.count
//   const numSpaces = numNodes - 1;
//   const spaceSize = (1000 - (numNodes * 70) - (numSpaces * 50)) / 2; // Will become a default diameter
//   const xInit = spaceSize + 35; // Will become a deafult radius
//   const yInit = 500;
//
//   let x = xInit;
//   let y = yInit;
//   let currentNode = linkList.head; // Because we want to draw the head too
//   let rightArrow;
//   let leftArrow;
//   let keyText;
//   let valText;
//   ctx.font = '20px serif';
//
//   while (currentNode !== linkList.tail) { // Aka the tail
//     currentNode.draw(ctx, x, y);
//     keyText = "k: " + currentNode.key;
//     valText = "v: " + currentNode.val;
//     ctx.fillStyle = "black";
//     if(currentNode === linkList.head) {
//       ctx.fillText("Head", x - 22, y + 5);
//     } else {
//       ctx.fillText(keyText, x - 17, y - 5);
//       ctx.fillText(valText, x - 17, y + 20);
//     }
//
//     rightArrow = new RightArrow(x + 35 + 50, y - (70 / 4));
//     rightArrow.draw(ctx);
//
//     leftArrow = new LeftArrow(x + 35, y + (70 / 4));
//     leftArrow.draw(ctx);
//
//     x = x + 35 + 50 + 35;
//     currentNode = currentNode.next;
//   }
//
//   currentNode.draw(ctx, x, y); // Need to draw the tail
//   ctx.fillStyle = "black";
//   ctx.fillText("Tail", x - 17, y + 5);
// };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const LinkedList = __webpack_require__(3);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map