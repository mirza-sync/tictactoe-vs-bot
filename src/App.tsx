import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Square from "./components/Square";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleSquareClick(index) {
    let newSquares = squares;
    newSquares[index] = "X";
    setSquares([...newSquares]);
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
