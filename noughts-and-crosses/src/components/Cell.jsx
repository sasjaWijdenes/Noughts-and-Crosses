const Cell = ({ position, clickCell }) => <div className="cell" data-row={position[0]}
data-col={position[1]} onClick={(e) => clickCell(position)} />

export default Cell