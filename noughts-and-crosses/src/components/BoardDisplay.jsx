import { useState, useEffect } from "react"
import Cell from "./Cell"

const BoardDisplay = ({ setIsGameOver, settings: [isHumanP1, isHumanP2, size] }) => {
    const [cellArray, setCellArray] = useState(() => Array.from(Array(size), () => Array(size).fill(null)));

    const [isP1Turn, setIsP1Turn] = useState(true)
    
    const toggleTurn = () => setIsP1Turn(prevTurn => !prevTurn),
        selectCell = (e, position) => {
            if (!cellArray[position[0]][position[1]]) { //Check if valid cell
                console.log(cellArray)
                e.target.classList = `cell ${isP1Turn ? 'X' : 'O'}` //Add mark
                setCellArray(prevArray => {
                    const newArray = [...prevArray];
                    newArray[position[0]][position[1]] = isP1Turn? 'X': 'O';
                    return newArray;
                });
                toggleTurn()    //Switch Player
            } else alert('That Square is already taken.')
        }
//TODO: Function to assess win conditions.
    const winCheck = lastMove => {  //last move is co-ordinates of last cell selection
        //Loops through each surrounding square and calls the checkLine function (TODO)
    }
//TODO: Recursive checkLine function acess the next square in the passed direction.
    
    return (
        <div className="board-container">
            <section className="info-container">
                <div className={isP1Turn? 'is-turn': ''}>Player One: {isHumanP1 ? 'Human' : 'Computer'}</div>
                <h1 className="divider"> X       |      O </h1>
                <div className={!isP1Turn? 'is-turn': ''}>Player Two: {isHumanP2? 'Human': 'Computer'}</div>
            </section>
            <div className="board" style={{gridTemplateColumns: `repeat(${size}, 1fr)`}} >
                {cellArray.map((line, y) => line.map((cell, x) => <Cell position={[y, x]} selectCell={selectCell} />))}
            </div>
        </div>
    )
}

export default BoardDisplay