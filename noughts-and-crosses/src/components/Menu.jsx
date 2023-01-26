import { useState } from "react";

const Menu = ({ setSettings }) => {
    const [isHumanP1, setIsHumanP1] = useState(true), [isHumanP2, setIsHumanP2] = useState(true),
        [boardSize, setBoardSize] = useState(3), changeSize = num => setBoardSize(prevSize => prevSize + num)
    
    return (
        <ul className="menu">
            <li>
                <h2>Player One: </h2>
                <button onClick={() => setIsHumanP1(prevState => !prevState)} >{isHumanP1? 'Human': 'Computer'}</button>
            </li>
            <li>
                <h2>Player Two: </h2>
                <button onClick={() => setIsHumanP2(prevState => !prevState)} >{isHumanP2? 'Human': 'Computer'}</button>
            </li>
            <li>
                <h2>Board Size: </h2>
                <button onClick={() => changeSize(-1)} > Decrease </button>
                <h3>{`${boardSize} X ${boardSize}`}</h3>
                <button onClick={() => changeSize(1)} > Increase </button>
            </li>
            <button onClick={() => setSettings([isHumanP1, isHumanP2, boardSize])} >Start Game!</button>
        </ul>
    )
}

export default Menu;