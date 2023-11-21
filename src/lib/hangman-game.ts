let word = "nowordyet";
let guess = "noguess";
let noOfMistakes = 0;
let playedLetters = new Set<string>();

export async function initializeHangmanGame() {
  await getWordFromAPI().then((wordFromAPI) => {
    setWord(wordFromAPI);
    resetGuess(word);
  });
}

async function getWordFromAPI() {
  await new Promise(f => setTimeout(f, 1000));
  
  let word : string = "apple";

  return word;
}

export function answerLetter(letter : string) {
  alert(letter);
  setPlayedLetters(getPlayedLetters().add(letter))
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