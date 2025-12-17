document.addEventListener("DOMContentLoaded", () => {
    const questionsDiv = document.getElementById("questions");
    const submitBtn = document.getElementById("submit");
    const scoreDiv = document.getElementById("score");

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which language runs in a web browser?",
            choices: ["Java", "C", "Python", "JavaScript"],
            answer: "JavaScript"
        },
        {
            question: "What does CSS stand for?",
            choices: [
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Creative Style System",
                "Colorful Style Sheets"
            ],
            answer: "Cascading Style Sheets"
        },
        {
            question: "What year was JavaScript launched?",
            choices: ["1996", "1995", "1994", "none"],
            answer: "1995"
        },
        {
            question: "Which HTML tag is used for JavaScript?",
            choices: ["<script>", "<js>", "<javascript>", "<code>"],
            answer: "<script>"
        }
    ];

    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

    // Render questions
    questions.forEach((q, qi) => {
        const qDiv = document.createElement("div");
        qDiv.innerHTML = q.question;

        q.choices.forEach(choice => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `q${qi}`;
            input.value = choice;

            // Restore checked state (IMPORTANT for Cypress)
            if (progress[`q${qi}`] === choice) {
                input.setAttribute("checked", "true");
            }

            input.addEventListener("click", () => {
                progress[`q${qi}`] = choice;
                sessionStorage.setItem("progress", JSON.stringify(progress));
            });

            qDiv.appendChild(input);
        });

        questionsDiv.appendChild(qDiv);
    });

    // Restore score if exists
    const storedScore = localStorage.getItem("score");
    if (storedScore !== null) {
        scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
    }

    submitBtn.addEventListener("click", () => {
        let score = 0;

        questions.forEach((q, i) => {
            if (progress[`q${i}`] === q.answer) {
                score++;
            }
        });

        scoreDiv.textContent = `Your score is ${score} out of 5.`;
        localStorage.setItem("score", score);
    });
});






