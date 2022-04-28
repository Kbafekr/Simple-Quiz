const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById("score")
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// questions
 
let questions = 
[
    {   
        "question": "I like - I like music that goes like this: 'falalala!'. But sometimes I like - I like music that goes like this: 'FALALALA'!",
        "choice1": "Fred Fredburger",
        "choice2": "Jolly Roger",
        "choice3": "Flapjack",
        "choice4": "Gunter",
        "answer": 1
    },
    
    {
        "question": "Chowder, if there's one thing mother's taught me it's to sleep as much as you can. That way you don't have to face the horrible reality of what your life's become.",
        "choice1": "Eduardo",
        "choice2": "Raj",
        "choice3": "Gazpacho",
        "choice4": "Wendell Feinstein",
        "answer": 3
    },

    {
        "question": "You said, uh ... 'libation', or something... juicebox?",
        "choice1": "Barry Mackerbacker",
        "choice2": "Alan Keane",
        "choice3": "Jackie Khones",
        "choice4": "Mr. Green",
        "answer": 3
    },
    
    {
        "question": "GET OFFA MY PROPERTY!",
        "choice1": "Wendell Feinstein",
        "choice2": "Sticky Beard",
        "choice3": "Sloppy Moe",
        "choice4": "Fuzzy Lumpkins",
        "answer": 4
    },
    
    {
        "question": "Watch where you're goin', ya fool!",
        "choice1": "Raja Jaja",
        "choice2": "Di Lung",
        "choice3": "Hak Foo",
        "choice4": "Kanojo Cho",
        "answer": 2
    },
    
    {
        "question": "New dog belongs to Soto. You go now!",
        "choice1": "Azmuth",
        "choice2": "Aku",
        "choice3": "Cinderblock",
        "choice4": "Soto",
        "answer": 4
    },
    
    {
        "question": "*pants*",
        "choice1": "Soto's dog",
        "choice2": "Courage",
        "choice3": "Ren",
        "choice4": "Saliva",
        "answer": 4
    },
    
    {
        "question": "It's a delicious midst of Purple Flurp",
        "choice1": "A.J.",
        "choice2": "Chad Dickson",
        "choice3": "Ike Wilderman",
        "choice4": "Lenny Baxter",
        "answer": 3
    },
    
    {
        "question": "Go through that. You're so close, you have to keep going.",
        "choice1": "Aelita",
        "choice2": "Sapna Nehru",
        "choice3": "Ashi",
        "choice4": "Kimiko Tohomiko",
        "answer": 3
    },

    {
        "question": "bah-gawk!",
        "choice1": "Chicken",
        "choice2": "Bridget",
        "choice3": "Gertrude",
        "choice4": "Lazar",
        "answer": 2
    }
]

//constants
game.classList.remove('hidden');
loader.classList.add('hidden');


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

        choices.forEach((choice) => {

        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number]
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

        setTimeout(() => {
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