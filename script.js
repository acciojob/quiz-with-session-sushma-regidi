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
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

function loadProgress() {
  try {
    return JSON.parse(sessionStorage.getItem("progress")) || {};
  } catch (e) {
    return {};
  }
}

function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function renderQuestions() {
  const progress = loadProgress();
  questionsDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    // Question text as span (not p) to avoid extra block child elements
    const questionText = document.createElement("span");
    questionText.textContent = q.question + " ";
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "question-" + index;
      radio.value = choice;

      // Restore saved answer using setAttribute so
      // Cypress selector [checked="true"] works correctly
      if (progress[index] === choice) {
        radio.setAttribute("checked", "true");
        radio.checked = true;
      }

      radio.addEventListener("change", function () {
        // Remove checked attribute from all radios in this group
        const siblings = questionDiv.querySelectorAll("input[type='radio']");
        siblings.forEach(function (r) {
          r.removeAttribute("checked");
        });
        // Set checked attribute on selected radio
        radio.setAttribute("checked", "true");

        const current = loadProgress();
        current[index] = choice;
        saveProgress(current);
      });

      questionDiv.appendChild(radio);
      questionDiv.appendChild(document.createTextNode(" " + choice + "  "));
    });

    questionsDiv.appendChild(questionDiv);
  });

  // Restore score display from localStorage after refresh
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = "Your score is " + savedScore + " out of 5.";
  }
}

submitBtn.addEventListener("click", function () {
  const progress = loadProgress();
  let score = 0;

  questions.forEach(function (q, index) {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = "Your score is " + score + " out of 5.";
  localStorage.setItem("score", String(score));
});

renderQuestions();
















