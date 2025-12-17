document.addEventListener("DOMContentLoaded", () => {
    const questionsDiv = document.getElementById("questions");
    const submitBtn = document.getElementById("submit");
    const scoreDiv = document.getElementById("score");

    // IMPORTANT: Use questions provided by Cypress / HTML
    const quizQuestions = window.questions;

    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

    // Render questions
    quizQuestions.forEach((q, qIndex) => {
        const qDiv = document.createElement("div");
        qDiv.textContent = q.question;

        q.choices.forEach((choice, cIndex) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `q${qIndex}`;
            input.value = choice;

            // Restore checked state (Cypress checks attribute!)
            if (progress[`q${qIndex}`] === choice) {
                input.setAttribute("checked", "true");
            }

            input.addEventListener("click", () => {
                progress[`q${qIndex}`] = choice;
                sessionStorage.setItem("progress", JSON.stringify(progress));
            });

            qDiv.appendChild(input);
        });

        questionsDiv.appendChild(qDiv);
    });

    // Restore score if exists
    const storedScore = localStorage.getItem("score");
    if (storedScore !== null) {
        scoreDiv.textContent = `Your score is ${storedScore} out of ${quizQuestions.length}.`;
    }

    submitBtn.addEventListener("click", () => {
        let score = 0;

        quizQuestions.forEach((q, i) => {
            if (progress[`q${i}`] === q.answer) {
                score++;
            }
        });

        scoreDiv.textContent = `Your score is ${score} out of ${quizQuestions.length}.`;
        localStorage.setItem("score", score.toString());
    });
});








