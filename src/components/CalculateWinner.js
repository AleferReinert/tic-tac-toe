import { Lines } from './Lines.js';

export function CalculateWinner(squares) {
    for (let i = 0; i < Lines.length; i++) {
        const [a, b, c] = Lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const winnerLine = Lines[i];
            for (let j = 0; j < 3; j++) {
                document.querySelector(`.square[data-index="${winnerLine[j]}"]`).classList.add('winner');
            }
            return squares[a];
        }
    }
    return null;
}