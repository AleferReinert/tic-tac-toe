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
                squares: Array(9).fill(null),
                col: null,
                row: null
            }],
            xIsNext: true,
            stepNumber: 0
        }
        this.allMoves = Array(9).fill(null);
        this.computerMoves = [];
        this.gameFinished = '';
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const xIsNext = this.state.xIsNext;
        const col = () => {
            if (i === 0 || i === 3 || i === 6) {
                return 1;
            } else if (i === 1 || i === 4 || i === 7) {
                return 2;
            } else {
                return 3;
            }
        }
        const row = () => {
            if (i === 0 || i === 1 || i === 2) {
                return 1;
            } else if (i === 3 || i === 4 || i === 5) {
                return 2;
            } else {
                return 3;
            }
        }
        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                col: col(),
                row: row()
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })

        // Mantem um array atualizado de todas jogadas
        this.allMoves[i] = xIsNext ? 'X' : 'O';

        // Mantem um array atualizado com as jogadas do computador
        if(!xIsNext) {
            this.computerMoves.push(i);
        }
        
        /*
            Jogada do computador
            Se for possível fechar uma linha, é simulado o click no quadrado faltante,
            se não, retorna uma jogada aleatória
        */
        if (xIsNext && this.state.stepNumber < 8) {
            const moveWinner = MoveWinner(this.allMoves, this.computerMoves, xIsNext);
            const index = moveWinner ? moveWinner : GetRandom(this.allMoves);
            const square = document.querySelector(`.square[data-index='${ index }']`);
            ComputerClick(square);
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2 === 0),
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = CalculateWinner(current.squares);

        let status;
        if (winner) {
            this.gameFinished = 'finished';
            status = winner === 'X' ? `${player1} winner` : `${player2} winner`;
        } else if (this.state.stepNumber === 9) {
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
                        winner ? (
                            <button onClick={() => { this.jumpTo(0) }} id="btn-restart">
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