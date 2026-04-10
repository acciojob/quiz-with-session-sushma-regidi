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

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = choice;

      // ✅ KEY FIX: use setAttribute so Cypress can detect [checked="true"]
      if (progress[index] === choice) {
        radio.setAttribute("checked", "true");
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        // Remove checked attribute from all radios in this question
        const allRadios = questionDiv.querySelectorAll("input[type='radio']");
        allRadios.forEach(r => r.removeAttribute("checked"));

        // Set checked attribute on selected radio
        radio.setAttribute("checked", "true");

        const current = loadProgress();
        current[index] = choice;
        saveProgress(current);
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(questionDiv);
  });

  // Restore score from localStorage if present
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
  }
}

submitBtn.addEventListener("click", () => {
  const progress = loadProgress();
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", String(score));
});

renderQuestions();
















