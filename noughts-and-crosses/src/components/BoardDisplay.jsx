

const BoardDisplay = ({ setIsGameOver, settings:  [isHumanP1, isHumanP2, size]}) => {
    
    return (
        <div className="board" style={{gridTemplateColumns: `repeat(${size}, 1fr)`}} >
            {Array.from(Array(size), () => Array(size).fill( <div className="cell">Cell</div> ))}
        </div>
    )
}
export default BoardDisplay