var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth-72;
canvas.height = window.innerHeight - 200;
let x = 0;
var color = randomColor();
var nums = [canvas.width / 10];
let run = false;
let frameRate = 60;
let counter = canvas.width / 10;
let fillall = false;
var interval = setInterval(drawSort, 1000 / frameRate);

for (var i = 0; i < counter; i++) {
  nums[i] = randomInt(0, canvas.height - 50);
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

  //first swap
  for (let j = 0; j < nums.length - 1; j++) {
    if (nums[j] > nums[j + 1]) {
      let temp = nums[j];
      nums[j] = nums[j + 1];
      nums[j + 1] = temp;
    }
  }

  //check if sorted to know if need to fill all with color
  var temparr = [];
  for (var i = 0; i < nums.length; i++) {
    temparr[i] = nums[i];
  }
  bubbleSort(temparr);
  for (var i = 0; i < nums.length; i++) {
    if (temparr[i] == nums[i]) {
      fillall = true;
    } else {
      fillall = false;
      break;
    }
  }

  let x = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i < counter) {
      ctx.fillStyle = "#FFFFFF";
    } else {
      ctx.fillStyle = color;
    }
    if (fillall) {
      ctx.fillStyle = color;
    }
    ctx.fillRect(x, canvas.height - nums[i], 10, nums[i]);
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(x, canvas.height - nums[i], 10, nums[i]);
    x += 10;
  }
  if (counter > 0) {
    counter -= 1;
  }

  if (run) {
    color = randomColor();
    ctx.fillStyle = "#FFFFFF";
    counter = canvas.width / 10;
    run = false;
    for (var ii = 0; ii < counter; ii++) {
      nums[ii] = randomInt(0, canvas.height - 50);
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
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

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
