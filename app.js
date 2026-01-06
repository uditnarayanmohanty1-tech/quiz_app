const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-4.mp3");
const wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");
const nextSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
const bgImages = [
  "https://cdn.pixabay.com/photo/2021/06/02/18/04/education-6305113_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/10/12/19/54/homework-1735644_1280.png",
  "https://cdn.pixabay.com/photo/2020/09/23/07/53/question-mark-5595294_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/12/03/09/47/pencil-5800079_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/03/15/08/23/school-supplies-7069759_1280.jpg"
];

const backgrounds = [
    "linear-gradient(to right, #667eea, #764ba2)",
    "linear-gradient(to right, #43cea2, #185a9d)",
    "linear-gradient(to right, #ff9966, #ff5e62)",
    "linear-gradient(to right, #56ab2f, #a8e063)",
    "linear-gradient(to right, #614385, #516395)"
];

let timeLeft = 10;
let timerInterval;


const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correct: 2
    },
    {
        question: "Which is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Flask"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";
    showQuestion();
}

function showQuestion() {
    clearInterval(timerInterval);
    document.body.style.background =
    backgrounds[currentQuestion % backgrounds.length];
const img = bgImages[currentQuestion % bgImages.length];
document.body.style.backgroundImage = `url('${img}')`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";


    timeLeft = 10;
    document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);

    const q = questions[currentQuestion];
    document.getElementById("questionText").innerText = q.question;

    const buttons = document.querySelectorAll(".options button");
    buttons.forEach((btn, index) => {
        btn.innerText = q.options[index];
        btn.disabled = false;
        btn.className = "";
    });

    document.getElementById("nextBtn").style.display = "none";
}


function selectAnswer(index) {
    clearInterval(timerInterval);

    const correctIndex = questions[currentQuestion].correct;
    const buttons = document.querySelectorAll(".options button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;

        if (i === correctIndex) {
            btn.classList.add("correct");
        } else if (i === index) {
            btn.classList.add("wrong");
        }
    });

    if (index === correctIndex) {
    score++;
    correctSound.play();
} else {
    wrongSound.play();
}


    document.getElementById("nextBtn").style.display = "block";
}


function nextQuestion() {
    nextSound.play();

    clearInterval(timerInterval);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


function showResult() {
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";

    const total = questions.length;
    const percent = Math.round((score / total) * 100);

    document.getElementById("scoreText").innerText =
        "You scored " + score + " out of " + total;

    let emoji = "";
    let message = "";

    if (percent >= 80) {
        emoji = "😄";
        message = "Excellent performance!";
    } else if (percent >= 60) {
        emoji = "🙂";
        message = "Good job! Keep practicing.";
    } else if (percent >= 40) {
        emoji = "😐";
        message = "Not bad, but you can improve.";
    } else {
        emoji = "😢";
        message = "Needs more practice.";
    }

    document.getElementById("resultEmoji").innerText = emoji;
    document.getElementById("resultMessage").innerText = message;
}


function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
}

