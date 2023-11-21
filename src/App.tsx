import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LetterButton from "./components/LetterButton";
import {
  initializeHangmanGame,
  answerLetter,
  getWord,
  getGuess,
  getPlayedLetters,
} from "./lib/hangman-game";

function App() {
  let letters: string[] = [];

  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }

  const [wordToGuess, setWordToGuess] = useState("-");
  const [playedLetters, setPlayedLetters] = useState(new Set<string>());
  // const [isReady, setIsReady] = useState(false);

  const pressLetter = (letter: string) => {
    answerLetter(letter);
  };

  initializeHangmanGame().then(() => {
    setWordToGuess(getGuess());
    setPlayedLetters(getPlayedLetters().add("a"));
    // setIsReady(true);
  });

  return (
    <div className="d-flex flex-column justify-content-between bg-secondary vh-100">
      <div className="bg-danger py-3">
        <h1>Hangman</h1>
      </div>
      <div className="row mx-0">
        <div className="col-5 bg-info">
          hangman guy here
          <div>Played letters</div>
          <span>{Array.from(playedLetters).map((letter) => letter)}</span>
        </div>
        <div className="col-7 bg-warning">{wordToGuess}</div>
      </div>
      <div className="bg-success">
        {letters.map((letter) => (
          <LetterButton
            letter={letter}
            onClickHandler={() => {
              pressLetter(letter);
            }}
          />
        ))}
        {/* remove later */}
      </div>
    </div>
  );
}

export default App;
