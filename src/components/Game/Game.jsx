import { useState, useRef } from 'react';
import './Game.css';

const Game = ({ 
  verificarLetras, 
  palavra, 
  categoria, 
  letras, 
  letrasCertas, 
  letrasErradas, 
  tentativas, 
  scores 
  }) => {

  const [letra, setLetra] = useState("");
  const letraInputRef = useRef(null);

  const handleLetra = (e) => {
    setLetra(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    verificarLetras(letra);

    setLetra("");

    letraInputRef.current.focus()
  }

  return (
    <>
    <div className="game">
        <p className="pontos">
          <span>Pontuação: { scores }</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className="dica">
          Dica sobre a palavra: { categoria }
        </h3>
        <p>Total de tentativa(s): { tentativas }</p>

        <div className="container-palavras">
          {letras.map((letras, i) => (
            letrasCertas.includes(letras) ? (
              <span key={i} className="letras">
                {letras}
              </span>
            ) : (
              <span key={i} className="square"></span>
            )
          ))}
        </div>

        <div className="container-letras">
          <p>Tente advinhar uma letra da palavra:</p>
          <form onSubmit={handleSubmit}>
            <input
             type="text" 
             name="letra" 
             maxLength="1" 
             required
             onChange={handleLetra}
             value={letra || ""} 
             ref={letraInputRef}
             />
            <button>Jogar</button>
          </form>
        </div>

        <div className="containter-erros">
          <p>Letras já utilizadas:</p>
          { letrasErradas.map((letras, i) => (
            <span key={i}>{letras}, </span>
          )) }
        </div>

    </div>
    </>
  )
}

export default Game