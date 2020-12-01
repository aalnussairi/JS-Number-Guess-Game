'use strict';

// capture interactive elements
const number = document.querySelector('.number');
const scoreSpan = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const body = document.querySelector('body');
const message = document.querySelector('#message');
const guess = document.querySelector('.guess');
const check = document.querySelector('.check');
const again = document.querySelector('.again');

let secretNumber = 1;
let score = 20;
let highscoreVal = 0;
random();

// Event listeners
check.addEventListener('click', playGame);
guess.addEventListener('keyup', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    playGame();
  } else if (event.keyCode === 27) {
    resetGame();
  }
});
again.addEventListener('click', resetGame);

function playGame() {
  const guess = Number(document.querySelector('.guess').value);
  // When there is no input
  if (!guess) {
    message.textContent = '⛔ Input a Number';
    // When player wins
  } else if (guess === secretNumber) {
    message.textContent = '🎉 Correct Number!';
    body.style.backgroundColor = '#60b347';
    number.textContent = secretNumber;
    number.style.width = '30rem';

    if (score > highscore.textContent) {
      highscoreVal = score;
      highscore.textContent = highscoreVal;
    }
    // When input is wrong
  } else if (guess !== secretNumber) {
    if (score >= 1) {
      message.textContent =
        guess > secretNumber ? '📈 Too high!' : '📉 Too Low!';
      score--;
      scoreSpan.textContent = score;
      // When game is over
    } else {
      message.textContent = '😢 Game Over';
      body.style.backgroundColor = '#b34760';
      number.textContent = secretNumber;
      number.style.width = '30rem';
    }
  }
}

function resetGame() {
  random();
  console.log(secretNumber);
  score = 20;
  number.textContent = '?';
  number.style.width = '15rem';
  scoreSpan.textContent = 20;
  guess.value = null;
  message.textContent = 'Start guessing...';
  body.style.backgroundColor = '#222';
}

function random() {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
}
