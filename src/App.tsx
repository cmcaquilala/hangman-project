import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LetterButton from "./components/LetterButton";
import {
  answerLetter,
  getWordFromAPI,
  getGuess,
  checkWin,
  checkLose,
} from "./lib/hangman-game";

function App() {
  const [word, updateWord] = useState("");
  const [guess, updateGuess] = useState("-");
  const [playedLetters, updatePlayedLetters] = useState<Set<string>>(new Set());
  const [noOfMistakes, updateNoOfMistakes] = useState(0);
  const [letters, updateLetters] = useState<letterButton[]>([]);

  interface letterButton {
    letter: string;
    isActive: boolean;
  }

  useEffect(() => {
    refreshGuess();
  }, [word]);

  const resetHangman = () => {
    updateLetters([]);
    for (let i = 65; i <= 90; i++) {
      updateLetters((prevState: letterButton[]) => [
        ...prevState,
        { letter: String.fromCharCode(i), isActive: true },
      ]);
    }

    getWordFromAPI().then((result) => {
      updateWord(result);
      refreshGuess();
      updatePlayedLetters(new Set());
      updateNoOfMistakes(0);
    });
  };

  const refreshGuess = () => {
    return updateGuess((prev) => (prev = getGuess(word, playedLetters)));
  };

  const pressLetter = (letter: string) => {
    const [newPlayedLetters, newNoOfMistakes] = answerLetter(
      letter,
      word,
      playedLetters,
      noOfMistakes
    );

    updateLetters((prev) => {
      for (let item of prev) {
        if (item.letter === letter) {
          item.isActive = false;
          break;
        }
      }
      return prev;
    });
    updatePlayedLetters(newPlayedLetters);
    updateNoOfMistakes(newNoOfMistakes);
    refreshGuess();

    if (checkWin(getGuess(word, newPlayedLetters))) {
      alert("You win!");

      resetHangman();
    }

    if (checkLose(newNoOfMistakes)) {
      alert("You lost.");
      alert("The word was " + word);

      resetHangman();
    }
  };

  useEffect(() => {
    resetHangman();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between bg-secondary vh-100">
      <div className="bg-danger py-3">
        <h1>Hangman</h1>
      </div>
      <div className="row mx-0">
        <div className="col-5 bg-info">
          hangman guy here {word}
          <div>No of mistakes: {noOfMistakes}</div>
          <div>Played letters</div>
          <span>
            {Array.from(playedLetters)
              .sort()
              .map((letter) => " " + letter + " ")}
          </span>
        </div>
        <div className="col-7 bg-warning">{guess}</div>
      </div>
      <div className="bg-success">
        {letters.map((letter, i) => (
          <LetterButton
            letter={letter.letter}
            isActive={letter.isActive}
            key={i}
            onClickHandler={() => {
              pressLetter(letter.letter);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
