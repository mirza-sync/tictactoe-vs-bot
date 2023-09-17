type SquareProps = {
  x: number;
  o: number;
  onSquareClick: () => void;
};

function Square(props: SquareProps) {
  return (
    <div className="square" onClick={props.onSquareClick}>
      {props.x ? "X" : props.o ? "O" : ""}
    </div>
  );
}

export default Square;
