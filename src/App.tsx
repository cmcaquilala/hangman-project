import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import LetterButton from "./components/LetterButton";

function App() {
  let letters = ["A", "B", "C", "D", "E"];

  const pressLetter = function (letter: string) {
    alert(letter);
  };

  return (
    <div className="d-flex flex-column justify-content-between bg-secondary vh-100">
      <div className="bg-danger py-3">
        <h1>Hangman</h1>
      </div>
      <div className="row mx-0">
        <div className="col-5 bg-info">hangman guy here</div>
        <div className="col-7 bg-warning">word here</div>
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
        <LetterButton
          letter="F"
          isActive={false}
          onClickHandler={() => pressLetter("F")}
        />
      </div>
    </div>
  );
}

export default App;
