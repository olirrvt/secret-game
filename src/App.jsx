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

const totalDeTentativas = 5;

function App() {

  // Routes
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  // Sistema
  const [palavra, setPalavra] = useState("");
  const [categoria, setCategoria] = useState("");
  const [letras, setLetras] = useState([]);

  // Interação do Usuário
  const [letrasCertas, setLetrasCertas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(totalDeTentativas);
  const [scores, setScores] = useState(0);
  
  const picurePhrases = useCallback(() => {
    // Categorias
    const categorias = Object.keys(words);
    const categoria = 
    categorias[Math.floor(Math.random() * Object.keys(categorias).length)];
    // Palavras
    const palavra = 
    words[categoria][Math.floor(Math.random() * words[categoria].length)];

    return { 
      palavra, 
      categoria 
    };
  }, [words]);

  const verificarLetras = (letra) => {

    const letraNormal = letra.toLowerCase();

    // A letra já foi inserida?
    if ( letrasCertas.includes(letraNormal) || letrasErradas.includes(letraNormal) ) {
      return;
    }

    // O usuário acertou a letra?
    if(letras.includes(letraNormal)) {
      setLetrasCertas((letrasStatesCertas) => [
        // Adicionando a arrays de letras certas
        ...letrasStatesCertas,
        letraNormal
      ])
    } else {
      setLetrasErradas((letrasStatesErradas) => [
        // Adicionando a arrays de letras erradas
        ...letrasStatesErradas,
        letraNormal
    ]);

      setTentativas((atualTentativas) => atualTentativas - 1);
    }
  };

  // Limpando estados
  const clearStates = () => {
    setLetrasCertas([]);
    setLetrasErradas([]);
  };

  // Fim de tentativas (Derrota)
  useEffect(() => {
    if (tentativas === 0) {

      clearStates();

      setGameStage(stages[2].name)
    }
  }, [tentativas]);

  // Início do jogo
  const startGame = useCallback(() => {

    // Limpando games
    clearStates();

    const { palavra, categoria } = picurePhrases();

    let letrasFrases = palavra.split("");
    letrasFrases = letrasFrases.map((element) => element.toLowerCase());

    setCategoria(categoria);
    setPalavra(palavra);
    setLetras(letrasFrases);

    setGameStage(stages[1].name);

  }, [picurePhrases]);

    // Reset do game
    const resetGame = () => {

      setScores(0);
      setTentativas(totalDeTentativas);
  
      setGameStage(stages[0].name);
    }

  // Acerto do usuário (Triunfos)
  useEffect(() => {

      // Arrays de letras únicas
      const letrasUnicas = [... new Set(letras)]
  
      if (letrasCertas.length === letrasUnicas.length) {
  
        // Pontuação
        setScores((scoreAtual) => scoreAtual += 100);
  
        // Resetando o game
        startGame();
      };
  }, [letrasCertas, letras, startGame])

  // Fim de jogo
  const endGame = () => {
    setGameStage(stages[2].name);
  }

  return (
    <div className="App">

      {/* HOME */}
      { gameStage === 'start' && <TelaPrincipal startGame={startGame}/> }

      {/* START GAME */}
      { gameStage === 'game' && 
      <Game
       verificarLetras={verificarLetras}
       palavra={palavra}
       categoria={categoria}
       letras={letras}
       letrasCertas={letrasCertas}
       letrasErradas={letrasErradas}
       tentativas={tentativas}
       scores={scores}
       /> 
       }

      {/* ENDGAME */}
      { gameStage === 'end' && <EndGame resetGame={ resetGame } score={scores}/> }

    </div>
  )
}

export default App
