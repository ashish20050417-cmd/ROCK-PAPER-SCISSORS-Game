

let userScore = 0;
let computerScore = 0;




const choices =
    document.querySelectorAll(".choice");

const message =
    document.querySelector("#msg");

const userScoreElement =
    document.querySelector("#user-score");

const computerScoreElement =
    document.querySelector("#computer-score");

const roundElement =
    document.querySelector("#round");

const resetButton =
    document.querySelector("#reset");



function generateComputerChoice() {

    const options = [
        "rock",
        "paper",
        "scissors"
    ];


    const randomIndex =
        Math.floor(
            Math.random() *
            options.length
        );


    return options[randomIndex];
}




function clearSelection() {

    choices.forEach(choice => {

        choice.classList.remove(
            "selected"
        );

    });

}



function drawGame(
    userChoice,
    computerChoice
) {

    roundElement.textContent =
        "DRAW";


    message.className =
        "message draw";


    message.textContent =
        `Draw! Both selected ${capitalize(userChoice)}.`;

}



function showWinner(
    userWin,
    userChoice,
    computerChoice
) {

    if (userWin) {

        userScore++;


        userScoreElement.textContent =
            userScore;


        roundElement.textContent =
            "YOU WIN";


        message.className =
            "message win";


        message.textContent =
            `You win! ${capitalize(userChoice)}
             beats ${capitalize(computerChoice)}.`;

    } else {

        computerScore++;


        computerScoreElement.textContent =
            computerScore;


        roundElement.textContent =
            "AI WINS";


        message.className =
            "message lose";


        message.textContent =
            `You lose! ${capitalize(computerChoice)}
             beats ${capitalize(userChoice)}.`;

    }


    animateScore();
}




function playGame(
    userChoice
) {

    clearSelection();



    const selected =
        document.getElementById(
            userChoice
        );


    if (selected) {

        selected.classList.add(
            "selected"
        );

    }


   

    const computerChoice =
        generateComputerChoice();


    console.log(
        "You:",
        userChoice
    );

    console.log(
        "Computer:",
        computerChoice
    );


    if (
        userChoice === computerChoice
    ) {

        drawGame(
            userChoice,
            computerChoice
        );

        return;
    }



    let userWin = false;


    if (
        userChoice === "rock"
    ) {

        userWin =
            computerChoice === "scissors";

    } else if (
        userChoice === "paper"
    ) {

        userWin =
            computerChoice === "rock";

    } else if (
        userChoice === "scissors"
    ) {

        userWin =
            computerChoice === "paper";

    }


    showWinner(
        userWin,
        userChoice,
        computerChoice
    );

}


function capitalize(
    value
) {

    return value
        .charAt(0)
        .toUpperCase() +
        value.slice(1);

}




function animateScore() {

    const elements = [
        userScoreElement,
        computerScoreElement
    ];


    elements.forEach(element => {

        element.animate(
            [
                {
                    transform:
                        "scale(1)"
                },

                {
                    transform:
                        "scale(1.2)"
                },

                {
                    transform:
                        "scale(1)"
                }
            ],
            {
                duration: 350,
                easing: "ease-out"
            }
        );

    });

}




function resetGame() {

    userScore = 0;

    computerScore = 0;


    userScoreElement.textContent =
        "0";

    computerScoreElement.textContent =
        "0";


    roundElement.textContent =
        "READY";


    message.className =
        "message";


    message.textContent =
        "Choose your move to start.";


    clearSelection();

}



choices.forEach(choice => {

    choice.addEventListener(
        "click",
        () => {

            playGame(
                choice.id
            );

        }
    );

});




resetButton.addEventListener(
    "click",
    resetGame
);




document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();


        if (key === "r") {

            playGame("rock");

        }


        if (key === "p") {

            playGame("paper");

        }


        if (key === "s") {

            playGame("scissors");

        }


        if (key === "escape") {

            resetGame();

        }

    }
);