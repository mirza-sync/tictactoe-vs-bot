function Square({ x, o, onSquareClick }) {
  return (
    <div className="square" onClick={onSquareClick}>
      {x ? "X" : o ? "O" : ""}
    </div>
  );
}

export default Square;
