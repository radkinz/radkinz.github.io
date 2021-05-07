/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

  adjustWindowSize();


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.color = "white";
  document.getElementById("mySidenav").style.width = "0";
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
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
window.addEventListener("resize", adjustWindowSize);
