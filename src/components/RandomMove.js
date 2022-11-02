// Armazena todas jogadas do computador
function computerMoves(array){
    let i = -1;
    const computerMoves = [];
    while (i = array.indexOf('O', i + 1), i !== -1){
        computerMoves.push(i);
    };
}

// Jogada aleatória
export function RandomMove(array, xIsNext) {
    let randonSquare = Math.floor(Math.random() * array.length);
    let randonSquareSelector = document.querySelector(`.square[data-index='${randonSquare}']`);
    const squares = document.querySelectorAll('.square');

    if (xIsNext === true) {
        
        // TODO: verificar se existe possibilidade de vitória para não fazer uma jogada aleatória

        if (array[randonSquare] !== null) {
            RandomMove(array, xIsNext);
            return;
        }

        /*
            Desabilita os botões temporariamente para evitar multiplos clicks do player 1
        */
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
        }, 800);
    }
}