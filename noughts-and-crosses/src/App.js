import './App.css';
import Menu from './components/Menu';
import { useEffect, useState } from 'react';
import BoardDisplay from './components/BoardDisplay';
import GameOverScreen from './components/GameOverScreen';

function App() {
  const [settings, setSettings] = useState([]), [isGameOver, setIsGameOver] = useState(false),
    [winner, setWinner] = useState(null)
  
  useEffect(() => setIsGameOver(prev => !prev) , [winner])

  return (
    <div className="App">
      {isGameOver ?
        <GameOverScreen winner={winner} /> :
        !settings.length ?
        <Menu setSettings={setSettings} /> :
        <BoardDisplay setWinner={setWinner} settings={settings} />
      }
    </div>
  );
}

export default App;
