// Questions data
const questionsData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"]
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"]
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
      "Computer Style Sheets"
    ]
  },
  {
    question: "Which HTML tag is used for JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"]
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"]
  }
];

// Correct answers index
const correctAnswers = [1, 3, 0, 2, 1];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress from sessionStorage
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsContainer.innerHTML = "";

  questionsData.forEach((q, qIndex) => {
    const questionDiv = document.createElement("div");

    const questionTitle = document.createElement("p");
    questionTitle.textContent = q.question;
    questionDiv.appendChild(questionTitle);

    q.options.forEach((option, optIndex) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `question-${qIndex}`;
      radio.value = optIndex;

      // Restore checked state from sessionStorage
      if (savedProgress[qIndex] === optIndex) {
        radio.checked = true;
      }

      // Save progress on change
      radio.addEventListener("change", () => {
        savedProgress[qIndex] = optIndex;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
  });
}

// Calculate score
function calculateScore() {
  let score = 0;

  Object.keys(savedProgress).forEach((qIndex) => {
    if (savedProgress[qIndex] === correctAnswers[qIndex]) {
      score++;
    }
  });

  return score;
}

// Handle submit
submitButton.addEventListener("click", () => {
  const score = calculateScore();
  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save score to localStorage
  localStorage.setItem("score", score);
});

// Load previous score from localStorage
function loadPreviousScore() {
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
  }
}

// Initialize
renderQuestions();
loadPreviousScore();









