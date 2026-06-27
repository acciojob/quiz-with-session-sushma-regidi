const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    correct: "Paris"
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Mount Everest", "Mount Kilimanjaro", "Mount Fuji", "Mount Rushmore"],
    correct: "Mount Everest"
  },
  {
    question: "What is the largest country by area?",
    choices: ["India", "china", "srilanka", "bangaladesh"],
    correct: "India"
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Jupiter"
  },
  {
    question: "What is the largest ocean?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific"
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
  questionsContainer.innerHTML = "";
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
}

renderQuestions();

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
















