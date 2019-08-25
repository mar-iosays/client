/**
 * Get game controller buttons
 */
const controllerWrapper = document.getElementById('controller-wrapper');
const aButton = document.getElementById('a-button');
const sButton = document.getElementById('s-button');
const resetButton = document.querySelector('.reset');
const startButton = document.querySelector('.start');
const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const streakCounter = document.getElementById('streak-counter');

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionEnd', removeTransition));
window.addEventListener('keydown', playSound);

const playerKeyList = [];
const computerKeyList = [];
// Get the Keyboard ascii code
const keyList = [37, 38, 39, 40, 65, 83];
// const accumulator = 30;
let iterator = 0;

window.addEventListener('keydown', event => {
  playerKeyList.push(event.keyCode);
  // console.log(playerKeyList);
});

// for (iterator; iterator < 10; iterator++) {
//   const randiterator = Math.floor(Math.random() * 6);
//   console.log(keyList[randiterator]);
// }

function myLoop() {
  const randIndex = Math.floor(Math.random() * 6);
  computerKeyList.push(keyList[randIndex]);
  const changeArrowImg = document.querySelector(
    `div[data-key="${computerKeyList[iterator]}"] img`
  );
  const changeClass = document.querySelector(
    `div[data-key="${computerKeyList[iterator]}"]`
  );
  const audio = document.querySelector(
    `audio[data-key="${computerKeyList[iterator]}"]`
  );
  if (randIndex < 4) {
    changeArrowImg.src = `images/${changeArrowImg.name}ArrowAfter.png`;
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
      changeArrowImg.src = `images/${changeArrowImg.name}ArrowBefore.png`;
    }, 100);
  }
  if (randIndex >= 4) {
    const startSound = new Audio(`audio/${changeClass.id}.wav`);
    changeClass.classList.add(`${changeClass.id}-active`);
    startSound.currentTime = 0;
    startSound.play();
    setTimeout(() => {
      changeClass.classList.remove(`${changeClass.id}-active`);
    }, 300);
  }
  //  create a loop function
  setTimeout(() => {
    iterator++; //  increment the counter
    if (iterator < 6) {
      myLoop();
    }
  }, 1000);
}

// myLoop();

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add(`${key.id}-active`);
  setInterval(function() {
    key.classList.remove(`${key.id}-active`);
  }, 800);
}

window.addEventListener('keydown', event => {
  const changeArrowImg = document.querySelector(
    `div[data-key="${event.keyCode}"] img`
  );
  if (!changeArrowImg) return;
  changeArrowImg.src = `images/${changeArrowImg.name}ArrowAfter.png`;
});

window.addEventListener('keyup', event => {
  const changeArrowImg = document.querySelector(
    `div[data-key="${event.keyCode}"] img`
  );
  if (!changeArrowImg) return;
  changeArrowImg.src = `images/${changeArrowImg.name}ArrowBefore.png`;
});

window.addEventListener(
  'keydown',
  event => {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
      event.preventDefault();
    }
  },
  false
);

// ! START: These two functions do the exact same thing
resetButton.addEventListener('click', () => {
  const resetSound = new Audio('audio/reset.wav');
  resetSound.currentTime = 0;
  resetSound.play();
});

startButton.addEventListener('click', () => {
  const startSound = new Audio('./start.wav');
  startSound.currentTime = 0;
  startSound.play();
  setTimeout(() => {
    myLoop();
  }, 12000);
});
// ! END

// ? We will have to transition what we have at top for changing
// ? class to the function
function removeTransition(event) {
  if (event.propertyName !== 'transform') return;
  this.className.remove('');
}
