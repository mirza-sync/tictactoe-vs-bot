type BoardProps = {
  children: JSX.Element[];
};

function Board(props: BoardProps) {
  return <div className="board">{props.children}</div>;
}

export default Board;
