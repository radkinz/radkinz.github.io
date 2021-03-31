/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console (F12)
$("#button").click(buttonClicked);

var i = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log("HI");
console.log(i);
console.log(getRandomInt(100));

function buttonClicked() {
  i += 1;
  console.log(i);
  console.log($("#clicks").text(i));
  $("#clicks").text(i);
  
  //user input
  console.log(parseInt($("input:text").val()));
}
