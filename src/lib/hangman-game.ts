let word = "nowordyet";
let guess = "noguess";
let noOfMistakes = 0;
let playedLetters = new Set<string>();
const NO_OF_ALLOWED_MISTAKES = 5; 

export async function initializeHangmanGame() {
  await getWordFromAPI().then((wordFromAPI) => {
    setWord(wordFromAPI);
    resetGuess(word);
  });
}

async function getWordFromAPI() {
  let response = await fetch("https://random-word-api.herokuapp.com/word");
  let randomWord = (await response.json())[0];

  word = randomWord.toUpperCase();

  return word;
}

export function answerLetter(letter : string) {
  if(getPlayedLetters().has(letter)) {
    return;
  }

  let isInWord = getWord().includes(letter);

  if(!isInWord) {
    setNoOfMistakes(getNoOfMistakes() + 1);
  }

  setPlayedLetters(getPlayedLetters().add(letter));
  updateGuess();

  if(checkLose()){
    alert("You lost.");
  }

  if(checkWin()){
    alert("You win!");
  }
}

export function checkWin() {
  return !getGuess().includes("_");
}

export function checkLose() {
  return getNoOfMistakes() >= NO_OF_ALLOWED_MISTAKES
}

export function getWord() {
  return word;
}

export function setWord(value : string) {
  word = value;
}

export function getPlayedLetters() {
  return playedLetters;
}

export function setPlayedLetters(value : Set<string>) {
  playedLetters = value;
}

export function getGuess() {
  return guess;
}

export function updateGuess() {
  guess = "";

  for(let letter of getWord()) {
    guess += getPlayedLetters().has(letter) ? ` ${letter}` : " _";
  }
}

export function resetGuess(word : string) {
  guess = "";

  for(let i = 0; i < word.length; i++) {
    guess += " _";
  }
}

export function getNoOfMistakes() {
  return noOfMistakes;
}

export function setNoOfMistakes(value : number) {
  noOfMistakes = value;
}