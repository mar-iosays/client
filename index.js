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

  const a = 65;
  const s = 83;
  const left = 37;
  const up = 38;
  const right = 39;
  const down = 40;

  if (computerKeyList[iterator] === a) {
    changeClass.classList.add('a-active');
    setTimeout(() => {
      changeClass.classList.remove('a-active');
    }, 300);
  }

  if (computerKeyList[iterator] === s) {
    changeClass.classList.add('s-active');
    setTimeout(() => {
      changeClass.classList.remove('s-active');
    }, 300);
  }

  if (computerKeyList[iterator] === left) {
    changeArrowImg.src = 'images/leftArrowAfter.png';
    setTimeout(() => {
      changeArrowImg.src = 'images/leftArrowBefore.png';
    }, 300);
  }
  if (computerKeyList[iterator] === up) {
    changeArrowImg.src = 'images/upArrowAfter.png';
    setTimeout(() => {
      changeArrowImg.src = 'images/upArrowBefore.png';
    }, 300);
  }
  if (computerKeyList[iterator] === right) {
    changeArrowImg.src = 'images/rightArrowAfter.png';
    setTimeout(() => {
      changeArrowImg.src = 'images/rightArrowBefore.png';
    }, 300);
  }
  if (computerKeyList[iterator] === down) {
    changeArrowImg.src = 'images/downArrowAfter.png';
    setTimeout(() => {
      changeArrowImg.src = 'images/downArrowBefore.png';
    }, 300);
  }
  // ? End fix code
  //  create a loop function
  setTimeout(async () => {
    const audio = document.querySelector(
      `audio[data-key="${computerKeyList[iterator]}"]`
    );
    audio.currentTime = 0;
    audio.play();
    // console.log(audio);
    iterator++; //  increment the counter
    if (iterator < 5) {
      //  if the counter < 10, call the loop function
      myLoop(); //  ..  again which will trigger another
    } //  ..  setTimeout()
  }, 2000);
}

myLoop();
// !end test

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add(`${key.id}-active`);
  console.log(key.id);
  setInterval(function() {
    key.classList.remove(`${key.id}-active`);
  }, 800);
}

// rightButton.addEventListener('keydown', event => {
// const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
// const resetSound = new Audio('./sfx_wpn_cannon2.wav');
// const failSound = new Audio('./reset.wav');
// console.log(key.dataset.key);
//   if (rightButton.key === 37) {
//     resetSound.play();
//   } else {
//     failSound.play();
//   }
// });

window.addEventListener('keydown', event => {
  const changeArrowImg = document.querySelector(
    `div[data-key="${event.keyCode}"] img`
  );
  const left = 37;
  const right = 39;
  const down = 40;
  const up = 38;
  if (!changeArrowImg) return;
  if (event.keyCode === left) {
    changeArrowImg.src = 'images/leftArrowAfter.png';
  }
  if (event.keyCode === up) {
    changeArrowImg.src = 'images/upArrowAfter.png';
  }
  if (event.keyCode === right) {
    changeArrowImg.src = 'images/rightArrowAfter.png';
  }
  if (event.keyCode === down) {
    changeArrowImg.src = 'images/downArrowAfter.png';
  }
});

window.addEventListener('keyup', event => {
  const changeArrowImg = document.querySelector(
    `div[data-key="${event.keyCode}"] img`
  );
  const left = 37;
  const right = 39;
  const down = 40;
  const up = 38;
  if (!changeArrowImg) return;
  console.log(changeArrowImg);
  if (event.keyCode === left) {
    changeArrowImg.src = 'images/leftArrowBefore.png';
  }
  if (event.keyCode === up) {
    changeArrowImg.src = 'images/upArrowBefore.png';
  }
  if (event.keyCode === right) {
    changeArrowImg.src = 'images/rightArrowBefore.png';
  }
  if (event.keyCode === down) {
    changeArrowImg.src = 'images/downArrowBefore.png';
  }
});

window.addEventListener(
  'keydown',
  e => {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

resetButton.addEventListener('click', () => {
  const resetSound = new Audio('audio/reset.wav');
  resetSound.currentTime = 0;
  resetSound.play();
});

startButton.addEventListener('click', () => {
  const startSound = new Audio('./start.wav');
  console.log(startSound);
  startSound.currentTime = 0;
  startSound.play();
});

function removeTransition(event) {
  if (event.propertyName !== 'transform') return;
  this.className.remove('');
}
