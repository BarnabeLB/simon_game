var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;





$(".btn").click(function () {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatedPress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);


});

$(document).keydown(function (event) {
    if (!started) {

        $("#level-title").text("level " + level);
        nextSequence();
        started = true;


    }

});

function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColor[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    $("#level-title").text("level " + level);
    level++;
    userClickedPattern = [];
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatedPress(currentColour) {

    $(".btn." + currentColour).addClass("pressed");

    setTimeout(function () {
        $(".btn." + currentColour).removeClass("pressed");
    }, 100);


}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);


        }

    } else {

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();


    }


}


function startOver() {
    level = 0
    gamePattern = [];
    started = false;
}