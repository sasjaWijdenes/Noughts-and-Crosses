import './App.css';
import Menu from './components/Menu';
import { useState } from 'react';
import BoardDisplay from './components/BoardDisplay';
import GameOverScreen from './components/GameOverScreen';

function App() {
  const [settings, setSettings] = useState([]), [isGameOver, setIsGameOver] = useState(false);

  return (
    <div className="App">
      {isGameOver ?
        <GameOverScreen setSettings={setSettings} /> :
        !settings.length ?
        <Menu setSettings={setSettings} /> :
        <BoardDisplay setIsGameOver={setIsGameOver} settings={settings} />
      }
    </div>
  );
}

export default App;
