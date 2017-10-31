const Node = require("./linked_list/node");
const RightArrow = require("./linked_list/right_arrow");
const LeftArrow = require("./linked_list/left_arrow");
const LinkedList = require("./linked_list/linked_list");
const HashMap = require("./hash_map/hash_map");

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
