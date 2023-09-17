const synth = window.speechSynthesis;
const rate = document.querySelector("#rate");


const text = document.querySelector('#text')
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
    losses: 0,
    ties: 0
};
updateScoreElement();

/* if (!score){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}*/
function speak() {
  if (synth.speaking) {
    synth.cancel();
  }
  const audio = new SpeechSynthesisUtterance(text.textContent);
  audio.addEventListener("error", () => {
    console.error("SpeechSynthesisUtterance error");
  });
  audio.rate = 1.3;
  audio.pitch =  1.2;
  synth.speak(audio);
}

function playGame(playerMove) {
  speak();
  const computerMove = pickComputerMove();
  let gameResult = document.querySelector('.js-result'); 

  let result = "";
  if (playerMove === "scissors") {
      if (computerMove === "rock") {
        result = "You lose";
      } else if (computerMove === "paper") {
        result = "You win";
      } else if (computerMove === "scissors") {
        result = "Tie";
      }
  } else if (playerMove === "paper") {
      if (computerMove === "rock") {
        result = "You win";
      } else if (computerMove === "paper") {
        result = "Tie";
      } else if (computerMove === "scissors") {
        result = "You lose";
      }
  } else if (playerMove === "rock") {
      if (computerMove === "rock") {
        result = "Tie";
      } else if (computerMove === "paper") {
        result = "You lose";
      } else if (computerMove === "scissors") {
        result = "You win";
      }}

      let play = true;


  if (result === 'You win'){
    gameResult.style.color = 'green';
    score.wins += 1;
  }else if(result === 'Tie'){
    gameResult.style.color = 'blue';

    score.ties += 1;
  }else if(result === 'You lose'){
    gameResult.style.color = 'red';

    score.losses += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

 setTimeout(updateScoreElement, 1500);

 if(play){
  setTimeout(() => {
    gameResult.innerHTML = result;

    document.querySelector('.js-moves')
     .innerHTML = `
     You <button class="move-button2";
     >${playerMove}</button>
   <button class="move-button2" style="margin-right: 5px; border-color: blue;">${computerMove}</button>Computer
     `
   if(playerMove === 'rock'){
    document.querySelector('.move-button2').style.borderColor = 'brown';
   }else if(playerMove === 'paper'){
    document.querySelector('.move-button2').style.borderColor = '#ece';

   }else if(playerMove === 'scissors'){
    document.querySelector('.move-button2').style.borderColor = 'indigo';

   }
   
  }, 1500)
 }
 

 /* alert(
    `You picked ${playerMove}. Computer picked ${computerMove}. ${result}
  Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `
  );*/
 
      
}
function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}
function resetScore(){
 score.wins = 0;
 score.losses = 0;
 score.ties = 0;
 localStorage.removeItem('score')
 updateScoreElement();
 location.reload();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

