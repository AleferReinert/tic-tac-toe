import { Lines } from "./Lines";

/* 
    Procura as jogadas do computador em cada linha de possível vitória
    Se encontrada duas jogadas na mesma linha e a restante for nula, retorna o index de null que é a jogada vencedora
*/
export function MoveWinner(allMoves, individualMoves, xIsNext){

    if(individualMoves.length >= 2 && xIsNext){
        for(const line of Lines){
            let sum = 0;
            const moves = [];
            
            for(const move of individualMoves){
                if(line.includes(move)){
                    sum++;
                    moves.push(move);
                }
                if(sum >= 2){
                    const thirdMove = line.filter(n => !moves.includes(n))[0];

                    if(allMoves[thirdMove] === null) {
                        return thirdMove;
                    }
                }
            };
        };
    }
    return false;
}