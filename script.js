// -------------------- QUIZ DATA --------------------
const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Shakespeare", "Hemingway", "Dickens", "Tolkien"],
    answer: "Shakespeare",
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "22"],
    answer: "4",
  },
  {
    question: "Which is the largest ocean?",
    choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific",
  },
];

// -------------------- DOM ELEMENTS --------------------
const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// -------------------- LOAD PROGRESS --------------------
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// -------------------- RENDER QUESTIONS --------------------
function loadQuiz() {
  questionsContainer.innerHTML = "";

  quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = choice;

      // Restore previous selections from sessionStorage
      if (progress[`q${index}`] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // ✅ Fix for Cypress
      }

      // Save progress on selection
      input.addEventListener("change", () => {
        progress[`q${index}`] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
  });

  // Show previous score if available
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your score is ${savedScore} out of ${quizData.length}.`;
  } else {
    scoreDiv.textContent = "";
  }
}

// -------------------- SUBMIT HANDLER --------------------
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    const selected = progress[`q${index}`];
    if (selected === q.answer) {
      score++;
    }
  });

  // Display and store score
  scoreDiv.textContent = `Your score is ${score} out of ${quizData.length}.`;
  localStorage.setItem("score", score);
});

// -------------------- INITIAL LOAD --------------------
loadQuiz();


