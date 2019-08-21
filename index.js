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

// Keeping count of the streak
const streakCounter = document.getElementById('streak-counter');

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('');
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

resetButton.addEventListener('click', () => {
  const resetSound = new Audio('./reset.wav');
  resetSound.currentTime = 0;
  resetSound.play();
});

function removeTransition(event) {
  if (event.propertyName !== 'transform') return;
  this.className.remove('');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionEnd', removeTransition));
window.addEventListener('keydown', playSound);
