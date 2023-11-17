let word = "nowordyet";

export async function initializeHangmanGame() {
  await getWordFromAPI().then((wordFromAPI) => {
    word = wordFromAPI;
  });
}

export function answerLetter(letter : string) {
  alert(letter);
}

export function getWord() {
  return word;
}

async function getWordFromAPI() {
  await new Promise(f => setTimeout(f, 1000));
  
  let word : string = "apple";

  return word;
}