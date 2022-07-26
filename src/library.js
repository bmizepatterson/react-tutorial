function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

function calculateDraw(squares) {
	return squares.every(square => square != null) && !calculateWinner(squares);
}

function squareIndexToDesc(index) {
  let row;
  if (index < 3) {
    row = "top";
  } else if (index < 6) {
    row = "middle";
  } else {
    row = "bottom";
  }

  const columns = ["left", "center", "right"];
  const column = columns[index % 3];

  return `${row} ${column}`;
}

export { calculateWinner, squareIndexToDesc, calculateDraw };