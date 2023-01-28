const Cell = ({ position, selectCell }) => <div className="cell" onClick={(e) => selectCell(e, position)} />

export default Cell