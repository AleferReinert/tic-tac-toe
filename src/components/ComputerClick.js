
import { DisabledSquares } from "./DisabledSquares";

/*
    Simula o click (jogada) do computador
*/
export function ComputerClick(element){
    DisabledSquares(true);
    setTimeout(() => {
        element.disabled = false;
        element.click();
        DisabledSquares(false);
        return;
    }, 800);
}