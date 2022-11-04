import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Board } from './components/Board';
import { CalculateWinner } from './components/CalculateWinner';
import { ComputerClick } from './components/ComputerClick';
import { GetRandom } from './components/GetRandom';
import { MoveWinner } from './components/MoveWinner';

const player1 = 'You';
const player2 = 'Computer';

<Board />

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            currentPlayer: player1
        }
        this.stepNumber = 0;
        this.allMoves = Array(9).fill(null);
        this.computerMoves = [];
        this.playerMoves = [];
        this.gameFinished = false;
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const currentPlayer = this.state.currentPlayer;
        const allMoves = this.allMoves;
        const playerMoves = this.playerMoves;
        const computerMoves = this.computerMoves;
        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = currentPlayer === player1 ? 'x' : 'o';
        
        // Atualiza os arrays das jogadas
        allMoves[i] = currentPlayer === player1? 'x' : 'o';
        if(currentPlayer === player1) {
            playerMoves.push(i);
        } else {
            computerMoves.push(i);
        }
        
        /*
            Jogadas do computador:
                1. Se for possível fechar uma linha, é dado o click no quadrado faltante (vencendo o jogo)
                2. Se o player estiver pra ganhar, é dado o click no quadrado faltante (impedindo a vitória)
                3. Em última condição retorna uma jogada aleatória.
        */
       if (currentPlayer === player1 && this.stepNumber < 8) {
            const computerWinner = MoveWinner(allMoves, computerMoves);
            const playerWinner = MoveWinner(allMoves, playerMoves);
            let index = GetRandom(allMoves);

            if(computerWinner){
                index = computerWinner;
            } else if(playerWinner){
                index = playerWinner;
            }
            const square = document.querySelector(`.square[data-index='${ index }']`);
            ComputerClick(square);
        }
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            currentPlayer: currentPlayer === player1 ? player2 : player1
        })
        this.stepNumber = history.length;
    }

    restart() {
        this.setState({
            currentPlayer: player1
        })
        this.stepNumber = 0;
        this.allMoves = Array(9).fill(null);
        this.computerMoves = [];
        this.playerMoves = [];
        this.gameFinished = false;
        const winnerClasses = document.querySelectorAll('.winner');
        winnerClasses.forEach(e => {
            e.classList.remove('winner');
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.stepNumber];
        const winner = CalculateWinner(current.squares);
        let status = this.state.currentPlayer ? `${player1} (X)` : `${player2} (O)`;
        if (winner) {
            this.gameFinished = true;
            status = winner === 'x' ? `${player1} winner` : `${player2} winner`;
        } else if (this.stepNumber === 9) {
            this.gameFinished = true;
            status = 'Tie';
        }

        return (
            <div className={ `game ${this.gameFinished ? 'finished' : '' }` }>
                <h1>Tic Tac Toe</h1>
                <main className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </main>
                <aside className="game-info">
                    <h2>{status}</h2>
                    {
                        this.gameFinished ? (
                            <button onClick={() => { this.restart() }} id="btn-restart">
                                Restart
                            </button>
                        ) : ''
                    }
                </aside>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);