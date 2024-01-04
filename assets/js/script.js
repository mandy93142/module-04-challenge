document.getElementById('start-btn').addEventListener('click', startGame);
let currentQuestionIndex, timerId;
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const gameOverContainer = document.getElementById('game-over-container');
const scoreElement = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveScoreBtn = document.getElementById('save-score-btn');

const questions = [
    {
        question: 'Commonly used data types DOES NOT include:',
        answers: [
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'numbers', correct: false }
        ]
    },

    {
        question: 'The condition in an if/else statement is enclosed with:', 
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: true },
            { text: 'parenthesis', correct: false },
            { text: 'square brakets', correct: false }
        ]
    }
    
];

function startGame() {
    document.getElementById('start-btn').classList.add('hide');
    questionContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    timerId = startTimer();
    setNextQuestion();
}

function startTimer() {
    let time = 60;
    return setInterval(() => {
        if(time <= 0) {
            endGame();
            return;
        }
        time--;
        timerElement.textContent = time;
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (!correct) {
        timerElement.textContent = Math.max(0, timerElement.textContent - 10);
    }
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerId);
    questionContainer.classList.add('hide');
    gameOverContainer.classList.remove('hide');
    scoreElement.textContent = timerElement.textContent;
}

saveScoreBtn.addEventListener('click', () => {
    const initials = initialsInput.value;
    alert(`Score saved for ${initials}: ${scoreElement.textContent}`);
});
