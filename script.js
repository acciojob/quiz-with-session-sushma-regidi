// 🔹 QUESTIONS DATA (you can modify these)
const questions = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats"
        ],
        answer: 1
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of the above"],
        answer: 1
    },
    {
        question: "Which HTML tag is used to link JavaScript?",
        options: ["<javascript>", "<js>", "<script>", "<link>"],
        answer: 2
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Google", "Microsoft", "Apple"],
        answer: 0
    }
];

// 🔹 DOM Elements
const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// ------------------------------
// 1️⃣ LOAD PREVIOUS PROGRESS
// ------------------------------
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ------------------------------
// 2️⃣ DISPLAY QUESTIONS
// ------------------------------
function loadQuestions() {
    questionsDiv.innerHTML = "";

    questions.forEach((q, qIndex) => {
        const qContainer = document.createElement("div");
        qContainer.classList.add("question");

        qContainer.innerHTML = `<p>${qIndex + 1}. ${q.question}</p>`;

        q.options.forEach((option, optIndex) => {
            const optionId = `q${qIndex}_opt${optIndex}`;

            const checked =
                progress[qIndex] === optIndex ? "checked" : "";

            qContainer.innerHTML += `
                <label>
                    <input type="radio" 
                        name="question${qIndex}" 
                        value="${optIndex}"
                        ${checked}>
                    ${option}
                </label><br>
            `;
        });

        questionsDiv.appendChild(qContainer);
    });
}

// Load questions on page load
loadQuestions();

// ------------------------------
// 3️⃣ SAVE TO SESSION STORAGE WHEN USER SELECTS
// ------------------------------
questionsDiv.addEventListener("change", (e) => {
    if (e.target.type === "radio") {
        const qNum = e.target.name.replace("question", "");
        const selectedOption = Number(e.target.value);

        progress[qNum] = selectedOption;

        sessionStorage.setItem("progress", JSON.stringify(progress));
    }
});

// ------------------------------
// 4️⃣ SUBMIT QUIZ
// ------------------------------
submitBtn.addEventListener("click", () => {
    let score = 0;

    questions.forEach((q, i) => {
        if (progress[i] === q.answer) score++;
    });

    // Display Score
    scoreDiv.innerText = `Your score is ${score} out of ${questions.length}.`;

    // Save score to localStorage
    localStorage.setItem("score", score);
});

// ------------------------------
// 5️⃣ SHOW SCORE IF PAGE REFRESHED AFTER SUBMIT
// ------------------------------
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
    scoreDiv.innerText = `Your score is ${lastScore} out of ${questions.length}.`;
}



