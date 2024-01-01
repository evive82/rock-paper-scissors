const rules = {
    "rock": "scissors",
    "paper": "rock",
    "scissors": "paper"
}

function capitalize(string) {
    const firstLetter = string.charAt(0).toUpperCase();
    const remaining = string.slice(1);
    return firstLetter + remaining;
}

function getPlayerChoice() {
    let playerChoice;
    while (!Object.keys(rules).find(validChoice => validChoice === playerChoice)) {
        playerChoice = prompt("Rock, paper, or scissors");
        playerChoice = playerChoice.toLowerCase();
    }
    return playerChoice;
}

function getComputerChoice() {
    const choices = [ "rock", "paper", "scissors" ];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    while (playerSelection === computerSelection) {
        playerSelection = getPlayerChoice();
        computerSelection = getComputerChoice();
        console.log("It's a draw. Play again.");
        playRound(playerSelection, computerSelection);
    }

    if (rules[playerSelection] === computerSelection) {
        return `You win! ${capitalize(playerSelection)} beats ${computerSelection}!`;
    }
    else {
        return `You lose! ${capitalize(computerSelection)} beats ${playerSelection}!`;
    }
}

function tallyScore(score) {
    let finalScore = `Player: ${score["player"]}\n` +
                     `Computer: ${score["computer"]}\n\n`;
    if (score["player"] > score["computer"]) {
        finalScore += "Player wins!";
    }
    else {
        finalScore += "Computer wins!";
    }

    return finalScore;
}

function game() {
    const score = { "player": 0, "computer": 0 };
    let rounds = 5;
    for (let i = 0; i < rounds; i++) {
        const playerSelection = getPlayerChoice();
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);

        if (result.includes("You win!")) {
            score["player"]++;
        }
        else {
            score["computer"]++;
        }

        console.log(result);
    }

    console.log(tallyScore(score));
}