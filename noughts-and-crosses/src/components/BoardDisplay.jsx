import { useState, useEffect } from "react"
import Cell from "./Cell"



const BoardDisplay = ({ setWinner, settings: [isHumanP1, isHumanP2, size] }) => {
    const [cellArray, setCellArray] = useState(() => Array.from(Array(size), () => Array(size).fill(null))),
        [isP1Turn, setIsP1Turn] = useState(true),
        [waitingForInput, setWaitingForInput] = useState(false)
    
    const winCount = size;
    const isCurrentPlayerHuman = (isHumanP1 && isP1Turn) || (isHumanP2 && !isP1Turn)
    const directions = [[[-1, 0], [1, 0]], [[-1, 1], [1, -1]], [[0, 1], [0, -1]], [[1, 1], [-1, -1]]]
    const toggleTurn = () => setIsP1Turn(prevTurn => !prevTurn)

    useEffect(() => {
        playGame(cellArray, isP1Turn);
    }, [cellArray, isP1Turn]);     

    useEffect(() => {
        console.log({isCurrentPlayerHuman, waitingForInput})
        if (isCurrentPlayerHuman) setWaitingForInput(true)
    }, [isCurrentPlayerHuman])
    
    const checkWinDraw = (cellArray, isP1Turn) => {
        if (isWin(cellArray, [0, 0])) {
          return isP1Turn ? 'X' : 'O';
        } else if (isDraw(cellArray)) {
          return 'draw';
        }
        return null;
      };
      

    const playGame = (cellArray, isP1Turn) => {
        console.log({isP1Turn})
        const winner = checkWinDraw(cellArray, isP1Turn);
        if (winner) {
          setWinner(winner);
        } else if (waitingForInput) {
            console.log({isP1Turn, waitingForInput})
          getMove(isP1Turn)
          toggleTurn();
        }
      };
      

    function getRandomMove(board) {
        const emptyCells = [];
      
        // Find all empty cells on the board
        board.forEach(row => row.forEach(cell => {
            if (!cell) emptyCells.push([board.indexOf(row), row.indexOf(cell)])
        }))
      
        // Select a random empty cell
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        console.log({board, emptyCells, randomIndex, randomCell})
        return randomCell;
      }
      

    const getMove = (isP1Turn) => {     //Get a move from the computer
        const randMove = getRandomMove(cellArray)
        console.log({randMove})
        updateArray(randMove, cellArray)
    }

    const isValidCell = (cellArray, position) => cellArray[position[0]][position[1]]
    
    const clickCell = (position) => {        //Handle cell being clicked
        if (isValidCell(cellArray, position)) alert('That Square is already taken.')
        else updateArray(position, cellArray)
        setWaitingForInput(true)
    }

    const updateArray = (position, array) => {
        const cell = document.querySelector(`.cell[data-row="${position[0]}"][data-col="${position[1]}"]`);
        cell.classList.add(isP1Turn ? 'X' : 'O');
        setCellArray(prevArray => {
          const newArray = [...prevArray];
          newArray[position[0]][position[1]] = isP1Turn ? 'X' : 'O';
          return newArray;
        });
      };

    
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