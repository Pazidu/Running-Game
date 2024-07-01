var boy = document.getElementById("boy");
let ideleImageNumber = 1;
let runImageNumber = 1;
let idleAnimationNumber = 0;
let runAnimationNumber = 0;

function idleAnimation() {
  ideleImageNumber = ideleImageNumber + 1;
  if (ideleImageNumber == 11) {
    ideleImageNumber = 1;
  }
  boy.src = "resourses/png/Idle (" + ideleImageNumber + ").png";
}

function idleAnimationStart() {
  idleAnimationNumber = setInterval(idleAnimation, 200);
}

function runAnimation() {
  runImageNumber = runImageNumber + 1;
  if (runImageNumber == 11) {
    runImageNumber = 1;
  }
  boy.src = "resourses/png/Run (" + runImageNumber + ").png";
}
function runAnimationStart() {
  runAnimationNumber = setInterval(runAnimation, 100);
  clearInterval(idleAnimationNumber);
}

function keyCheck(event) {
  // alert(event.which);
  // Enter = 13;
  // sapce =32;

  keyCode = event.which;
  if (keyCode == 13) {
    if (runAnimationNumber == 0) {
      runAnimationStart();
    }

    if (moveBackgroundAnaimationId == 0) {
      moveBackgroundAnaimationId = setInterval(moveBackground, 100);
    }

    if (boxAnimationId == 0) {
      boxAnimationId = setInterval(boxAnimation, 100);
    }
  }

  if (keyCode == 32) {
    if (jumpAnimationNumber == 0) {
      jumpAnimationStart();
    }
    if (moveBackgroundAnaimationId == 0) {
      moveBackgroundAnaimationId = setInterval(moveBackground, 80);
    }
    if (boxAnimationId == 0) {
      boxAnimationId = setInterval(boxAnimation, 100);
    }
  }
}
let backgroundPositionX = 0;
let moveBackgroundAnaimationId = 0;

let score = 0;

function moveBackground() {
  backgroundPositionX = backgroundPositionX - 20;
  document.getElementById("background").style.backgroundPositionX =
    backgroundPositionX + "px";
  score = score + 1;
  document.getElementById("score").innerHTML = score;
}

jumpAnimationNumber = 0;
jumpImageNumber = 1;
boyMarginTop = 410;

function jumpAnimation() {
  jumpImageNumber = jumpImageNumber + 1;

  if (jumpImageNumber <= 6) {
    boyMarginTop = boyMarginTop - 40;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber >= 7) {
    boyMarginTop = boyMarginTop + 40;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber == 11) {
    jumpImageNumber = 1;
    clearInterval(jumpAnimationNumber);
    jumpAnimationNumber = 0;
    runImageNumber = 0;
    runAnimationStart();
  }
  boy.src = "resourses/png/Jump (" + jumpImageNumber + ").png";
}

function jumpAnimationStart() {
  clearInterval(idleAnimationNumber);
  runImageNumber = 0;
  clearInterval(runAnimationNumber);
  jumpAnimationNumber = setInterval(jumpAnimation, 120);
}

boxMarginLeft = 1540;

function createBoxes() {
  for (let i = 0; i < 10; i++) {
    let box = document.createElement("div");
    box.className = "box";
    document.getElementById("background").appendChild(box);
    box.style.marginLeft = boxMarginLeft + "px";
    box.id = "box" + i;

    //boxMarginLeft = boxMarginLeft + 1000;

    if (i < 5) {
      boxMarginLeft = boxMarginLeft + 2000;
    }
    if (i >= 5) {
      boxMarginLeft = boxMarginLeft + 1000;
    }
  }
}

let boxAnimationId = 0;

function boxAnimation() {
  for (let i = 0; i < 10; i++) {
    let box = document.getElementById("box" + i);
    let currentMarginLeft = getComputedStyle(box).marginLeft;
    let newMarginLeft = parseInt(currentMarginLeft) - 50;
    box.style.marginLeft = newMarginLeft + "px";

    if ((newMarginLeft >= -110) & (newMarginLeft <= 100)) {
      if (boyMarginTop > 300) {
        clearInterval(boxAnimationId);

        clearInterval(runAnimationNumber);
        runAnimationNumber = -1;

        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = -1;

        clearInterval(moveBackgroundAnaimationId);
        moveBackgroundAnaimationId = -1;

        document.querySelector(".box").style.visibility = "hidden";

        deathAnimationNumber = setInterval(boyDeathAniamtion, 100);
      }
    }
  }
}

deathImageNumber = 1;

function boyDeathAniamtion() {
  deathAnimationNumber = 0;
  deathImageNumber = deathImageNumber + 1;

  if (deathImageNumber == 11) {
    deathImageNumber = 10;

    document.getElementById("end").style.visibility = "visible";
    document.getElementById("yourScore").innerHTML = score;
    document.getElementById("score").style.visibility = "hidden";
  }

  boy.src = "resourses/png/Dead (" + deathImageNumber + ").png";
}

function reload() {
  location.reload();
}
