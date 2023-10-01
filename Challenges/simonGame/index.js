let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameLevel = 0;
let hasGameStarted = false;

function nextSequence() {
  userClickedPattern = [];
  gameLevel++;
  $("h1#level-title").text("Level " + gameLevel);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  $("#" + name + "-sound")[0].play();
}

function animatePress(currentColor) {
  let btn = $("#" + currentColor);
  $(btn).addClass("pressed");
  setTimeout(function () {
    btn.removeClass("pressed");
  }, 100);
}

function checkGameAnswer(currentLevel) {
  let i = currentLevel - 1;
  if (gamePattern[i] === userClickedPattern[i]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1#level-title").text("Game Over, Press Any Key to Restart.");
    startOver();
  }
}

function startOver() {
  gameLevel = 0;
  hasGameStarted = false;
  gamePattern = [];
}

$(".container").on("click", ".btn", function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkGameAnswer(userClickedPattern.length);
});

$(document).on("keydown", function () {
  if (!hasGameStarted) {
    nextSequence();
    hasGameStarted = true;
    $("h1#level-title").text("Level " + gameLevel);
  }
});
