import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const player1 = 'You';
const player2 = 'Computer';

function Square(props) {
    const element = () => {
        if(props.value === 'X'){
            return <span className='x'></span>
        }
        
        if(props.value === 'O'){
            return <span className='o'></span>
        }
    }
    return (
        <button className="square" onClick={props.onClick} data-index={props.index}>
            { element() }
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                index={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
  
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
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

    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const xIsNext = this.state.xIsNext;
        const col = () => {
            if(i === 0 || i === 3 || i === 6){
                return 1;
            } else if(i === 1 || i === 4 || i === 7){
                return 2;
            } else {
                return 3;
            }
        }
        const row = () => {
            if(i === 0 || i === 1 || i === 2){
                return 1;
            } else if(i === 3 || i === 4 || i === 5){
                return 2;
            } else {
                return 3;
            }
        }
        if(calculateWinner(squares) || squares[i]){
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

        // Random play of computer
        function randomPlay(array){
            if(xIsNext === true){
                const randonSquare = Math.floor(Math.random() * array.length);
                const randonSquareSelector = document.querySelector(`.square[data-index='${randonSquare}']`);
                const squares = document.querySelectorAll('.square');

                if(array[randonSquare] !== null){
                    randomPlay(array);
                    return;
                }
                // Disabled buttons for prevent multiple clicks of player1
                squares.forEach(square => {
                    square.disabled = true;
                });
                setTimeout(() => {
                    randonSquareSelector.disabled = false;
                    randonSquareSelector.click();
                    squares.forEach(square => {
                        square.disabled = false;
                    });
                    return;
                }, 1000);
            }
        }
        randomPlay(squares);
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2 === 0),
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const renderButtonHistory = () => {
                const isPlayer1 = move % 2 === 1 ? true : false;
                if(move === 0){
                    return (
                        <button onClick={() => {this.jumpTo(move)}}>
                            Go to game start
                        </button>
                    )
                } else if(isPlayer1){ // Disabled computer history
                    return(
                        <button
                            onClick={() => {this.jumpTo(move)}}
                        >
                            <span>Move { Math.round(move/2) }:</span>
                            <span>{ `column${step.col}, row${step.row}` }</span>
                        </button>
                    )
                }
            }
            return (
                <li key={ move }>
                    { renderButtonHistory() }
                </li>
            )
        })

        let status;
        let nextPlayer;
        if (winner) {
            status = winner === 'X' ? player1 : player2;
            nextPlayer = 'End game';
        } else if(this.state.stepNumber === 9){
            status = 'Tie';
            nextPlayer = 'End game';
        } else {
            status = '--';
            nextPlayer = this.state.xIsNext ? `${player1} (X)` : `${player2} (O)`;
        }

        if(!winner && document.querySelector('.winner') !== null){
            document.querySelectorAll('.winner').forEach(e => {
                e.classList.remove('winner');
            })
        }
        return (
            <div className="game">
                <h1>Tic Tac Toe</h1>
                <main className='grid'>
                    <div className='column-1'>
                        <div className="game-info">
                            <h2>History</h2>
                            <ul>{ moves }</ul>
                        </div>
                    </div>
                    <div className='column-2'>
                        <h2>Winner: { status }</h2>
                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                onClick={i => this.handleClick(i)}
                            />
                        </div>
                    </div>
                    <div className='column-3'>
                        <div className="game-info right">
                            <h2>Next move:</h2>
                            <p>{ nextPlayer }</p>
                        </div>
                    </div>
                </main>
            </div>
      );
    }
}

function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            const winnerLine = lines[i];
            for(let j = 0; j < 3; j++){
                document.querySelector(`.square[data-index="${winnerLine[j]}"]`).classList.add('winner');
            }
            return squares[a];
        }
    }
    return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);