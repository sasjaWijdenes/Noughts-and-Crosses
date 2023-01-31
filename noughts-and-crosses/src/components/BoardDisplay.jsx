import { useState } from "react"
import Cell from "./Cell"

const BoardDisplay = ({ setWinner, settings: [isHumanP1, isHumanP2, size] }) => {
    const [cellArray, setCellArray] = useState(() => Array.from(Array(size), () => Array(size).fill(null))),
        [isP1Turn, setIsP1Turn] = useState(true)
    
    const winCount = size;
    
    const toggleTurn = () => setIsP1Turn(prevTurn => !prevTurn)
    const clickCell = (e, position) => {    //Places a mark and checks for win condition
        const playerMark = isP1Turn ? 'X' : 'O';
        if (!cellArray[position[0]][position[1]]) { //Check if valid cell
            e.target.classList = `cell ${playerMark}` //Add mark
            setCellArray(prevArray => {                 //Update the cellArray
                    const {array, gameRes} = selectCell([...prevArray], position, playerMark) //check game state
                    if(gameRes !== null) setWinner(gameRes)           //update winner condition
                    return array;                                            //return updated array
                });
                toggleTurn()            //Switch Player
        } else alert('That Square is already taken.')
    }
    const selectCell = (array, position, playerMark) => {       //Returns a modified cell array and terminal game result ( {array, gameRes} )
        array[position[0]][position[1]] = playerMark                    //Adding mark to array
            const gameRes = winCheck(array, position, playerMark)           //checking for win condition
            return {array, gameRes}
        }
    const winCheck = (cellArr, lastMove, playerMark) => {  //Checks for win condition and returns X | O | draw | null
        if (cellArr.every(row => !row.includes(null))) return 'draw'
        const directions = [[[-1, 0], [1, 0]], [[-1, 1], [1, -1]], [[0, 1], [0, -1]], [[1, 1], [-1, -1]]]
        let winner = null;
        directions.forEach(line => {
            let markCount = checkLine(cellArr, lastMove, line[0], playerMark) + checkLine(cellArr, lastMove, line[1], playerMark)
            if (markCount - 1 >= winCount){
                winner = playerMark;
            }
        })
        return winner
    }
    const checkLine = (cellArr, thisCell, direction, playerMark) => {   //recursively checks each cell in a given direction
        let currRow = thisCell[0], currCol = thisCell[1], nextRow = currRow + direction[0], nextCol = currCol + direction[1]
        return !(cellArr[currRow][currCol] === (playerMark)) ? 0              //is current cell current players mark?
                : (nextRow >= 0 && nextRow < size && nextCol >= 0 && nextCol < size)    //does next cell exist?
                ? checkLine(cellArr, [nextRow, nextCol], direction, playerMark) + 1                 //call on next cell in line
                : 1
    }

    const computerTurn = (playerMark) => {
        
    }
    
    const minMax = (gameState, lastMove, playerMark, maximizingPlayer) => {         //minMax - explores game tree to find optimal move
        const result = winCheck(gameState, lastMove, playerMark)
        if (result !== null) return result === playerMark? 1: result === 'draw'? 0: -1  //If game terminal, return result
        if (maximizingPlayer) {
            let maxEval = -Infinity;
            [...gameState].forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell === null) {                        //If available cell 
                        let { array } = selectCell(gameState, [y, x], playerMark)
                        let evaluation = minMax(array, [y, x], (playerMark === 'X' ? 'O' : 'X'), false)
                        maxEval = maxEval < evaluation ? evaluation : maxEval;
                        return maxEval
                    }
                })
            })
        } else {
            let minEval = Infinity;
            [...gameState].forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell === null) {                        //If available cell 
                        let { array } = selectCell(gameState, [y, x], playerMark)
                        let evaluation = minMax(array, [y, x], (playerMark === 'X' ? 'O' : 'X'), true)
                        minEval = minEval > evaluation ? evaluation : minEval;
                        return minEval;
                    }
                })
            })
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
                {cellArray.map((line, y) => line.map((cell, x) => <Cell position={[y, x]} clickCell={clickCell} />))}
            </div>
        </div>
    )
}

export default BoardDisplay