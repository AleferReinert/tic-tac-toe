import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Board } from './components/Board';
import { CalculateWinner } from './components/CalculateWinner';
import { GetRandom } from './components/GetRandom';
import { ComputerClick } from './components/ComputerClick';
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
            xIsNext: true
        }
        this.stepNumber = 0;
        this.allMoves = Array(9).fill(null);
        this.computerMoves = [];
        this.playerMoves = [];
        this.gameFinished = '';
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const xIsNext = this.state.xIsNext;
        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !xIsNext
        })
        this.stepNumber = history.length;
        
        // Atualiza os arrays das jogadas
        this.allMoves[i] = xIsNext ? 'X' : 'O';
        if(xIsNext) {
            this.playerMoves.push(i);
        } else {
            this.computerMoves.push(i);
        }
        
        /*
            Jogadas do computador:
                1. Se for possível fechar uma linha, é dado o click no quadrado faltante (vencendo o jogo)
                2. Se o player estiver pra ganhar, é dado o click no quadrado faltante (impedindo a vitória)
                3. Em última condição retorna uma jogada aleatória.
        */
        if (xIsNext && this.stepNumber < 8) {
            const computerMoveWinner = MoveWinner(this.allMoves, this.computerMoves, xIsNext);
            const playerMoveWinner = MoveWinner(this.allMoves, this.playerMoves, xIsNext);
            let index;
            if(computerMoveWinner){
                index = computerMoveWinner;
            } else if(playerMoveWinner){
                index = playerMoveWinner;
            } else {
                index = GetRandom(this.allMoves);
            }
            const square = document.querySelector(`.square[data-index='${ index }']`);
            ComputerClick(square);
        }
    }

    restart() {
        this.setState({
            xIsNext: true
        })
        this.stepNumber = 0;
        this.allMoves = Array(9).fill(null);
        this.computerMoves = [];
        this.playerMoves = [];
    }

    render() {
        const history = this.state.history;
        const current = history[this.stepNumber];
        const winner = CalculateWinner(current.squares);
        let status;
        if (winner) {
            this.gameFinished = 'finished';
            status = winner === 'X' ? `${player1} winner` : `${player2} winner`;
        } else if (this.stepNumber === 9) {
            this.gameFinished = 'finished';
            status = 'Tie';
        } else {
            this.gameFinished = '';
            status = this.state.xIsNext ? `Next: ${player1} (X)` : `Next: ${player2} (O)`;
        }
        if (!winner && document.querySelector('.winner') !== null) {
            document.querySelectorAll('.winner').forEach(e => {
                e.classList.remove('winner');
            })
        }
        return (
            <div className={ `game ${this.gameFinished}` }>
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
                        this.gameFinished === 'finished' ? (
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