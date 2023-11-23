import { useState } from "react";

interface Props {
  letter: string;
  key: number;
  isActive: boolean;
  onClickHandler: () => void;
}

const LetterButton = ({ letter, isActive, onClickHandler }: Props) => {
  return (
    <button
      type="button"
      className="btn btn-lg btn-dark mx-1 px-4 font-monospace"
      disabled={!isActive}
      onClick={() => {
        onClickHandler();
      }}
    >
      {letter}
    </button>
  );
};

export default LetterButton;
