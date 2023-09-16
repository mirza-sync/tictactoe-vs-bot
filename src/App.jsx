import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Square from "./components/Square";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    <main>
      <Board>
        {squares.map((_, i) => {
          return <Square key={i} />;
        })}
      </Board>
    </main>
  );
}

export default App;
