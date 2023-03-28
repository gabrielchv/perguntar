const perguntar = require('prompt-sync')();


/**
 * 0 - []
 * 1 - X
 * 2 - O
 */

let tela = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let gameEnded = false;

const mostrarTela = (tela: number[][]) => {
    for (let i = 0; i < 3; i++) {
        let linha = "";
        for (let j = 0; j < 3; j++) {
            if (tela[i][j] === 0) {
                linha += "-|";
            }
            if (tela[i][j] === 1) {
                linha += "X|";
            }
            if (tela[i][j] === 2) {
                linha += "O|";
            }
        }
        linha = linha.substring(0, linha.length-1);
        console.log(linha);
    }
    console.log("");
}

const fazerJogada = (i: number, tela: number[][]) => {
    console.log("Jogador: " + (i % 2 === 0 ? "X" : "O"))
    let col = perguntar("Digite a coluna: ")
    let linha = perguntar("Digite a linha: ")

    while (tela[linha - 1][col - 1] !== 0) {
        console.log("Digite novamente!");
        col = perguntar("Digite a coluna: ")
        linha = perguntar("Digite a linha: ")
    }

    if (i % 2 === 0) {
        tela[linha - 1][col - 1] = 1;
    }
    else {
        tela[linha - 1][col - 1] = 2;
    }
}

const conferirVitoria = (tela: number[][]) => {
    for (let i = 0; i < 3; i++) {
        if (tela[i][0] === tela[i][1] && tela[i][1] === tela[i][2] && tela[i][0] !== 0) {
            return true;
        }
        if (tela[0][i] === tela[1][i] && tela[1][i] === tela[2][i] && tela[0][i] !== 0) {
            return true;
        }
    }
    if (tela[0][0] === tela[1][1] && tela[1][1] === tela[2][2] && tela[1][1] !== 0) {
        return true;
    }
    if (tela[2][0] === tela[1][1] && tela[1][1] === tela[0][2] && tela[1][1] !== 0) {
        return true;
    }
    return false;
}

let i = 0;
while (!gameEnded) {
    mostrarTela(tela);
    fazerJogada(i, tela);
    mostrarTela(tela);
    gameEnded = conferirVitoria(tela);
    ++i;
}
console.log("Vencedor: " + ((i - 1) % 2 === 0 ? "X" : "O"));