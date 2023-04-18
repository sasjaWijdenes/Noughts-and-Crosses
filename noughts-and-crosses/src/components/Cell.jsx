const Cell = ({ position, clickCell }) => <div className={`cell`} onClick={(e) => clickCell(e, position)} />

export default Cell