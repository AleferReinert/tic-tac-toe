import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Board } from './components/Board'
import { CalculateWinner } from './components/CalculateWinner'
import { RandomMove } from './components/RandomMove'

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

        RandomMove(squares, xIsNext);
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
        let nextPlayer;
        if (winner) {
            status = winner === 'X' ? `${player1} winner` : `${player2} winner`;
            nextPlayer = 'End game';
        } else if (this.state.stepNumber === 9) {
            status = 'Tie';
            nextPlayer = 'End game';
        } else {
            status = '';
            nextPlayer = this.state.xIsNext ? `${player1} (X)` : `${player2} (O)`;
        }

        if (!winner && document.querySelector('.winner') !== null) {
            document.querySelectorAll('.winner').forEach(e => {
                e.classList.remove('winner');
            })
        }
        return (
            <div className="game">
                <h1>Tic Tac Toe</h1>
                <main className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </main>
                <aside className="game-info">

                    {status !== '' ? (
                        <>
                            <h2 className="winner-text">{status}</h2>
                            <button onClick={() => { this.jumpTo(0) }} id="btn-restart">
                                Restart
                            </button>
                        </>
                    ) : (
                        <>
                            <h2>Next move: </h2>
                            <p>{nextPlayer}</p>
                        </>
                    )}
                </aside>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);