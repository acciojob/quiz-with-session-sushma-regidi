document.addEventListener("DOMContentLoaded", () => {
    const questionsContainer = document.getElementById("questions");
    const submitBtn = document.getElementById("submit");
    const scoreDiv = document.getElementById("score");

    // Quiz data (5 questions, 4 options each)
    const quizData = [
        {
            question: "What is 2 + 2?",
            options: ["1", "2", "3", "4"],
            answer: "3"
        },
        {
            question: "Capital of India?",
            options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
            answer: "1"
        },
        {
            question: "Which is a JavaScript framework?",
            options: ["React", "Laravel", "Django", "Flask"],
            answer: "0"
        },
        {
            question: "HTML stands for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyperlinks Text Mark Language",
                "None"
            ],
            answer: "0"
        },
        {
            question: "Which keyword declares a variable in JS?",
            options: ["int", "var", "string", "float"],
            answer: "1"
        }
    ];

    // Load saved progress from sessionStorage
    const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

    // Render questions
    quizData.forEach((q, qIndex) => {
        const div = document.createElement("div");

        const questionTitle = document.createElement("p");
        questionTitle.textContent = q.question;
        div.appendChild(questionTitle);

        q.options.forEach((opt, optIndex) => {
            const label = document.createElement("label");
            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = `q${qIndex}`;
            radio.value = optIndex;

            // Restore checked state
            if (savedProgress[`q${qIndex}`] === String(optIndex)) {
                radio.checked = true;
            }

            // Save selection to sessionStorage
            radio.addEventListener("change", () => {
                savedProgress[`q${qIndex}`] = radio.value;
                sessionStorage.setItem("progress", JSON.stringify(savedProgress));
            });

            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            div.appendChild(label);
            div.appendChild(document.createElement("br"));
        });

        questionsContainer.appendChild(div);
    });

    // Restore score from localStorage (if exists)
    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
        scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
    }

    // Submit handler
    submitBtn.addEventListener("click", () => {
        let score = 0;

        quizData.forEach((q, index) => {
            if (savedProgress[`q${index}`] === q.answer) {
                score++;
            }
        });

        scoreDiv.textContent = `Your score is ${score} out of 5.`;
        localStorage.setItem("score", score);
    });
});





