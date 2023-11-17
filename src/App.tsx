import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import LetterButton from "./components/LetterButton";
import {
  initializeHangmanGame,
  answerLetter,
  getWord,
} from "./lib/hangman-game";

function App() {
  let letters = ["A", "B", "C", "D", "E"];
  const [wordToGuess, setWordToGuess] = useState("-");
  const [isReady, setIsReady] = useState(false);

  const pressLetter = function (letter: string) {
    pressLetter(letter);
  };

  initializeHangmanGame().then(() => {
    setWordToGuess(getWord());
    setIsReady(true);
  });

  return (
    <div className="d-flex flex-column justify-content-between bg-secondary vh-100">
      <div className="bg-danger py-3">
        <h1>Hangman</h1>
      </div>
      <div className="row mx-0">
        <div className="col-5 bg-info">hangman guy here</div>
        <div className="col-7 bg-warning">{wordToGuess}</div>
      </div>
      <div className="bg-success">
        {letters.map((letter) => (
          <LetterButton
            letter={letter}
            isActive={true}
            onClickHandler={() => pressLetter(letter)}
          />
        ))}
        {/* remove later */}
      </div>
    </div>
  );
}

export default App;
