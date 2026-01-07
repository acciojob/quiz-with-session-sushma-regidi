const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["JavaScript", "Java", "Python", "C"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks Text Mark Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What year was JavaScript launched?",
    choices: ["1996", "1995", "1994", "None"],
    answer: "1995"
  }
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Load progress
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
questions.forEach((q, index) => {
  const qDiv = document.createElement("div");
  qDiv.innerHTML = `<p>${q.question}</p>`;

  q.choices.forEach(choice => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index}`;
    input.value = choice;

    // Restore checked attribute
    if (progress[index] === choice) {
      input.setAttribute("checked", "true");
    }

    input.addEventListener("change", () => {
      // Remove checked from siblings
      document
        .querySelectorAll(`input[name="q${index}"]`)
        .forEach(r => r.removeAttribute("checked"));

      input.setAttribute("checked", "true");
      progress[index] = choice;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });

    qDiv.appendChild(input);
    qDiv.appendChild(document.createTextNode(choice));
    qDiv.appendChild(document.createElement("br"));
  });

  questionsDiv.appendChild(qDiv);
});

// Restore score
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}

// Submit
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});












