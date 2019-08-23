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

// !start test
const playerKeyList = [];
const computerKeyList = [];
const keyList = [37, 38, 39, 40, 65, 83];
// const accumulator = 30;
let iterator = 0;

window.addEventListener('keydown', event => {
  playerKeyList.push(event.keyCode);
  // console.log(playerKeyList);
});

function myLoop() {
  const randIndex = Math.floor(Math.random() * 6);
  computerKeyList.push(keyList[randIndex]);
  // ? Start fix code
  const changeArrowImg = document.querySelector(
    `div[data-key="${computerKeyList[iterator]}"] img`
  );
  const changeClass = document.querySelector(
    `div[data-key="${computerKeyList[iterator]}"]`
  );

  if (randIndex < 4) {
    changeArrowImg.src = `images/${changeArrowImg.name}ArrowAfter.png`;
    setTimeout(() => {
      changeArrowImg.src = `images/${changeArrowImg.name}ArrowBefore.png`;
    }, 100);
  }
  if (randIndex >= 4) {
    const startSound = new Audio(`audio/${changeClass.name}.wav`);
    changeClass.classList.add(`${changeClass.id}-active`);
    startSound.currentTime = 0;
    startSound.play();
    setTimeout(() => {
      changeClass.classList.remove(`${changeClass.id}-active`);
    }, 300);
  }
  //  create a loop function
  setTimeout(async () => {
    const audio = document.querySelector(
      `audio[data-key="${computerKeyList[iterator]}"]`
    );
    const play = audio.play();
    audio.currentTime = 0;
    // If the audio.play comes back undefined, throw an error
    if (play !== undefined) {
      play
        .then(_ => {
          // Automatic playback started!
          // Show playing UI.
          audio.play();
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
          console.log('auto play prevented');
        });
    }
    iterator++; //  increment the counter
    if (iterator < 6) {
      myLoop();
    }
  }, 2000);
}

myLoop();

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
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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
});
// ! END

// ? We will have to transition what we have at top for changing
// ? class to the function
function removeTransition(event) {
  if (event.propertyName !== 'transform') return;
  this.className.remove('');
}
