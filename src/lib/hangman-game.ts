const NO_OF_ALLOWED_MISTAKES = 9; 

export async function getWordFromAPI() {
  let response = await fetch("https://random-word-api.herokuapp.com/word");
  let word = (await response.json())[0];

  return word.toUpperCase();
}

export function answerLetter(letter : string, word : string, correctLetters : Set<string>, wrongLetters : Set<string>, noOfMistakes : number) {
  let isInWord = word.includes(letter);

  if(!isInWord) {
    noOfMistakes += 1;
    wrongLetters.add(letter);
  }

  correctLetters.add(letter);

  return [
    correctLetters,
    wrongLetters,
    noOfMistakes,
  ] as const;
}

export function checkWin(guess : string) {
  return !guess.includes("_");
}

export function checkLose(noOfMistakes : number) {
  return noOfMistakes >= NO_OF_ALLOWED_MISTAKES;
}


export function getGuess(word : string, correctLetters : Set<string>) {
  let guess = "";

  for(let letter of word) {
    guess += correctLetters.has(letter) ? ` ${letter}` : " _";
  }

  return guess;
}