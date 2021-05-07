/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
var avgfrequency = true;
Boolean(avgfrequency);

//button stuff
$("#buttonname").text("Visualizer of all Frequencies");
$("#button").click(buttonclick);

function buttonclick() {
  if (avgfrequency) {
    $("#buttonname").text("Visualizer of the Average Frequency");
  } else {
    $("#buttonname").text("Visualizer of all Frequencies");
  }
  avgfrequency = !avgfrequency;
}

//setup canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth*.95;
canvas.height = window.innerHeight*.9;

//setup background
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//load music
let audioElement = document.getElementById("music");
audioElement.addEventListener("play", Audio);

//setup audio system
let analyser, frequencyLength, frequencyData;

function Audio() {
  let audioContext = new window.AudioContext();
  let source = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();

  source.connect(analyser);
  source.connect(audioContext.destination);

  //frequencyLength = analyser.frequencyBinCount;
  frequencyLength = 100;
  frequencyData = new Uint8Array(frequencyLength);

  draw();
}

//draw vissualizer
function draw() {
  analyser.getByteFrequencyData(frequencyData);

  //draw background to clear
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (avgfrequency) {
    singlebarvisualizer();
  } else {
    multiplebarvisualizer();
  }

  requestAnimationFrame(draw);
}

function avg(array) {
  var total = 0;

  for (var i = 0; i < array.length; i++) {
    total += array[i];
  }

  return total / array.length;
}

function multiplebarvisualizer() {
  for (let i = 0; i < frequencyLength; i++) {
    let frequencyHeight = frequencyData[i];
    let frequencyWidth = Math.ceil(canvas.width / frequencyLength);

    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#e52e71");
    gradient.addColorStop(1, "#ff8a00");
    ctx.fillStyle = gradient;

    ctx.fillRect(
      frequencyWidth * i,
      canvas.height - frequencyHeight,
      frequencyWidth,
      frequencyHeight
    );
  }
}

function singlebarvisualizer() {
  //draw box
  ctx.beginPath();
  var dimensions = avg(frequencyData);
  ctx.rect(
    canvas.width / 2 - 50,
    canvas.height - dimensions * 2,
    100,
    avg(frequencyData) * 2
  );
  ctx.closePath();
  ctx.fillStyle = "#FF0000";
  ctx.fill();
}
