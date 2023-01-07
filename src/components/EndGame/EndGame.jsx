import "./EndGame.css";

const EndGame = ({ resetGame, score }) => {
  return (
    <>
      <div className="endGame">
        <h1>Acabou suas tentativas!</h1>
        <h2> Sua pontuação total foi: <span className={ score >= 100 ? "grennScore" : "redScore" }> { score } </span></h2>
        <button onClick={resetGame}>Reinicar o jogo</button>
      </div>
    </>
  );
};

export default EndGame;
