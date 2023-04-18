import { useState, useEffect } from "react"
import Cell from "./Cell"



const BoardDisplay = ({ setWinner, settings: [isHumanP1, isHumanP2, size] }) => {
    const [cellArray, setCellArray] = useState(() => Array.from(Array(size), () => Array(size).fill(null))),
        [isP1Turn, setIsP1Turn] = useState(true)
    
    const winCount = size;
    const directions = [[[-1, 0], [1, 0]], [[-1, 1], [1, -1]], [[0, 1], [0, -1]], [[1, 1], [-1, -1]]]
    const toggleTurn = () => setIsP1Turn(prevTurn => !prevTurn)
    const isValidCell = (cellArray, position) => cellArray[position[0]][position[1]]
    
    const clickCell = (e, position) => {
        if (isValidCell(cellArray, position)) alert('That Square is already taken.')
        else updateArray(e, position, cellArray)
    }

    const updateArray = (e, position, array) => {
        if (isValidCell(cellArray, position)) alert('That Square is already taken.')
        else {
                e.target.classList = `cell ${isP1Turn ? 'X' : 'O'}` //Add mark
                setCellArray(prevArray => {         //Update array
                    const newArray = [...prevArray];
                    newArray[position[0]][position[1]] = isP1Turn ? 'X' : 'O';
                    if(isWin(newArray, position)) setWinner(isP1Turn ? 'X' : 'O')
                    if(isDraw(newArray)) setWinner('draw')
                    return newArray;
                });
                toggleTurn()            //Switch Player
            }
    }

    
    const isWin = (cellArr, lastMove) => {  //Checks for win of current player
        let win = false
        directions.forEach(line => {
            let markCount = checkLine(cellArr, lastMove, line[0]) + checkLine(cellArr, lastMove, line[1])
            if (markCount - 1 >= winCount) win = true
        })
        return win
    }

    const isDraw = (cellArr) => cellArr.every(row => !row.includes(null))   //Is board state a draw
    const checkLine = (cellArr, thisCell, direction) => {   //recursively checks each cell in a given direction
        let currRow = thisCell[0], currCol = thisCell[1], nextRow = currRow + direction[0], nextCol = currCol + direction[1]
        return !(cellArr[currRow][currCol] === (isP1Turn ? 'X' : 'O')) ? 0              //is current cell current players mark?
                : (nextRow >= 0 && nextRow < size && nextCol >= 0 && nextCol < size)    //does next cell exist?
                ? checkLine(cellArr, [nextRow, nextCol], direction) + 1                 //call on next cell in line
                : 1
    }
    
    return (
        <div className="board-container">
            <section className="info-container">
                <div className={isP1Turn? 'is-turn': ''}>Player One: {isHumanP1 ? 'Human' : 'Computer'}</div>
                <h1 className="divider"> X       |      O </h1>
                <div className={!isP1Turn? 'is-turn': ''}>Player Two: {isHumanP2? 'Human': 'Computer'}</div>
            </section>
            <div className="board" style={{gridTemplateColumns: `repeat(${size}, 1fr)`}} >
                {cellArray.map((line, y) => line.map((cell, x) => <Cell position={[y, x]} clickCell={clickCell} />))}
            </div>
        </div>
    )
}

export default BoardDisplay