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
  const [winner, setWinner] = useState<"X" | "O" | null>(null);

  useEffect(() => {
    const isComputerTurn =
      squares.filter((square) => square !== null).length % 2 !== 0;

    const linesThatAre = (
      a: string | null,
      b: string | null,
      c: string | null
    ) => {
      return lines.filter((squareIndexs) => {
        const squareValues = squareIndexs.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };

    const emptyIndexes = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);

    const playerWon = linesThatAre("X", "X", "X").length > 0;
    const computerWon = linesThatAre("O", "O", "O").length > 0;

    if (playerWon) {
      setWinner("X");
    }

    if (computerWon) {
      setWinner("O");
    }

    const putComputerAt = (index: number | null) => {
      if (index) {
        let newSquares = squares;
        newSquares[index] = "O";
        setSquares([...newSquares]);
      }
    };

    if (isComputerTurn) {
      const winningLines = linesThatAre("O", "O", null);
      if (winningLines.length > 0) {
        const winningIndex = winningLines[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(winningIndex);
        return;
      }

      const linesToBlock = linesThatAre("X", "X", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("O", null, null);
      if (linesToContinue.length > 0) {
        const continueIndex = linesToContinue[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(continueIndex);
        return;
      }

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
      {winner !== null && (
        <div className={`result ${winner === "X" ? "green" : "red"}`}>
          {winner === "X" ? "You WON!" : "You LOST!"}
        </div>
      )}
    </main>
  );
}

export default App;
