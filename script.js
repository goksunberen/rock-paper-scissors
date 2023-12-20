const userText = document.querySelector("#userScore");
const compText = document.querySelector("#compScore");
const description = document.querySelector("#description");
const result = document.querySelector("#result");
let playerSelection;
let compSelection;
let userScore = 0;
let compScore = 0;
let options = {
    0: "rock",
    1: "paper",
    2: "scissors"
  };

function gameRound(playerSelection, compSelection){
    result.textContent = `You chose ${playerSelection}, computer chose ${compSelection}!`;

    if(playerSelection == compSelection){
        playTieMusic();
        description.textContent = "IT'S A TIE!";
    }
    else if((playerSelection == "rock" && compSelection == "paper") || (playerSelection == "paper" && compSelection == "scissors") || (playerSelection == "scissors" && compSelection == "rock")){
        playLoseMusic();
        description.textContent = "YOU LOST!";
        compScore += 1;
        compText.textContent = compScore;
    }
    else if((playerSelection == "rock" && compSelection == "scissors") || (playerSelection == "paper" && compSelection == "rock") || (playerSelection == "scissors" && compSelection == "paper")){
        playWinMusic();
        description.textContent = "YOU WON!";
        userScore += 1;
        userText.textContent = userScore;
    }

    if(userScore == 5 || compScore == 5){
        disableClick();
        userScore > compScore ? (description.textContent = "YOU WON THE GAME!", playFinalWinMusic()) : (description.textContent = "GAME OVER!", playGameOverMusic());
        result.textContent = "PLAY AGAIN";
        result.style.border = "2px solid";
        result.style.cursor = "pointer";
        result.addEventListener("click", restartGame);
    }
}

function getComputerSelection(){
    compSelection = Math.floor(Math.random() * 3);
    return options[compSelection];
}

function startGame(option){
    gameRound(option.id, getComputerSelection());
}

function disableClick(){
    document.getElementById("rock").style.pointerEvents = "none";
    document.getElementById("paper").style.pointerEvents = "none";
    document.getElementById("scissors").style.pointerEvents = "none";
}

function enableClick(){
    document.getElementById("rock").style.pointerEvents = "auto";
    document.getElementById("paper").style.pointerEvents = "auto";
    document.getElementById("scissors").style.pointerEvents = "auto";
}

function restartGame(){
    userScore = 0;
    compScore = 0;
    description.textContent = "Score 5 Points to Win the Game!";
    result.textContent = "Pick your weapon";
    userText.textContent = userScore;
    compText.textContent = compScore;
    result.style.backgroundColor = "transparent";
    result.style.color = "rgb(226, 168, 21)";
    result.style.border = "none";
    enableClick();
}

function playWinMusic(){
    let audio = new Audio("./audio/success.mp3");
    audio.play();
}

function playLoseMusic(){
    let audio = new Audio("./audio/fail.mp3");
    audio.play();
}

function playTieMusic(){
    let audio = new Audio("./audio/tie.mp3");
    audio.play();
}

function playFinalWinMusic(){
    let audio = new Audio("./audio/finalwin.mp3");
    audio.play();
}

function playGameOverMusic(){
    let audio = new Audio("./audio/gameover.mp3");
    audio.play();
}