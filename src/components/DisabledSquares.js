

/*
    Desabilita ou habilita os quadrados temporariamente
    para evitar multiplos clicks do player 1
*/
export function DisabledSquares(option){
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.disabled = option;
    });
}