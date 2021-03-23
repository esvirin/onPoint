const floatFooter = document.querySelector(".float__footer");
const floatPagin = document.querySelectorAll(".pag_item");
const inputRange = document.querySelector("#input__range");
const sectionThree = document.querySelector(".section-three");
const parallaxImg = document.querySelectorAll(".section-two img");
const container = document.querySelector(".container");

let currentPage = 0;
let touchStartY = 0;
let touchMoveY = 0;
let touchModuleY = 0;

//add parallax
document.addEventListener("scroll", function () {
  parallaxImg.forEach((item) => {
    item.style.transform = `translateY(${window.scrollY / 8}px)`;
  });
});

document.addEventListener("scroll", function () {
  //kill bottom nav
  let position = window.scrollY;
  position > 50
    ? (floatFooter.style.display = "none")
    : (floatFooter.style.display = "flex");

  if (position >= 1500) {
    currentPage = 2;
  } else if (position < 750) {
    currentPage = 0;
  } else {
    currentPage = 1;
  }

  // pagination
  floatPagin.forEach(function (item) {
    if (item.id - 1 === currentPage) {
      item.style.backgroundColor = "#f78b1f";
    } else {
      item.style.backgroundColor = "#fff";
    }
  });
});

//touch handler
container.addEventListener("touchstart", (start) => {
  touchStartY = start.touches[0].clientY;
});

container.addEventListener(
  "touchmove",
  (move) => {
    move.preventDefault();
    touchMoveY = move.touches[0].clientY;
    touchModuleY = touchStartY - touchMoveY;
  },
  { passive: false }
);

container.addEventListener("touchend", function () {
  if (touchModuleY > 150 && currentPage < 2) {
    window.scrollBy({ top: 768, behavior: "smooth" });
  }
  if (touchModuleY < -150 && currentPage > 0) {
    window.scrollBy({ top: -768, behavior: "smooth" });
  }
});

//sticky range
inputRange.addEventListener("input", function (ev) {
  let val = +ev.target.value;
  if (val <= 15) {
    inputRange.value = 0;
  } else if (val >= 35 && val <= 50) {
    inputRange.value = 50;
  } else if (val > 50 && val <= 65) {
    inputRange.value = 50;
  } else if (val >= 85 && val <= 100) {
    inputRange.value = 100;
  }
});

// logic of section-three background
inputRange.addEventListener("input", function (ev) {
  switch (+ev.target.value) {
    case 0:
      sectionThree.style.backgroundPosition = "left";
      break;

    case 50:
      sectionThree.style.backgroundPosition = "center";
      break;

    case 100:
      sectionThree.style.backgroundPosition = "right";
      break;
  }
});

// style input-range
inputRange.addEventListener("input", function (ev) {
  inputRange.style.background = `-webkit-linear-gradient(left, #d1eaff 0%, #d1eaff ${+ev
    .target.value}%, #d1eaff80 ${+ev.target.value}%, #d1eaff80 100%)`;
});
