interface Props {
  letter: string;
  isActive: boolean;
  onClickHandler: () => void;
}

const LetterButton = ({ letter, isActive, onClickHandler }: Props) => {
  if (!isActive) {
    return (
      <button className="btn btn-primary" disabled>
        {letter}
      </button>
    );
  }

  return (
    <button className="btn btn-primary" onClick={onClickHandler}>
      {letter}
    </button>
  );
};

export default LetterButton;
