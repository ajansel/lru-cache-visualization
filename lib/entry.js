const Node = require("./linked_list/node");
const RightArrow = require("./linked_list/right_arrow");
const LeftArrow = require("./linked_list/left_arrow");
const LinkedList = require("./linked_list/linked_list");
const HashMap = require("./hash_map/hash_map");

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
