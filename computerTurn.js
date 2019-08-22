function myLoop() {
  const randIndex = Math.floor(Math.random() * 6);
  computerKeyList.push(keyList[randIndex]);
  // ? Start fix code
  const changeArrowImg = document.querySelector(
    `div[data-key="${computerKeyList[iterator]}"] img`
  );
  const left = 37;
  const right = 39;
  const down = 40;
  const up = 38;
  if (computerKeyList[iterator] === left) {
    changeArrowImg.src = 'images/leftArrowAfter.png';
    setTimeout(() => {
      changeArrowImg.src = 'images/leftArrowBefore.png';
    }, 100);
  }
  if (computerKeyList[iterator] === up) {
    changeArrowImg.src = 'images/upArrowAfter.png';
    setTimeout(() => {
      changeArrowImg.src = 'images/upArrowBefore.png';
    }, 100);
  }
  if (computerKeyList[iterator] === right) {
    changeArrowImg.src = 'images/rightArrowAfter.png';
    setTimeout(() => {
      changeArrowImg.src = 'images/rightArrowBefore.png';
    }, 100);
  }
  if (computerKeyList[iterator] === down) {
    changeArrowImg.src = 'images/downArrowAfter.png';
    setTimeout(() => {
      changeArrowImg.src = 'images/downArrowBefore.png';
    }, 100);
  }
  // ? End fix code
  //  create a loop function
  setTimeout(async () => {
    const audio = document.querySelector(
      `audio[data-key="${computerKeyList[iterator]}"]`
    );
    audio.currentTime = 0;
    audio.play();
    console.log(audio);
    iterator++; //  increment the counter
    if (iterator < 5) {
      //  if the counter < 10, call the loop function
      myLoop(); //  ..  again which will trigger another
    } //  ..  setTimeout()
  }, 500);
}
