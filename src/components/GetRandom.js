/*
    Retorna um número aleatório entre os quadrados que estão vazios
*/
export function GetRandom(array){
    const emptySquares = [];
    array.forEach((value, index) => {
        if(value === null) {
            emptySquares.push(index);
        }
    });
    const random = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    return random;
}