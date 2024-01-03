const rules = {
    "rock": "scissors",
    "paper": "rock",
    "scissors": "paper"
}

const scores = {
    "player": 0, 
    "computer": 0,
    "round": 0,
    "draw": false
};

const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");
const roundDisplay = document.querySelector("#round");
const resultsDisplay = document.querySelector("#results > p");
const playerChoiceBox = document.querySelector("#player-choice");
const computerChoiceBox = document.querySelector("#computer-choice");
const choiceButtons = document.querySelectorAll("#choice-buttons > button");
const newGameButton = document.querySelector("#new-game-button");

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!scores["draw"])
            updateRound(scores["round"] + 1);

        const choice = button.innerText.toLowerCase();
        playRound(choice);
    });
});

newGameButton.addEventListener('click', () => {
    resetGame();
});

function getComputerChoice() {
    const choices = [ "rock", "paper", "scissors" ];
    const choice = choices[Math.floor(Math.random() * 3)];
    makeChoice("computer", choice);
    return choice;
}

function removeChoiceImg(playerOrComp) {
    if (playerOrComp !== "player" && playerOrComp !== "computer")
        return;

    const box = (playerOrComp === "player") ? playerChoiceBox : computerChoiceBox;
    if (box.firstElementChild) box.firstElementChild.remove();
}

function makeChoice(playerOrComp, choice) {
    if (playerOrComp !== "player" && playerOrComp !== "computer")
        return;

    const box = (playerOrComp === "player") ? playerChoiceBox : computerChoiceBox;
    removeChoiceImg(playerOrComp);

    const img = document.createElement("img");
    img.setAttribute("src", `img/${choice.toLowerCase()}-${playerOrComp}.png`);
    box.appendChild(img);
}

function updatePlayerScore(score) {
    const scoreDisplaySplit = playerScoreDisplay.innerText.split(" ");
    scoreDisplaySplit[1] = score;
    playerScoreDisplay.innerText = scoreDisplaySplit.join(" ");
    scores["player"] = score;
}

function updateComputerScore(score) {
    const scoreDisplaySplit = computerScoreDisplay.innerText.split(" ");
    scoreDisplaySplit[1] = score;
    computerScoreDisplay.innerText = scoreDisplaySplit.join(" ");
    scores["computer"] = score;
}

function updateRound(round) {
    if (round > 5) return;

    const roundDisplaySplit = roundDisplay.innerText.split(" ");
    roundDisplaySplit[1] = round;
    roundDisplay.innerText = roundDisplaySplit.join(" ");
    scores["round"] = round;
}

function updateResults(message) {
    resultsDisplay.innerText = message;
}

function resetGame() {
    updatePlayerScore(0);
    updateComputerScore(0);
    updateRound(0);
    removeChoiceImg("player");
    removeChoiceImg("computer");
    updateResults("");

    choiceButtons.forEach(button => {
        button.disabled = false;
        button.style.opacity = 1;
    });
}

function playRound(playerSelection) {
    makeChoice("player", playerSelection);
    const computerSelection = getComputerChoice();

    if (playerSelection === computerSelection) {
        scores["draw"] = true;
        updateResults("It's a draw. Play again.");
    }
    else if (rules[playerSelection] === computerSelection) {
        scores["draw"] = false;
        updatePlayerScore(scores["player"] + 1);
        updateResults(`You win! ${capitalize(playerSelection)} beats ${computerSelection}!`);
    }
    else {
        scores["draw"] = false;
        updateComputerScore(scores["computer"] + 1);
        updateResults(`You lose! ${capitalize(computerSelection)} beats ${playerSelection}!`);
    }

    checkForEndGame();
}

function tallyScore() {
    const finalScore = (scores["player"] > scores["computer"]) ?
                        `You won ${scores["player"]} out of 5! Play again?` :
                        `Computer won ${scores["computer"]} out of 5! Try again?`;
    
    return finalScore;
}

function checkForEndGame() {
    if (scores["round"] == 5 && !scores["draw"]) {
        const finalScore = tallyScore();
        const finalResults = `${resultsDisplay.innerText}\n\n${finalScore}`;
        updateResults(finalResults);

        choiceButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = 0.7;
        });
    }
}

function capitalize(string) {
    const firstLetter = string.charAt(0).toUpperCase();
    const remaining = string.slice(1);
    return firstLetter + remaining;
}