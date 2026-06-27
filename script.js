const questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Coded Style Syntax"
    ],
    correct: "Cascading Style Sheets"
  },
  {
    question: "Which language is used for web scripting?",
    choices: [
      "JavaScript",
      "Python",
      "C++",
      "Java"
    ],
    correct: "JavaScript"
  },
  {
    question: "What does API stand for?",
    choices: [
      "Application Program Interface",
      "Application Programming Interface",
      "Applied Program Interface",
      "Applied Programming Interface"
    ],
    correct: "Applied Program Interface"
  },
  {
    question: "Which of the following is a JavaScript framework?",
    choices: [
      "Django",
      "Laravel",
      "React",
      "Flask"
    ],
    correct: "React"
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

  questions.forEach((item, qIndex) => {
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = item.question;
    div.appendChild(p);

    item.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${qIndex}`;
      input.value = choice;

      if (progress[qIndex] !== undefined && progress[qIndex] === choice) {
        input.setAttribute("checked", "true");
        input.checked = true;
      }

      input.addEventListener("change", () => {
        const current = loadProgress();
        current[qIndex] = choice;
        saveProgress(current);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
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

  questions.forEach((item, qIndex) => {
    if (progress[qIndex] !== undefined && progress[qIndex] === item.correct) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", String(score));
});

renderQuestions();
















