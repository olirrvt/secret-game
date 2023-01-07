import "./EndGame.css";

const EndGame = ({ resetGame }) => {
  return (
    <>
      <div>
        <h1>Acabou suas tentativas!</h1>
        <button onClick={resetGame}>Reinicar o jogo</button>
      </div>
    </>
  );
};

export default EndGame;
