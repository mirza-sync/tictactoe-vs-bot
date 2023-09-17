import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Square from "./components/Square";

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

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  useEffect(() => {
    const isComputerTurn =
      squares.filter((square) => square !== null).length % 2 !== 0;

    const linesThatAre = (a: string, b: string, c: string) => {
      return lines.filter((squareIndexs) => {
        const squareValues = squareIndexs.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };

    const playerWon = linesThatAre("X", "X", "X").length > 0;
    const computerWon = linesThatAre("O", "O", "O").length > 0;

    if (playerWon) {
      alert("Player won!");
    }

    if (computerWon) {
      alert("Computer won!");
    }

    const putComputerAt = (index: number) => {
      let newSquares = squares;
      newSquares[index] = "O";
      setSquares([...newSquares]);
    };

    if (isComputerTurn) {
      const emptyIndexes = squares
        .map((square, index) => (square === null ? index : null))
        .filter((val) => val !== null);

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];

      putComputerAt(randomIndex);
    }
  }, [squares]);

  function handleSquareClick(index: number) {
    const isPlayerTurn =
      squares.filter((square) => square !== null).length % 2 === 0;

    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = "X";
      setSquares([...newSquares]);
    }
  }

  return (
    <main>
      <Board>
        {squares.map((square, i) => {
          return (
            <Square
              key={i}
              x={square === "X" ? 1 : 0}
              o={square === "O" ? 1 : 0}
              onSquareClick={() => handleSquareClick(i)}
            />
          );
        })}
      </Board>
    </main>
  );
}

export default App;
