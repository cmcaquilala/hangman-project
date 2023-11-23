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
  // const [row1Letters, row1UpdateLetters] = useState<letterButton[]>([]);
  // const [row2Letters, row2UpdateLetters] = useState<letterButton[]>([]);
  // const [row3Letters, row3UpdateLetters] = useState<letterButton[]>([]);

  const [keyboardLetters, updateKeyboardLetters] = useState<letterButton[][]>([
    [],
    [],
    [],
  ]);

  interface letterButton {
    letter: string;
    isActive: boolean;
  }

  useEffect(() => {
    refreshGuess();
  }, [word]);

  const resetHangman = () => {
    buildLetterButtons();

    getWordFromAPI().then((result) => {
      updateWord(result);
      refreshGuess();
      updatePlayedLetters(new Set());
      updateNoOfMistakes(0);
    });
  };

  const refreshGuess = () => {
    return updateGuess((prev) => getGuess(word, playedLetters));
  };

  const buildLetterButtons = () => {
    const getKeyboardRows = () => {
      let row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
      let row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
      let row3 = ["Z", "X", "C", "V", "B", "N", "M"];

      return [row1, row2, row3];
    };

    updateKeyboardLetters((prev) => [[], [], []]);
    let keyboardRows = getKeyboardRows();

    for (let [index, row] of keyboardRows.entries()) {
      for (let letter of row) {
        updateKeyboardLetters((prev) => {
          prev[index] = [...prev[index], { letter: letter, isActive: true }];
          return prev;
        });
      }
    }

    console.log(keyboardLetters);
  };

  const pressLetter = (letter: string) => {
    const [newPlayedLetters, newNoOfMistakes] = answerLetter(
      letter,
      word,
      playedLetters,
      noOfMistakes
    );

    updateKeyboardLetters((prev) => {
      for (let row of prev)
        for (let item of row) {
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
    <div className="d-flex flex-column justify-content-between bg-dark vh-100 font-monospace">
      <div className="d-flex justify-content-center bg-secondary py-3">
        <h1>Hangman</h1>
      </div>
      <div className="row mx-0 h-50 text-white">
        <div className="col-5 text-center">
          <div className="h-75 d-flex flex-column justify-content-center">
            hangman guy here
            <div>No of mistakes: {noOfMistakes}</div>
          </div>

          <div className="h-25">
            <div>Played letters</div>
            <span>
              {" "}
              {Array.from(playedLetters)
                .sort()
                .map((letter) => " " + letter + " ")}
            </span>
          </div>
        </div>
        <div className="col-7 d-flex flex-column justify-content-center text-center">
          {guess}
        </div>
      </div>
      <div className="d-flex flex-column bg-secondary py-5">
        {keyboardLetters.map((row) => (
          <div className="text-center mt-1">
            {row.map((letter, index) => (
              <LetterButton
                letter={letter.letter}
                isActive={letter.isActive}
                key={index}
                onClickHandler={() => pressLetter(letter.letter)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
