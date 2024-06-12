const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: [
      "Static",
      "Private",
      "Public"
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];


const questionBox = document.querySelector("#question h2");
const answersBox = document.getElementById("answers");
const bottom = document.getElementById("bottom");
const currentQuestion = document.querySelector("#bottom span")
const header = document.querySelector("header")
const counter = document.querySelector("#counter")
const counterBox = document.querySelector("#counterBox")
const sec = document.querySelector(".sec")

let currentIndex = 9;
let counterQuestion = 1;
let score = 0;

let interval;
let num = 360;
let duration = 59;

function createQuestion() {
  countdownReset();
  countdown();
  answersBox.innerHTML = "";
  questionBox.innerText = questions[currentIndex].question;
  currentQuestion.innerText = counterQuestion;
  const answers = questions[currentIndex].incorrect_answers.concat(questions[currentIndex].correct_answer);
  shuffleArray(answers);

  answers.forEach(answer => {
    const answerButton = document.createElement("button");
    answerButton.innerText = answer;
    answerButton.addEventListener("click", () => checkAnswer(answer))
    answersBox.appendChild(answerButton)
  })
}

function checkAnswer(answer) {
  if (answer === questions[currentIndex].correct_answer) {
    score++;
    currentIndex++;
    counterQuestion++;
  } else {
    currentIndex++;
    counterQuestion++;
  }

  if (currentIndex < questions.length) {
    createQuestion();
  } else {
    questionBox.innerText = `Hai totalizzato un punteggio di ${score} su 10`;
    bottom.innerHTML = "";
    answersBox.innerHTML = "";
    counterBox.innerHTML = "";
    header.classList.add("centred")
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const element = Math.floor(Math.random() * (i + 1));
    [array[i], array[element]] = [array[element], array[i]]
  }
  return array;
}

function countdown() {
  interval = setInterval(() => {
    if (duration >= 0) {
      if (duration < 10) {
        sec.textContent = `0${(duration)}`
      }
      else {
        sec.textContent = `${(duration)}`
      }
      counter.style.setProperty("--a", num + "deg")
      const a = counter.style.getPropertyValue("--a");
      counter.style.background = ` conic-gradient(#00ffff var(--a) ,#00ffff 0deg ,#585862d5 0deg,#585862d5 360deg)`
      num = num - (num / duration);
      duration--;
    }
    else {
      clearInterval(interval);
      currentIndex++;
      counterQuestion++;
      createQuestion();
    }
  }, 1000)
}

function countdownReset() {
  num = 360;
  duration = 59;
  clearInterval(interval)
  counter.style.setProperty("--a", num + "deg")
  counter.style.background = ` conic-gradient(#00ffff var(--a) ,#00ffff 0deg ,#585862d5 0deg,#585862d5 360deg)`
}

createQuestion();