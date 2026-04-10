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

    // ✅ Use span inside div for question text, NOT <p>
    // so that <p> does not become an extra child counted by Cypress
    const questionText = document.createElement("span");
    questionText.textContent = q.question + " ";
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "question-" + index;
      radio.value = choice;

      // ✅ Restore saved answer using setAttribute so
      // Cypress selector [checked="true"] works correctly
      if (progress[index] === choice) {
        radio.setAttribute("checked", "true");
        radio.checked = true;
      }

      radio.addEventListener("change", function () {
        // Remove checked attribute from all siblings in this group
        const siblings = questionDiv.querySelectorAll("input[type='radio']");
        siblings.forEach(function (r) {
          r.removeAttribute("checked");
        });
        // Set on the selected one
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

  // ✅ Restore score display from localStorage after refresh
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
















