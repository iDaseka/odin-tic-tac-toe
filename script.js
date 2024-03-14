const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const btns = document.querySelectorAll('#ttt button');
const result = document.querySelector('#result');

let player1, player2;

p1.addEventListener('input', () => {
    player1 = Player(p1.value, 'X');
    checkReady();
});

p2.addEventListener('input', () => {
    player2 = Player(p2.value, 'O');
    checkReady();
});

function checkReady(){
    if (player1 && player2){
        GameBoard.start();
        Game.newGame(player1, player2);
    }
}

btns.forEach(button => {
    button.addEventListener('click', () => {
        const index = parseInt(button.id);
        Game.move(index);
    });
});

const GameBoard = (() => {
    const board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    const start = () => {
        board.fill(' ');
    };

    const update = (index, symbol) => {
        const button = btns[index];
        button.textContent = symbol;
        board[index] = symbol;
    };

    const winner = () => {
        for (let i = 0; i < 3; i++){
            if (board[i] !== ' ' && board[i] === board[i+3] && board[i] === board[i+6]){
                return true;
            }
        }

        for (let i = 0; i < 9; i += 3) {
            if (board[i] !== ' ' && board[i] === board[i+1] && board[i] === board[i+2]){
                return true;
            }
        }

        if (board[0] !== ' ' && board [0] === board[4] && board [0] === board[8]){
            return true;
        }

        if (board[2] !== ' ' && board [2] === board[4] && board [2] === board[6]){
            return true;
        }

        return false;
    };

    const tie = () => {
        return !board.includes(' ') && !winner();
    };

    const getBoard = () => {
        return board.slice();
    };

    return {
        start, update, winner, getBoard, tie
    };
})();

const Player = (name, symbol) => {

    return {
        name, symbol
    };
};

const Game = (() => {
    let current;
    let player1;
    let player2;
    let gameOver = false;

    const newGame = (p1, p2) => {
        player1 = p1;
        player2 = p2;
        current = player1;
        gameOver = false;
    }

    const switchPlayer = () => {
        current = current === player1 ? player2 : player1;
    };

    const move = (index) => {
        if (gameOver || GameBoard.getBoard()[index] !== ' '){
            return;
        }

        GameBoard.update(index, current.symbol);

        if (GameBoard.winner()) {
           result.innerHTML = `${current.name} wins`;
            gameOver = true;
        }
        else if (GameBoard.tie()){
            result.innerHTML = "It's a tie!";
            gameOver = true;
        }
        else{
            switchPlayer();
        }
    };

    return{
        newGame, move
    };
})();