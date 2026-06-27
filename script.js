const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which keyword declares a variable in JavaScript?",
    options: ["var", "int", "dim", "define"],
    correct: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Coded Style Syntax"
    ],
    correct: 0
  },
  {
    question: "Which method adds an element to the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "append()"],
    correct: 0
  },
  {
    question: "What tag is used to link a CSS file in HTML?",
    options: ["<link>", "<style>", "<css>", "<script>"],
    correct: 0
  }
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

function loadProgress() {
  try {
    const saved = sessionStorage.getItem("progress");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function renderQuestions() {
  const progress = loadProgress();

  quizData.forEach((item, qIndex) => {
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = `${qIndex + 1}. ${item.question}`;
    div.appendChild(p);

    item.options.forEach((option, oIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${qIndex}`;
      input.value = oIndex;

      if (progress[qIndex] !== undefined && parseInt(progress[qIndex]) === oIndex) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        const current = loadProgress();
        current[qIndex] = oIndex;
        saveProgress(current);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      div.appendChild(label);
    });

    questionsContainer.appendChild(div);
  });

  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
  }
}

submitBtn.addEventListener("click", () => {
  const progress = loadProgress();
  let score = 0;

  quizData.forEach((item, qIndex) => {
    if (progress[qIndex] !== undefined && parseInt(progress[qIndex]) === item.correct) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

renderQuestions();const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which keyword declares a variable in JavaScript?",
    options: ["var", "int", "dim", "define"],
    correct: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Coded Style Syntax"
    ],
    correct: 0
  },
  {
    question: "Which method adds an element to the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "append()"],
    correct: 0
  },
  {
    question: "What tag is used to link a CSS file in HTML?",
    options: ["<link>", "<style>", "<css>", "<script>"],
    correct: 0
  }
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

function loadProgress() {
  try {
    const saved = sessionStorage.getItem("progress");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function renderQuestions() {
  const progress = loadProgress();

  quizData.forEach((item, qIndex) => {
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = `${qIndex + 1}. ${item.question}`;
    div.appendChild(p);

    item.options.forEach((option, oIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${qIndex}`;
      input.value = oIndex;

      if (progress[qIndex] !== undefined && parseInt(progress[qIndex]) === oIndex) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        const current = loadProgress();
        current[qIndex] = oIndex;
        saveProgress(current);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      div.appendChild(label);
    });

    questionsContainer.appendChild(div);
  });

  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
  }
}

submitBtn.addEventListener("click", () => {
  const progress = loadProgress();
  let score = 0;

  quizData.forEach((item, qIndex) => {
    if (progress[qIndex] !== undefined && parseInt(progress[qIndex]) === item.correct) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

renderQuestions();
















