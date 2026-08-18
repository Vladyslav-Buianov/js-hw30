const textRef = document.querySelector("#text");

let message = 0;

const intervalId = setInterval(() => {
  message += 1;
  textRef.textContent = `Повідомлення ${message}`;
  if (message === 5) {
    clearInterval(intervalId);
  }
}, 2000);

const boxRef = document.querySelector(".box");

setInterval(() => {
  const { r, g, b } = randomColor();
  boxRef.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  boxRef.classList.toggle("move");
}, 1250);

function randomColor() {
  const r = Math.floor(Math.random() * (255 - 1) + 1);
  const g = Math.floor(Math.random() * (255 - 1) + 1);
  const b = Math.floor(Math.random() * (255 - 1) + 1);
  return { r, g, b };
}

const btnRef = document.querySelector(".game__btn");
const scoreRef = document.querySelector(".game__score");
const clicksRef = document.querySelector(".game__clicks");
const timerRef = document.querySelector(".game__timer");
const gameBoxRef = document.querySelector(".game__box");

let score = 0;
let clicks = 0;
let timeLeft = 2.5;
let timerInterval = null;
let gameActive = false;
let highScore = Number(localStorage.getItem("clickerHighScore")) || 0;

gameBoxRef.style.position = "relative";
btnRef.style.position = "absolute";

function moveButton() {
  const boxWidth = gameBoxRef.clientWidth - btnRef.clientWidth;
  const boxHeight = gameBoxRef.clientHeight - btnRef.clientHeight;

  const randomX = Math.floor(Math.random() * Math.max(0, boxWidth));
  const randomY = Math.floor(Math.random() * Math.max(0, boxHeight));

  btnRef.style.left = `${randomX}px`;
  btnRef.style.top = `${randomY}px`;
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 2.5;
  timerRef.textContent = `${timeLeft.toFixed(1)}s`;

  timerInterval = setInterval(() => {
    timeLeft = Math.max(0, timeLeft - 0.1);
    timerRef.textContent = `${timeLeft.toFixed(1)}s`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 100);
}

function endGame() {
  clearInterval(timerInterval);
  gameActive = false;
  btnRef.textContent = "Play Again";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("clickerHighScore", highScore);
    timerRef.textContent = `Game Over! New High Score: ${highScore}`;
  } else {
    timerRef.textContent = `Game Over! Best: ${highScore}`;
  }
}

function resetGame() {
  score = 0;
  clicks = 0;
  gameActive = true;
  btnRef.textContent = "Click Me!";
  
  scoreRef.textContent = String(score).padStart(6, "0");
  clicksRef.textContent = `${clicks} clicks`;
  
  moveButton();
  startTimer();
}

btnRef.addEventListener("click", () => {
  if (!gameActive) {
    resetGame();
    return;
  }

  score += 10;
  clicks += 1;

  scoreRef.textContent = String(score).padStart(6, "0");
  clicksRef.textContent = `${clicks} clicks`;

  moveButton();
  startTimer();
});

const formRef = document.querySelector(".time__form");
const messageRef = document.querySelector(".time__message")

formRef.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const seconds = evt.currentTarget.elements[0].value;
  const milliseconds = Number(seconds.padEnd(4, 0));
  setTimeout(() => {
    messageRef.textContent = `This message arrived in ${seconds}s`
  }, milliseconds);
  evt.currentTarget.reset();
});
