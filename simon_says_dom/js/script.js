// Elementi Html 
const countdownElement = document.getElementById("countdown");
const numbersListElement = document.getElementById("numbers-list");
const answersFormElement = document.getElementById("answers-form");
const buttonElement = document.querySelector("button");
const messageElement = document.getElementById("message");
const instructionsElement = document.getElementById("instructions")

const numbersListArr = [];


// Random 
const randomNumber = () => parseInt(Math.random() * (50 - 1) + 1);
const numbersListGenerated = generateRandomNumber(numbersListArr);
generateListElement(numbersListGenerated);

// Timer countdown
let count = 10;
const gameTimer = setInterval(countdownTimer, 1000);

// Input 

buttonElement.addEventListener("click", function (event) {
    event.preventDefault();
    messageElement.innerText = ""
    const values = takeInput();

    if (values === null) {
        return;
    }

    const correctAnswers = checkInput(values, numbersListGenerated);
    const numberOfAnswer = correctAnswers.length;
    const correctAnswersString = correctAnswers.join(", ");

    checkAnswer(numberOfAnswer, correctAnswersString);
})