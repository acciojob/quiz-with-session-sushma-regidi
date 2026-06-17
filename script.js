// ─── Quiz Data ───────────────────────────────────────────────────────────────
const questions = [
  {
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    text: "Which language runs in a web browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript"
  },
  {
    text: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  }
];
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
 
/** Read saved progress from sessionStorage (returns {} if nothing saved). */
function loadProgress() {
  try {
    return JSON.parse(sessionStorage.getItem("progress")) || {};
  } catch {
    return {};
  }
}
 
/** Persist the current progress object to sessionStorage. */
function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}
 
// ─── Build UI ─────────────────────────────────────────────────────────────────
function buildQuiz() {
  const container = document.getElementById("questions");
  const progress  = loadProgress();
 
  questions.forEach((q, qi) => {
    // Wrapper div for each question
    const card = document.createElement("div");
 
    // Question text
    const heading = document.createElement("p");
    heading.className = "question-text";
    heading.textContent = `${qi + 1}. ${q.text}`;
    card.appendChild(heading);
 
    // Answer options
    q.options.forEach((opt) => {
      const label = document.createElement("label");
      label.className = "option-label";
 
      const radio = document.createElement("input");
      radio.type  = "radio";
      radio.name  = `question-${qi}`;
      radio.value = opt;
 
      // Restore saved answer (if any)
      if (progress[qi] === opt) {
        radio.checked = true;
      }
 
      // Persist selection whenever the user picks an answer
      radio.addEventListener("change", () => {
        const current = loadProgress();
        current[qi]   = opt;
        saveProgress(current);
      });
 
      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      card.appendChild(label);
    });
 
    container.appendChild(card);
  });
}
 
// ─── Score Logic ──────────────────────────────────────────────────────────────
function submitQuiz() {
  const progress = loadProgress();
  let score = 0;
 
  questions.forEach((q, qi) => {
    if (progress[qi] === q.answer) {
      score++;
    }
  });
 
  // Display result
  document.getElementById("score").textContent =
    `Your score is ${score} out of ${questions.length}.`;
 
  // Persist score in localStorage
  localStorage.setItem("score", score);
}
 
// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildQuiz();
 
  // Restore last score display if available
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    document.getElementById("score").textContent =
      `Your score is ${savedScore} out of ${questions.length}.`;
  }
 
  document.getElementById("submit").addEventListener("click", submitQuiz);
});
















