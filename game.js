const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById("score")
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// questions
let questions = [
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },
        {
            question: 'I like - I like music that goes like this: "falalala!". But sometimes I like - I like music that goes like this: "FALALALA"!',
            choice1: "Fred Fredburger",
            choice2: "Jolly Roger",
            choice3: "Flapjack",
            choice4: "Gunter",
            answer: 1
        },

    ];

//constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    {localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html")};

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach( choice => {

        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

    choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct")
        { incrementScore(CORRECT_BONUS); 
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score;
}

startGame()