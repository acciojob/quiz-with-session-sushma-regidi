// -------------------- QUIZ DATA --------------------
const quizData = [
  {
    question: "1. What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "2. Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "3. Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Hemingway", "Dickens", "Tolkien"],
    answer: "Shakespeare",
  },
  {
    question: "4. What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: "4",
  },
  {
    question: "5. Which is the largest ocean?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
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

    q.options.forEach((opt) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = opt;

      // Check previously selected answer from sessionStorage
      if (progress[`q${index}`] === opt) {
        input.checked = true;
      }

      // Save progress on selection
      input.addEventListener("change", () => {
        progress[`q${index}`] = opt;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
  });

  // If score was saved previously, display it
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your score is ${savedScore} out of ${quizData.length}.`;
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

