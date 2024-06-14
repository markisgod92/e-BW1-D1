


const questionBox = document.querySelector("#question h2");
const answersBox = document.getElementById("answers");
const answersResult = document.querySelector("#answersResult table")
const bottom = document.getElementById("bottom");
const currentQuestion = document.getElementById("currentQuestion")
const header = document.querySelector("header")
const counter = document.querySelector("#counter")
const counterBox = document.querySelector("#counterBox")
const sec = document.querySelector(".sec")

const answersArray = [];

let currentIndex = 0;
let counterQuestion = 1;
let score = 0;

let interval;
let num = 360;
let duration = 59;

function createQuestion() {
  if (currentIndex < questions.length) {
    countdownReset();
    countdown(questions[currentIndex]);
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
  } else {
    showResults()
  }
}

function checkAnswer(answer) {
  if (answer === questions[currentIndex].correct_answer) {
    answersArray.push({question: questions[currentIndex].question, answer: answer, correct: true})
    score++;
    currentIndex++;
    counterQuestion++;
    
  } else {
    answersArray.push({question: questions[currentIndex].question, answer: answer, correct: false})
    currentIndex++;
    counterQuestion++;
    
  }
  createQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const element = Math.floor(Math.random() * (i + 1));
    [array[i], array[element]] = [array[element], array[i]]
  }
  return array;
}

function countdown(question) {
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
      counter.style.background = `conic-gradient(#00ffff var(--a), #00ffff 0deg, #585862d5 0deg, #585862d5 360deg)`
      num = num - (num / duration);
      duration--;
    }
    else {
      clearInterval(interval);
      answersArray.push({question: question.question, answer: "none", correct: false})
      currentIndex++;
      counterQuestion++;
      createQuestion();
    }
  }, 1000)
}

function countdownReset() {
  num = 360;
  duration = 59;
  sec.textContent = `60`;
  clearInterval(interval)
  counter.style.setProperty("--a", num + "deg")
  counter.style.background = `conic-gradient(#00ffff var(--a), #00ffff 0deg, #585862d5 0deg, #585862d5 360deg)`
}

function showResults() {
  clearInterval(interval)
  questionBox.innerText = `Hai totalizzato un punteggio di ${score} su 10`;
  bottom.innerHTML = "";
  answersBox.innerHTML = "";
  counterBox.innerHTML = "";
  header.classList.add("centred")

  answersArray.forEach(element => {
    const report = document.createElement("tr")
    const questionReport = document.createElement("td")
    const answerReport = document.createElement("td")
    const correctAnswer = document.createElement("td")
    
    questionReport.innerText = element.question

    if (element.answer === "none") {
      answerReport.innerText = "not answered"
      answerReport.style.color = "red"
    } else {
      if (element.correct === true) {
        answerReport.innerText = element.answer
        answerReport.style.color = "green"
      } else {
        answerReport.innerText = element.answer
        answerReport.style.color = "red"
        answerReport.style.textDecoration = "line-through"

        
        correctAnswer.innerText = questions[answersArray.indexOf(element)].correct_answer
        correctAnswer.style.color = "yellow"
      }
    }

    answersResult.appendChild(report)
    report.appendChild(questionReport)
    report.appendChild(answerReport)
    report.appendChild(correctAnswer)
  })
}

createQuestion();