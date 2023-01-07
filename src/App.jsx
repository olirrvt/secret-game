// CSS
import './App.css'
// Componentes
import TelaPrincipal from './components/TelaPrincipal/TelaPrincipal'
import Game from './components/Game/Game'
import EndGame from './components/EndGame/EndGame'
// Dados
import { useCallback, useEffect, useState } from 'react';
// React
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  const [palavra, setPalavra] = useState("");
  const [categoria, setCategoria] = useState("");
  const [letras, setLetras] = useState([]);
  

  const startGame = () => {
    setGameStage(stages[1].name);
  };

  const endGame = () => {
    setGameStage(stages[2].name);
  }

  const resetGame = () => {
    setGameStage(stages[1].name);
  }

  return (
    <div className="App">
      { gameStage === 'start' && <TelaPrincipal startGame={startGame}/> }
      { gameStage === 'game' && <Game startGame={endGame}/> }
      { gameStage === 'end' && <EndGame resetGame={resetGame}/> }
    </div>
  )
}

export default App
