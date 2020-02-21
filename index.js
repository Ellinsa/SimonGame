let buttonColors = ["blue", "green", "yellow", "red"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// start the game
$(document).one("keypress", function(event) {
  if (event.key === "a" || event.key === "ф" || event.key === "а") {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// PLAYER
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// game logic

function checkAnswer(currentLevel) {
  // to check if the most recent user answer is the same as the game pattern.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      });
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    restartFunc();
  }
}

// Computer
function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];

  // Add the new randomChosenColour to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // Animation for the selected button
  // Select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // Play a sound
  playSound(randomChosenColour);
}

// helper function to play a sound
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// helper function to animate the button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// restart the game
function restartFunc() {
  $("body").one("keypress", function() {
    gamePattern = [];
    level = 0;
    started = false;

    nextSequence();
  });
}
