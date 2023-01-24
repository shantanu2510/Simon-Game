// alert("hey");
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var flag  = true;
$(".btn").on("click", function handler(){
    // console.log(this);
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
})
$(document).on("keydown",function(){
    if(flag)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        flag = false;
    }

});



function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100,).fadeIn(100,).fadeOut(100,).fadeIn(100,);
    playSound(randomChosenColour);


}



function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}
function animatePress(currentColour)
{
    $('#'+currentColour).addClass("pressed");
    setTimeout(()=>{
        $('#'+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentlevel)
{
    if(userClickedPattern[currentlevel] === gamePattern[currentlevel])
    {
       //console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
    else
    {
        //console.log("wrong");
        playSound("wrong");
         $("body").addClass("game-over");
         setTimeout(function(){
            $("body").removeClass("game-over");
         },200);
         $("#level-title").text("Game Over, Press Any Key to Restart");
         startOver();
    }
}

function startOver()
{
    gamePattern =[];
    flag=true;
    level = 0;
}