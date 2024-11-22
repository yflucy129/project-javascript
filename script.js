const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const backButton = document.getElementById('back-button');

// Initial set of questions and answers
const initialQuestion = {
    question: "Which region of Teyvat would you most like to explore?",
    answers: [
        { text: "Mondstadt – The City of Freedom", next: "mondstadt" },
        { text: "Liyue – The Harbor of Contracts", next: "liyue" },
        { text: "Inazuma – The Land of Eternity", next: "inazuma" }
    ]
};

// Mapping for subsequent questions
const questionMap = {
    mondstadt: {
        question: "What drives your adventures?",
        answers: [
            { text: "A thirst for freedom and exploration", next: "amber" },
            { text: "A sense of duty and protection", next: "jean" }
        ]
    },
    liyue: {
        question: "What best describes your personality?",
        answers: [
            { text: "Resourceful and strategic", next: "zhongli" },
            { text: "Loyal and dedicated to your craft", next: "xiao" }
        ]
    },
    inazuma: {
        question: "How do you handle challenges?",
        answers: [
            { text: "With calm determination", next: "raiden" },
            { text: "With creativity and quick thinking", next: "ayaka" }
        ]
    },

    // Final results
    amber: {
        result: "You are Amber: cheerful, optimistic, and always ready to lend a hand. Your energy brightens everyone's day, and your adventurous spirit knows no bounds!"
    },
    jean: {
        result: "You are Jean: diligent and reliable, you work tirelessly to protect those you care about. Your leadership inspires everyone around you."
    },
    zhongli: {
        result: "You are Zhongli: wise and composed, with a deep respect for tradition and contracts. You value order and uphold your principles with grace."
    },
    xiao: {
        result: "You are Xiao: quiet and reserved, but fiercely loyal to those you protect. Your strength lies in your determination and unwavering dedication."
    },
    raiden: {
        result: "You are Raiden Shogun: calm and calculated, you pursue your goals with precision and authority. Beneath your strength lies a heart that values eternity and balance."
    },
    ayaka: {
        result: "You are Ayaka: elegant and poised, you handle challenges with creativity and grace. Your kindness and charm make you a beloved ally."
    }
};

// Stack to track the user's path for "Go Back" functionality
const questionStack = [];

// Function to render questions dynamically
function renderQuestion(questionData) {
    // Push the question into the stack for navigation
    if (questionData && !questionData.result) {
        questionStack.push(questionData);
    }

    // Show or hide the back button based on stack size
    backButton.style.display = questionStack.length > 1 ? "inline-block" : "none";

    // Clear the container
    questionContainer.innerHTML = "";

    // Check if it's a result
    if (questionData.result) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `<h2>${questionData.result}</h2>`;
        questionContainer.appendChild(resultDiv);
        return;
    }

    // Create question element
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.innerText = questionData.question;
    questionDiv.appendChild(questionText);

    // Create answer buttons
    questionData.answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.innerText = answer.text;
        answerButton.addEventListener('click', () => {
            renderQuestion(questionMap[answer.next]); // Navigate to the next question
        });
        questionDiv.appendChild(answerButton);
    });

    questionContainer.appendChild(questionDiv);
}

// Back button functionality
backButton.addEventListener('click', () => {
    questionStack.pop(); // Remove the current question
    const previousQuestion = questionStack[questionStack.length - 1];
    renderQuestion(previousQuestion);
});

// Start the quiz with the initial question
renderQuestion(initialQuestion);
