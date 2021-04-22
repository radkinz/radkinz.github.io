/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

$(document).ready(function() {
  adjustWindowSize();
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.color = "white";
  document.getElementById("mySidenav").style.width = "0";
}

// Defining event listener function
function adjustWindowSize() {
  console.log(window.innerWidth);
  var width = window.innerWidth;

  if (width < 800) {
    $(".link").hide();
  } else {
    $(".link").show();
  }

  if (width >= 800) {
    $("#sidepanel").hide();
    $(".sidenav").hide();
  } else {
    $("#sidepanel").show();
    $(".sidenav").show();
  }
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);
