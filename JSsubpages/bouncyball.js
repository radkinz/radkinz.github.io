var canvas = document.getElementById("Canvas");
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.9;
var ctx = canvas.getContext("2d");

//class
class Bubble {
  //declare variables
  constructor() {
    this.FrameRate = 30;
    this.width = canvas.width;
    this.height = canvas.height;
    this.x = random(0, this.width);
    this.y = random(0, this.height);
    this.Vx = random(-7, 7);
    this.Vy = random(-7, 7);
    this.r = 10;
    this.color =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
  }

  update() {
    //update variables
    this.x += this.Vx;
    this.y += this.Vy;

    //bounce off walls
    if (dist(this.x, this.y, this.x, this.height) < this.r) {
      this.Vy = random(-7, -3);
    }
    if (dist(this.x, this.y, this.width, this.y) < this.r) {
      this.Vx = random(-7, -3);
    }
    if (dist(this.x, this.y, this.x, 0) < this.r) {
      this.Vy = random(3, 7);
    }
    if (dist(this.x, this.y, 0, this.y) < this.r) {
      this.Vx = random(3, 7);
    }

    //move ball
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let bubbles = [canvas.width*.2];
for (var i = 0; i < canvas.width*.2; i++) {
  bubbles[i] = new Bubble();
}
loop();

function loop() {
  window.requestAnimationFrame(loop);

  //draw background to clear
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function diff(num1, num2) {
  if (num1 > num2) {
    return num1 - num2;
  } else {
    return num2 - num1;
  }
}

function dist(x1, y1, x2, y2) {
  var deltaX = diff(x1, x2);
  var deltaY = diff(y1, y2);
  var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return dist;
}
