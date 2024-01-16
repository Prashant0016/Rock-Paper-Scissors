let result = '';
let playerMove = '';
let computerMove = '';

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();


function playgame(move) {
    playerMove = move;
    computerMove = pickcomputerMove();
    result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'scissors') {
            result = 'You Won';
        } else if (computerMove === 'paper') {
            result = 'You Lose';
        } else if (computerMove === 'rock') {
            result = "It's a Tie";
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'scissors') {
            result = 'You Lose';
        } else if (computerMove === 'paper') {
            result = "It's a Tie";
        } else if (computerMove === 'rock') {
            result = 'You Won';
        }
    } else if (playerMove === 'scissors') {
        if (computerMove === 'scissors') {
            result = "It's a Tie";
        } else if (computerMove === 'paper') {
            result = 'You Won';
        } else if (computerMove === 'rock') {
            result = 'You Lose';
        }

    }

    if (result === 'You Won') {
        score.wins += 1;
    } else if (result === 'You Lose') {
        score.losses += 1;
    } else if (result === "It's a Tie") {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

}
function updateScore() {
    const resultElement = document.querySelector('.js-updated-result');
    const winsElement = document.querySelector('.js-wins');
    const lossesElement = document.querySelector('.js-losses');

    if (result) {
        resultElement.innerHTML = `${result} , You &#x3A; ${playerMove} , Computer &#x3A; ${computerMove}`;
    } else {
        resultElement.innerHTML = ''; 
        winsElement.textContent = score.wins;
        lossesElement.textContent = score.losses;
    }
    
    document.querySelector('.js-wins').textContent = score.wins;

    document.querySelector('.js-losses').textContent = score.losses;
}

function pickcomputerMove() {

    const random = Math.random();
    let Move = '';

    if (random >= 0 && random < 1 / 3) {
        Move = 'rock';
    } else if (random >= 1 / 3 && random < 2 / 3) {
        Move = 'paper';
    } else if (random >= 2 / 3 && random < 1) {
        Move = 'scissors';
    }
    return Move;
}

function reset() {

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');
    updateScore();
}

let autoPlayInterval;

function toggleAutoPlay() {
    const autoPlayButton = document.getElementById('auto-play-button');

    if (autoPlayButton.textContent === 'Auto Play') {
        autoPlayButton.textContent = 'Stop';
        autoPlayInterval = setInterval(() => playgame(pickcomputerMove()), 1500);
    } else {
        autoPlayButton.textContent = 'Auto Play';
        clearInterval(autoPlayInterval);
    }
}