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
  ctx.fillStyle = "black";
  ctx.fillText("Hashing Function", 432, 80);
  await timeOut(1000);
}

const buildHashMap = async (ctx) => {
  const hashMap = new HashMap(8, ctx);
  sampleValues = [9,2,7,5,8];

  // Now show value, then spit it out the other end
  for (let i = 0; i < sampleValues.length; i++) {
    clearHashingIO(ctx)
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
    ctx.fillText(textHash + " % 8 = " + (textHash % 8), 660, 140);
    await timeOut(1000);
    hashMap.set(sampleValues[i], i)
  }
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

  await timeOut(1000);
  linkList.append(100,100);
  await timeOut(1000);
  linkList.append(200,200);
  await timeOut(1000);
  linkList.update(200,20);
  await timeOut(1000);
  linkList.append(1,2);
}

const clearHashingIO = async (ctx, value) => {
  ctx.fillStyle = "black"
  ctx.fillRect(320, 20, 80, 110);
  ctx.fillRect(600, 20, 400, 150);
}
