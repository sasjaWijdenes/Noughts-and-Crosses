import { useState } from "react"
import Cell from "./Cell"

const BoardDisplay = ({ setIsGameOver, settings: [isHumanP1, isHumanP2, size] }) => {
    const [isP1Turn, setIsP1Turn] = useState(true)

    const toggleTurn = () => setIsP1Turn(prevTurn => !prevTurn),
        selectCell = (e) => {
            if (e.target.classList == 'cell') { //Check if valid cell
                e.target.classList = `cell ${isP1Turn? 'X': 'O'}` //Add mark
                toggleTurn()    //Switch Player
            } else alert('That Square is already taken.')
    }
    
    return (
        <div className="board-container">
            <section className="info-container">
                <div className={isP1Turn? 'is-turn': ''}>Player One: {isHumanP1 ? 'Human' : 'Computer'}</div>
                <h1 className="divider"> X       |      O </h1>
                <div className={!isP1Turn? 'is-turn': ''}>Player Two: {isHumanP2? 'Human': 'Computer'}</div>
            </section>
            <div className="board" style={{gridTemplateColumns: `repeat(${size}, 1fr)`}} >
                {Array.from(Array(size), () => Array(size).fill(
                    <Cell selectCell={selectCell} />
                ))}
            </div>
        </div>
    )
}
export default BoardDisplay