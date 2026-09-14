/* =====================================================
   ELEMENTS
===================================================== */

const boxes =
    document.querySelectorAll(".box");

const resetButton =
    document.querySelector("#reset-button");

const newButton =
    document.querySelector("#new-button");

const messageContainer =
    document.querySelector("#message-container");

const message =
    document.querySelector("#msg");

const turnDisplay =
    document.querySelector("#turn-display");


/* =====================================================
   GAME STATE
===================================================== */

let turnO = true;

let gameOver = false;

let moveCount = 0;


/* =====================================================
   WIN PATTERNS
===================================================== */

const winPatterns = [

    [0, 1, 2],

    [0, 3, 6],

    [0, 4, 8],

    [1, 4, 7],

    [2, 5, 8],

    [2, 4, 6],

    [3, 4, 5],

    [6, 7, 8]

];


/* =====================================================
   RESET GAME
===================================================== */

const resetGame = () => {

    turnO = true;

    gameOver = false;

    moveCount = 0;

    enableBoxes();

    messageContainer.classList.add(
        "hidden"
    );

    turnDisplay.innerText = "O";

};


/* =====================================================
   ENABLE BOXES
===================================================== */

const enableBoxes = () => {

    boxes.forEach(box => {

        box.disabled = false;

        box.innerText = "";

        box.classList.remove(
            "o",
            "x",
            "winner"
        );

    });

};


/* =====================================================
   DISABLE BOXES
===================================================== */

const disableBoxes = () => {

    boxes.forEach(box => {

        box.disabled = true;

    });

};


/* =====================================================
   CLICK EVENT
===================================================== */

boxes.forEach(box => {

    box.addEventListener(
        "click",
        () => {

            if (gameOver) {
                return;
            }


            /* Player O */

            if (turnO) {

                box.innerText = "O";

                box.classList.add("o");

                turnO = false;

                turnDisplay.innerText = "X";

            }


            /* Player X */

            else {

                box.innerText = "X";

                box.classList.add("x");

                turnO = true;

                turnDisplay.innerText = "O";

            }


            box.disabled = true;

            moveCount++;


            checkWinner();

        }
    );

});


/* =====================================================
   CHECK WINNER
===================================================== */

const checkWinner = () => {

    for (
        let pattern of winPatterns
    ) {

        const pos1 =
            boxes[pattern[0]].innerText;

        const pos2 =
            boxes[pattern[1]].innerText;

        const pos3 =
            boxes[pattern[2]].innerText;


        if (
            pos1 !== "" &&
            pos2 !== "" &&
            pos3 !== ""
        ) {

            if (
                pos1 === pos2 &&
                pos2 === pos3
            ) {

                /* Highlight winning boxes */

                boxes[
                    pattern[0]
                ].classList.add(
                    "winner"
                );

                boxes[
                    pattern[1]
                ].classList.add(
                    "winner"
                );

                boxes[
                    pattern[2]
                ].classList.add(
                    "winner"
                );


                showWinner(pos1);

                return;

            }

        }

    }


    /* Check draw */

    if (
        moveCount === 9
    ) {

        showDraw();

    }

};


/* =====================================================
   SHOW WINNER
===================================================== */

const showWinner = (
    winner
) => {

    gameOver = true;

    message.innerText =
        `Player ${winner} Wins!`;

    messageContainer.classList.remove(
        "hidden"
    );

    disableBoxes();

};


/* =====================================================
   SHOW DRAW
===================================================== */

const showDraw = () => {

    gameOver = true;

    message.innerText =
        "It's a Draw!";

    messageContainer.classList.remove(
        "hidden"
    );

    disableBoxes();

};


/* =====================================================
   BUTTON EVENTS
===================================================== */

newButton.addEventListener(
    "click",
    resetGame
);


resetButton.addEventListener(
    "click",
    resetGame
);


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            resetGame();

        }

    }
);