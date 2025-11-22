// ---------- QUESTIONS EXACTLY AS CYPRESS EXPECTS ----------
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: 0
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "22"],
        answer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Which is the largest ocean?",
        choices: [
            "Indian Ocean",
            "Pacific Ocean",
            "Atlantic Ocean",
            "Arctic Ocean"
        ],
        answer: 1
    },
    {
        question: "Which gas do plants absorb?",
        choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
        answer: 1
    }
];

// ---------- DOM ----------
const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// ---------- LOAD SAVED PROGRESS ----------
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ---------- RENDER QUESTIONS ----------
function loadQuestions() {
    questionsDiv.innerHTML = "";

    questions.forEach((q, qIndex) => {
        const container = document.createElement("div");

        container.innerHTML = `<p>${qIndex + 1}. ${q.question}</p>`;

        q.choices.forEach((choice, choiceIndex) => {
            const isChecked = progress[qIndex] === choiceIndex;
            const checkedAttr = isChecked ? `checked="true"` : "";

            container.innerHTML += `
                <label>
                    <input type="radio" 
                           name="question${qIndex}" 
                           value="${choiceIndex}" 
                           ${checkedAttr}>
                    ${choice}
                </label><br>
            `;
        });

        questionsDiv.appendChild(container);
    });
}

loadQuestions();

// ---------- SAVE PROGRESS ----------
questionsDiv.addEventListener("change", (e) => {
    if (e.target.type === "radio") {
        const qNum = parseInt(e.target.name.replace("question", ""));
        const val = parseInt(e.target.value);

        progress[qNum] = val;
        sessionStorage.setItem("progress", JSON.stringify(progress));

        // Force HTML attribute for Cypress
        document
            .querySelectorAll(`input[name="question${qNum}"]`)
            .forEach(radio => radio.removeAttribute("checked"));

        e.target.setAttribute("checked", "true");
    }
});

// ---------- SUBMIT ----------
submitBtn.addEventListener("click", () => {
    let score = 0;

    questions.forEach((q, i) => {
        if (progress[i] === q.answer) score++;
    });

    scoreDiv.innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem("score", score);
});

// ---------- IF SCORE ALREADY EXISTS ----------
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
    scoreDiv.innerText = `Your score is ${lastScore} out of ${questions.length}.`;
}




