const quizData = [
  {
    question: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    answer: "4"
  },
  {
    question: "Capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["HTML", "CSS", "React", "SQL"],
    answer: "React"
  },
  {
    question: "Which keyword is used to declare a variable?",
    options: ["var", "loop", "array", "string"],
    answer: "var"
  },
  {
    question: "Which symbol is used for comments in JS?",
    options: ["//", "##", "<!-- -->", "**"],
    answer: "//"
  }
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render quiz
quizData.forEach((q, index) => {
  const qDiv = document.createElement("div");

  const questionText = document.createElement("p");
  questionText.textContent = q.question;
  qDiv.appendChild(questionText);

  q.options.forEach(option => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `question-${index}`;
    radio.value = option;

    // Restore checked state
    if (progress[index] === option) {
      radio.checked = true;
    }

    // Save progress
    radio.addEventListener("change", () => {
      progress[index] = option;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));

    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement("br"));
  });

  questionsDiv.appendChild(qDiv);
});

// Load stored score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// Submit quiz
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});











