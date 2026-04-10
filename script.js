const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific"
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["O2", "CO2", "H2O", "NaCl"],
    answer: "H2O"
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn    = document.getElementById("submit");
const scoreDiv     = document.getElementById("score");

/* ── Storage helpers ───────────────────────────── */
function loadProgress() {
  try {
    return JSON.parse(sessionStorage.getItem("progress")) || {};
  } catch (e) {
    return {};
  }
}

function saveProgress(progress) {
  try {
    sessionStorage.setItem("progress", JSON.stringify(progress));
  } catch (e) { /* ignore */ }
}

function loadScore() {
  try {
    return localStorage.getItem("score");
  } catch (e) {
    return null;
  }
}

function saveScore(score) {
  try {
    localStorage.setItem("score", String(score));
  } catch (e) { /* ignore */ }
}

/* ── Render questions ──────────────────────────── */
function renderQuestions() {
  const progress = loadProgress();
  questionsDiv.innerHTML = "";

  questions.forEach((q, qi) => {
    const card = document.createElement("div");

    const qNum = document.createElement("p");
    qNum.className = "q-number";
    qNum.textContent = `Question ${qi + 1} of ${questions.length}`;

    const qText = document.createElement("p");
    qText.className = "q-text";
    qText.textContent = q.question;

    const choicesDiv = document.createElement("div");
    choicesDiv.className = "choices";

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      label.className = "choice-label";

      const radio = document.createElement("input");
      radio.type    = "radio";
      radio.name    = `question-${qi}`;
      radio.value   = choice;

      // Restore saved answer from sessionStorage
      if (progress[qi] === choice) {
        radio.checked = true;
      }

      // Save to sessionStorage on change
      radio.addEventListener("change", () => {
        const current = loadProgress();
        current[qi] = choice;
        saveProgress(current);
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      choicesDiv.appendChild(label);
    });

    card.appendChild(qNum);
    card.appendChild(qText);
    card.appendChild(choicesDiv);
    questionsDiv.appendChild(card);
  });
}

/* ── Display persisted score on load ──────────── */
function displayStoredScore() {
  const saved = loadScore();
  if (saved !== null) {
    scoreDiv.textContent = `Your score is ${saved} out of ${questions.length}.`;
    scoreDiv.classList.add("show");
  }
}

/* ── Submit handler ────────────────────────────── */
submitBtn.addEventListener("click", () => {
  const progress = loadProgress();
  let score = 0;

  questions.forEach((q, qi) => {
    if (progress[qi] === q.answer) {
      score++;
    }
  });

  saveScore(score);

  scoreDiv.classList.remove("show");
  // Force reflow so animation replays
  void scoreDiv.offsetWidth;
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  scoreDiv.classList.add("show");
});

/* ── Init ──────────────────────────────────────── */
renderQuestions();
displayStoredScore();
















