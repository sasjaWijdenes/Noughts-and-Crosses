import { useState, useEffect } from "react"
import Cell from "./Cell"



const BoardDisplay = ({ setIsGameOver, setWinner, settings: [isHumanP1, isHumanP2, size] }) => {
    const [cellArray, setCellArray] = useState(() => Array.from(Array(size), () => Array(size).fill(null))),
        [isP1Turn, setIsP1Turn] = useState(true)
    
    const winCount = size-1;
    
    const toggleTurn = () => setIsP1Turn(prevTurn => !prevTurn),
        selectCell = (e, position) => {
            if (!cellArray[position[0]][position[1]]) { //Check if valid cell
                e.target.classList = `cell ${isP1Turn ? 'X' : 'O'}` //Add mark
                setCellArray(prevArray => {         //Update array
                    const newArray = [...prevArray];
                    newArray[position[0]][position[1]] = isP1Turn? 'X': 'O';
                    return newArray;
                });
                winCheck(position)
                toggleTurn()    //Switch Player
            } else alert('That Square is already taken.')
        }
    
//TODO: Function to assess win conditions.
    const winCheck = lastMove => {  //last move is co-ordinates of last cell selection
        //Loops through each surrounding square and calls the checkLine function (TODO)
        const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]
        directions.forEach(dir => checkLine(lastMove, dir))
    }
//TODO: Recursive checkLine function access the next square in the passed direction.
    const checkLine = (thisCell, direction, c = 0) => {
        c++
        if (!cellArray[thisCell[0][thisCell[1]]] === isP1Turn? 'X': 'O') return false;
        else if (c >= winCount) {
            console.log('game over', {thisCell})
            setIsGameOver(true)
            setWinner(isP1Turn? 'X': 'O')
        } else {
            let nextCell = cellArray[thisCell[0] + direction[0]][thisCell[1] + direction[1]]
            console.log({ thisCell, direction, c, cellArray, nextCell }, typeof thisCell[1])
            checkLine(nextCell, direction, c)
        }
    }
    
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