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
  const [letters, updateLetters] = useState<string[]>([]);

  useEffect(() => {
    refreshGuess();
  }, [word]);

  const resetHangman = () => {
    updateLetters([]);
    for (let i = 65; i <= 90; i++) {
      updateLetters((prevState) => [...prevState, String.fromCharCode(i)]);
    }

    getWordFromAPI().then((result) => {
      updateWord(result);
      refreshGuess();
      updatePlayedLetters(new Set());
      updateNoOfMistakes(0);
    });
  };

  const refreshGuess = () => {
    return updateGuess(getGuess(word, playedLetters));
  };

  const pressLetter = (letter: string) => {
    const [newPlayedLetters, newNoOfMistakes] = answerLetter(
      letter,
      word,
      playedLetters,
      noOfMistakes
    );

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
