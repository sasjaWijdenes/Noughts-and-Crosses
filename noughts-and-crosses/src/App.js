import './App.css';
import Menu from './components/Menu';
import { useState } from 'react';
import BoardDisplay from './components/BoardDisplay';
import GameOverScreen from './components/GameOverScreen';

function App() {
  const [settings, setSettings] = useState([]), [isGameOver, setIsGameOver] = useState(false),
      [winner, setWinner] = useState(null)

  return (
    <div className="App">
      {isGameOver ?
        <GameOverScreen winner={winner} /> :
        !settings.length ?
        <Menu setSettings={setSettings} /> :
        <BoardDisplay setIsGameOver={setIsGameOver} setWinner={setWinner} settings={settings} />
      }
    </div>
  );
}

export default App;
