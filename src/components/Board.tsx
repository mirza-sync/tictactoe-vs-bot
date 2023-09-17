function Board({ props, children }) {
  return (
    <div className="board" {...props}>
      {children}
    </div>
  );
}

export default Board;
