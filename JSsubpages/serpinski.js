var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth-72;
canvas.height = window.innerHeight*.9;
console.log(window.outerwidth);
var context = canvas.getContext("2d");
var maxlength = 400;
var minlength = 5;

//canvas background
context.fillStyle = "#000000";
context.fillRect(0, 0, canvas.width, canvas.height);

// serpinski colorss
context.lineWidth = 2;
context.strokeStyle = "#ffffff";

//check max side length input if enter key pressed
var input = document.getElementById("input1");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
  updatevar();
  }
});

//check min side length if enter key pressed
var inputt2 = document.getElementById("input2");
inputt2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
  updatevar();
  }
});

function updatevar() {
  var temp = parseInt($("input[id = input1]:text").val());
  var temp2 = parseInt($("input[id=input2]:text").val());
  if (isNaN(temp) == false) {
  maxlength = temp;
  }

   if (isNaN(temp2) == false) {
  minlength = temp2;
  }

    //canvas background
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  serpinski(50, canvas.height - 10, maxlength);
}

// initial call of serpinski
serpinski(50, canvas.height - 10, maxlength);

function serpinski(x, y, sidelength) {
  if (sidelength < minlength) {
    return;
  }

  // the triangle
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + sidelength, y);
  context.lineTo(x + sidelength / 2, y - sidelength);
  context.closePath();
  context.stroke();

  //call again
  serpinski(x, y, sidelength / 2);
  serpinski(x + sidelength * 0.25, y - sidelength / 2, sidelength / 2);
  serpinski(x + sidelength / 2, y, sidelength / 2);
}
