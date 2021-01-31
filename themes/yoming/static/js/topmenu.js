//=================================================
// overlay topmenu for tablet

function openTablet() {
  document.querySelector(".topmenu-tablet-list").style.width = "300px";
  document.querySelector(".page").style.marginLeft = "300px";
  document.querySelector(".tablet-open-btn").style.display = "none";
  document.querySelector(".tablet-close-btn").style.display = "inline-block";
  document.querySelector(".topmenu-tablet-listbar").style.opacity = "1";
}

function closeTablet() {
  document.querySelector(".topmenu-tablet-listbar").style.opacity = "0";
  document.querySelector(".tablet-close-btn").style.display = "none";
  document.querySelector(".tablet-open-btn").style.display = "inline-block";
  document.querySelector(".topmenu-tablet-list").style.width = "0";
  document.querySelector(".page").style.marginLeft = "0";
}

//=================================================
// full width topmenu for mobile

function openMobile() {
  document.querySelector(".topmenu-mobile-list").style.height = "100%";
  document.querySelector(".mobile-close-btn").style.display = "inline-block";
  document.querySelector(".mobile-open-btn").style.display = "none";
  document.querySelector(".topmenu-mobile-listbar").style.opacity = "1";
}

function closeMobile() {
  document.querySelector(".topmenu-mobile-listbar").style.opacity = "0";
  document.querySelector(".mobile-close-btn").style.display = "none";
  document.querySelector(".mobile-open-btn").style.display = "inline-block";
  document.querySelector(".topmenu-mobile-list").style.height = "0";
}

//=================================================
// event on resize window

function resizeMenu() {
  if (window.matchMedia("(min-width: 1201px)").matches) {
    closeTablet();
  } else if (window.matchMedia("(max-width: 700px)").matches) {
    closeTablet();
  } else if (window.matchMedia("(min-width: 701px)").matches) {
    closeMobile();
  }
}

window.onresize = function() {resizeMenu()};


//=================================================
