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

// Funzioni
function generateRandomNumber(arr) {

    while (arr.length < 5) {
        const newNumber = randomNumber();
        if (!arr.includes(newNumber)) {
            arr.push(newNumber);
        }
    }

    return arr;
}

function generateListElement(arr) {
    for (let i = 0; i < arr.length; i++) {
        const newLi = document.createElement("li");
        newLi.textContent = arr[i];
        numbersListElement.appendChild(newLi);
    }
}

function countdownTimer() {
    if (count > 0) {
        count--;
    } else {
        clearInterval(gameTimer);
        numbersListElement.classList.add("d-none");
        answersFormElement.classList.remove("d-none");
        instructionsElement.innerText = "Inserisci tutti i numeri che ricordi(l'ordine non è importante)"
    }
    countdownElement.innerText = count;
    return count;
}


function takeInput() {
    const inputs = document.querySelectorAll("#input-group input");
    const values = [];

    for (let i = 0; i < inputs.length; i++) {
        const input = Number(inputs[i].value);
        const isANumber = !isNaN(input);
        if (isANumber && input > 0) {
            values.push(input)
        } else {
            messageElement.innerText = "Hai inserito dei valori sbagliati o mancanti, riprova!";
            return null;
        }
    }
    return values;
}


function checkInput(solutions, answers) {
    const correctAnswerArray = [];
    for (let i = 0; i < solutions.length; i++) {
        const solution = Number(solutions[i]);

        for (let x = 0; x < answers.length; x++) {
            const answer = Number(answers[x]);

            if (answer === solution) {
                correctAnswerArray.push(solution);
            }
        }
    }
    return correctAnswerArray;
}

function checkAnswer(numOFCorrectAnswer, AnswersString) {
    if (numOFCorrectAnswer > 0) {
        if (numOFCorrectAnswer === 1) {
            messageElement.innerText = `${numOFCorrectAnswer} risposta esatta!. Di preciso: ${AnswersString}`;
        } else {
            messageElement.innerText = `${numOFCorrectAnswer} risposte esatte!. Di preciso: ${AnswersString}`;
        }
    } else {
        messageElement.innerText = `${numOFCorrectAnswer} risposte esatte! . Riprovaci con più impegno`;
    }
}
