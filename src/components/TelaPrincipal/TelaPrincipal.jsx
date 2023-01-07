import "./TelaPrincipal.css";

const TelaPrincipal = ({startGame}) => {
    return (
        <div className="inicial">
            <h1>Secret Game</h1>
            <p>Comece a jogar agora!</p>
            <button onClick={startGame}>Começar o jogo!</button>
        </div>
    );
};

export default TelaPrincipal;