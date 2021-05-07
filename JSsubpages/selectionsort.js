/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
let startingpos = 0;
let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth-72;
canvas.height = window.innerHeight - 200;
let l = canvas.width / 10;
let x = 0;
var color = randomColor();
var nums = [l];
let run = false;
let frameRate = 30;
var interval = setInterval(drawSort, 1000 / frameRate);

for (var i = 0; i < l; i++) {
  nums[i] = randomInt(0, 300);
}

function updatevar() {
  var temp = parseFloat($("input:text").val());
  if (isNaN(temp) == false) {
    clearInterval(interval);
    if (temp > 1) {
    frameRate = temp;
    } else {
      frameRate = 1;
    }
    interval = setInterval(drawSort, 1000 / frameRate);
  }
}

$("#resortbutton").click(buttonPressed);
$("#resortbutton").click(updatevar);

drawSort();

function drawSort() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < l; i++) {
    if (i < startingpos) {
      ctx.fillStyle = color;
    }
    if (i > startingpos) {
      ctx.fillStyle = "#FFFFFF";
    }
    ctx.fillRect(x, canvas.height - nums[i], 10, nums[i]);
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(x, canvas.height - nums[i], 10, nums[i]);
    x += 10;
  }
  x = 0;
  if (startingpos < l) {
    SelectionSort();
  }

  if (run) {
    color = randomColor();
    ctx.fillStyle = "#FFFFFF";
    run = false;
    startingpos = 0;
    for (var ii = 0; ii < l; ii++) {
      nums[ii] = randomInt(0, 300);
    }
  }
}

function SelectionSort() {
  let lowestpos = startingpos;
  for (
    var thingurlookinat = startingpos;
    thingurlookinat < nums.length;
    thingurlookinat++
  ) {
    if (nums[thingurlookinat] < nums[lowestpos]) {
      lowestpos = thingurlookinat;
    }
  }
  let storagebin;
  storagebin = nums[startingpos];
  nums[startingpos] = nums[lowestpos];
  nums[lowestpos] = storagebin;
  startingpos += 1;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function background() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function randomColor() {
  var randomColor =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";
  return randomColor;
}

function buttonPressed() {
  run = !run;
}
