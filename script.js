const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load session progress
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render quiz
function renderQuestions() {
  questionsContainer.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const qDiv = document.createElement("div");

    // Question text (ONLY the question)
    qDiv.appendChild(document.createTextNode(q.question));

    q.choices.forEach((choice) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${qIndex}`;
      input.value = choice;

      // Restore checked attribute for Cypress
      if (progress[qIndex] === choice) {
        input.setAttribute("checked", "true");
      }

      input.addEventListener("click", () => {
        progress[qIndex] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));

        // Remove checked from siblings
        document
          .getElementsByName(`question-${qIndex}`)
          .forEach(r => r.removeAttribute("checked"));

        input.setAttribute("checked", "true");
      });

      qDiv.appendChild(input);
    });

    questionsContainer.appendChild(qDiv);
  });
}

// Calculate score
function calculateScore() {
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  return score;
}

// Submit quiz
submitBtn.addEventListener("click", () => {
  const score = calculateScore();
  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});

// Restore score after refresh
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}

// Init
renderQuestions();










