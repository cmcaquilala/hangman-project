import { useState } from "react";

interface Props {
  letter: string;
  key: number;
  isActive: boolean;
  onClickHandler: () => void;
}

const LetterButton = ({ letter, isActive, onClickHandler }: Props) => {
  // const [isActive, setIsActive] = useState(true);
  if (!isActive) {
    return (
      <button className="btn btn-primary" disabled>
        {letter}
      </button>
    );
  }

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        onClickHandler();
        // setIsActive(false);
      }}
    >
      {letter}
    </button>
  );
};

export default LetterButton;
