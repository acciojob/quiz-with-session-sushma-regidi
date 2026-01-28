// ----------------------
// Questions (MUST MATCH CYPRESS)
// ----------------------
const questions = [
  {
    question: "What is the highest mountain in the world?",
    choices: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: "Mount Everest"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote the Ramayana?",
    choices: ["Valmiki", "Ved Vyasa", "Kalidasa", "Tulsidas"],
    answer: "Valmiki"
  },
  {
    question: "What is the capital of Australia?",
    choices: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide"
  }
];

// ----------------------
// DOM Elements
// ----------------------
const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// ----------------------
// Session Storage
// ----------------------
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ----------------------
// Render Questions
// ----------------------
function renderQuestions() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const div = document.createElement("div");
    div.textContent = q.question;

    q.choices.forEach(choice => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${qIndex}`;
      input.value = choice;

      // Restore checked state
      if (progress[qIndex] === choice) {
        input.setAttribute("checked", "true");
      }

      input.addEventListener("click", () => {
        progress[qIndex] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      div.appendChild(document.createElement("br"));
      div.appendChild(input);
      div.appendChild(document.createTextNode(choice));
    });

    questionsDiv.appendChild(div);
  });
}

// ----------------------
// Submit Logic
// ----------------------
submitBtn.addEventListener("click", () => {
  let score = 0;

  Object.keys(progress).forEach(index => {
    if (progress[index] === questions[index].answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});

// ----------------------
// Restore Score After Refresh
// ----------------------
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// ----------------------
// Init
// ----------------------
renderQuestions();














