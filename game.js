
const colors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];
var level = 0;
var flag = false;

$(document).keypress(function(){
  if(!flag){
    nextSequence();
    flag = true;
  }
});

$(".btn").click(function(){
  var userChosenButton = $(this).attr("id");
  userPattern.push(userChosenButton);
  //console.log(userPattern);
  playSound(userChosenButton);
  animatePress(userChosenButton);
  checkAnswer(userPattern.length - 1);
});

function playSound(sound){
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(curr){
  $("#" + curr).addClass("pressed");
  setTimeout(function(){
    $("#" + curr).removeClass("pressed");
  }, 100);
}

function checkAnswer(curr){
  if(gamePattern[curr] === userPattern[curr]){
    if(userPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to restart.");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  flag = false;
}

function nextSequence(){
  userPattern = [];
  $("h1").text("Level " + level + " ");
  var randomNumber = Math.floor(Math.random() * 4);
  var firstColour = colors[randomNumber];

  gamePattern.push(firstColour);

  $("#" + firstColour).fadeOut(100).fadeIn(100);

  // playing the audio
  // $("#" + firstColour).ready(function(){
  //   const audio = new Audio("sounds/" + firstColour + ".mp3");
  //   audio.play();
  // });

//not playing the opening sound of random colour chosen
  // $(document).keypress(playSound(firstColour));
  playSound(firstColour);
  level++;
}
