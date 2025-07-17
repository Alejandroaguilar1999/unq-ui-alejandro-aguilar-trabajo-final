const letters = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L','Ñ'],
  ['Z','X','C','V','B','N','M']
];

function Keyboard({ onKeyClick, usedLetters }) {
  const getColor = (letter) => {
    if (!usedLetters[letter]) return '#ddd';
    if (usedLetters[letter] === 'correct') return 'green';
    if (usedLetters[letter] === 'elsewhere') return 'orange';
    return 'gray';
  };

  return (
    <div className="keyboard">
      {letters.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map(letter => (
            <button
              key={letter}
              onClick={() => onKeyClick(letter.toLowerCase())}
              style={{
                backgroundColor: getColor(letter.toLowerCase()),
              }}
              className="key-button"
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
