const frontstartBtn = document.getElementsByClassName('startBtn')[0];
const mainstartBtn = document.getElementsByClassName('startBtn')[1];
const submitBtn = document.getElementsByClassName('startBtn')[2];
const playagainBtn = document.getElementsByClassName('startBtn')[3];
const Container = document.getElementsByClassName("Container")[0];
const frontPage = document.getElementsByClassName("startingPage")[0];
const categorySelectionPage = document.getElementsByClassName("categorySelection")[0];
const quizPage = document.getElementsByClassName("quizPage")[0];
const resultPage = document.getElementsByClassName("ResultPage")[0];
const Category = document.getElementsByClassName("Category");
const Questions = document.getElementsByClassName("Question");
const OptionsElmt = document.getElementsByClassName("Option");
const Data = {
    0: {
        categoryName: "Computer",
        Questions: [
            {
                question: "What does CPU stand for?",
                options: ["A. Central Processing Unit", "B. Computer Personal Unit", "C. Central Processor Unit", "D. Central Personal Unit"],
                answer: "A. Central Processing Unit"
            },
            {
                question: "What is the main function of the ALU in a computer?",
                options: ["A. Storage", "B. Arithmetic and Logic Unit", "C. Input/Output", "D. Control Unit"],
                answer: "B. Arithmetic and Logic Unit"
            },
            {
                question: "Which one is a programming language?",
                options: ["A. HTML", "B. CSS", "C. Python", "D. HTTP"],
                answer: "C. Python"
            },
            {
                question: "What does RAM stand for?",
                options: ["A. Read Access Memory", "B. Random Access Memory", "C. Run Access Memory", "D. Real Access Memory"],
                answer: "B. Random Access Memory"
            }
        ]
    },
    1: {
        categoryName: "Animals",
        Questions: [
            {
                question: "What is the largest land animal?",
                options: ["A. Elephant", "B. Rhino", "C. Hippo", "D. Giraffe"],
                answer: "A. Elephant"
            },
            {
                question: "Which animal is known as the King of the Jungle?",
                options: ["A. Tiger", "B. Lion", "C. Bear", "D. Wolf"],
                answer: "B. Lion"
            },
            {
                question: "What is the fastest land animal?",
                options: ["A. Lion", "B. Tiger", "C. Cheetah", "D. Leopard"],
                answer: "C. Cheetah"
            },
            {
                question: "Which animal is known for its ability to change colors?",
                options: ["A. Octopus", "B. Squid", "C. Chameleon", "D. Frog"],
                answer: "C. Chameleon"
            }
        ]
    },
    2: {
        categoryName: "Anime",
        Questions: [
            {
                question: "Who is the main character in 'Naruto'?",
                options: ["A. Naruto Uzumaki", "B. Sasuke Uchiha", "C. Sakura Haruno", "D. Kakashi Hatake"],
                answer: "A. Naruto Uzumaki"
            },
            {
                question: "In 'Dragon Ball Z', who is Goku's main rival?",
                options: ["A. Frieza", "B. Vegeta", "C. Cell", "D. Piccolo"],
                answer: "B. Vegeta"
            },
            {
                question: "Which anime features the character Monkey D. Luffy?",
                options: ["A. Bleach", "B. Naruto", "C. One Piece", "D. Fairy Tail"],
                answer: "C. One Piece"
            },
            {
                question: "What is the name of the alchemist brothers in 'Fullmetal Alchemist'?",
                options: ["A. Roy and Hughes Mustang", "B. Edward and Alphonse Elric", "C. Maes and Alex Armstrong", "D. Hohenheim and Trisha Elric"],
                answer: "B. Edward and Alphonse Elric"
            }
        ]
    }
};
let Points = 0;
let index = 0;
let questionIndex = 0;
let isCategorySelected = true;
let isOptionSelected = true;
let categoryIndex = 0;
let optionIndex = 0;
frontstartBtn.addEventListener('click', () => {
    frontPage.style.display = 'none';
    categorySelectionPage.style.display = 'flex';
});
mainstartBtn.addEventListener('click', () => {
    categorySelectionPage.style.display = 'none';
    quizPage.style.display = 'flex';
});
submitBtn.addEventListener('click', () => {
    index++;
    if (index >= Data[0].Questions.length) {
        showResult();
    }
    else {
        nextQuestion();
    }
    
});
playagainBtn.addEventListener('click', () => {
    resetQuiz();
});
function startQuiz() {
    initializeQuiz();
}

function initializeQuiz() {
    let prevOption = 0;
    for (let i = 0; i < Category.length; i++) {
        Category[i].classList.remove('selected');
        Category[i].innerHTML = Data[i].categoryName;
        Category[i].addEventListener('click', () => {
            Category[i].classList.add('selected');
            categoryIndex = i;
            Questions[0].textContent = Data[categoryIndex].Questions[index].question;
            for (let i = 0; i < OptionsElmt.length; i++) {
                OptionsElmt[i].classList.remove('selected');
                OptionsElmt[i].textContent = Data[categoryIndex].Questions[index].options[i];
                OptionsElmt[i].addEventListener('click', () => {
                    prevOption = i;
                    if (isOptionSelected) {
                        OptionsElmt[i].classList.add('selected');
                        isOptionSelected = false;
                    }
                });
            }
        });
    }
}

function nextQuestion() {
    isOptionSelected = true;
    Questions[0].textContent = Data[categoryIndex].Questions[index].question;
    for (let i = 0; i < OptionsElmt.length; i++) {
        OptionsElmt[i].classList.remove('selected');
        OptionsElmt[i].textContent = Data[categoryIndex].Questions[index].options[i];
        OptionsElmt[i].addEventListener('click', () => {
            if (isOptionSelected)
                OptionsElmt[i].classList.add('selected');
                isOptionSelected = false;
        });
    }
}

function showResult() {
    quizPage.style.display = 'none';
    resultPage.style.display = 'flex';
}

function resetQuiz() {
    Points = 0;
    index = 0;
    questionIndex = 0;
    isCategorySelected = true;
    isOptionSelected = true;
    categoryIndex = 0;
    optionIndex = 0;
    for (let i = 0; i < Category.length; i++) {
        Category[i].classList.remove('selected');
    }
    for (let i = 0; i < OptionsElmt.length; i++) {
        OptionsElmt[i].classList.remove('selected');
    }
    resultPage.style.display = 'none';
    frontPage.style.display = 'flex';
    startQuiz();    
}

startQuiz();