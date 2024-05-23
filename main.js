const startBtn = document.getElementsByClassName("startBtn");
const frontstartBtn = startBtn[0];
const mainstartBtn = startBtn[1];
const submitBtn = startBtn[2];
const playagainBtn = startBtn[3];

const Container = document.getElementsByClassName("Container")[0];
const frontPage = document.getElementsByClassName("startingPage")[0];
const categorySelectionPage = document.getElementsByClassName("categorySelection")[0];
const quizPage = document.getElementsByClassName("quizPage")[0];
const resultPage = document.getElementsByClassName("ResultPage")[0];

const Categories = Array.from(document.getElementsByClassName("Category"));
const Questions = document.getElementsByClassName("Question")[0];
const OptionsElmt = Array.from(document.getElementsByClassName("Option"));
const pointsElmt = document.getElementsByClassName("Points")[0];
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
let isCategorySelected = false;
let isOptionSelected = false;
let categoryIndex = 0;
let optionIndex = 0;
let optionTracker = 0;
frontstartBtn.addEventListener('click', () => {
    frontPage.style.transform = 'translateX(-100%)';
    categorySelectionPage.style.transform = 'translateY(0)';
});
mainstartBtn.addEventListener('click', () => {
    if (isCategorySelected) {
        categorySelectionPage.style.transform = 'translateY(-100%)';
        quizPage.style.transform = 'translateX(0%)';
    }
    else {
        alert('Select an Category!');
    }
});
submitBtn.addEventListener('click', () => {
    index++;
    if (isOptionSelected) {
        if (index >= Data[0].Questions.length) {
            checkAnswer(optionIndex);
            setTimeout(() => {
                quizPage.style.scale = "0";
                showResult();
            }, 600);

        }
        else {
            checkAnswer(optionIndex);
            setTimeout(() => {
                quizPage.style.scale = "0";
                setTimeout(nextQuestion, 1000);
            }, 1000);
        }
    }
    else {
        alert('Select an Option!');
    }
});
playagainBtn.addEventListener('click', () => {
    resetQuiz();
});
function startQuiz() {
    initializeCategory();
}

function initializeCategory() {
    Categories.forEach((category, i) => {
        category.innerHTML = Data[i].categoryName;
        category.addEventListener('click' ,() => {
            clearSelected(Categories);
            category.classList.add('selected');
            categoryIndex = i;
            isCategorySelected = true;
            OptionsElmt.forEach((option, i) => {
                Questions.textContent = Data[categoryIndex].Questions[index].question;
                option.textContent = Data[categoryIndex].Questions[index].options[i];
                option.addEventListener('click', () => {
                    clearSelected(OptionsElmt);
                    option.classList.add('selected');
                    optionIndex = i;
                    isOptionSelected = true;
                    console.log(optionIndex);
                });
            });
        });
    });
}

function nextQuestion() {
    clearSelected(OptionsElmt);
    isOptionSelected = false;
    quizPage.style.scale = "1";
    Questions.textContent = Data[categoryIndex].Questions[index].question;
    for (let i = 0; i < OptionsElmt.length; i++) {
        OptionsElmt[i].textContent = Data[categoryIndex].Questions[index].options[i];
    }
}

function showResult() {
    resultPage.style.transform = 'translateX(0%)';
    pointsElmt.textContent = Points;
}

function resetQuiz() {
    Points = 0;
    index = 0;
    questionIndex = 0;
    categoryIndex = 0;
    optionIndex = 0;
    isCategorySelected = false;
    isOptionSelected = false;
    resultPage.style.transform = 'translateX(100%)';
    frontPage.style.transform = 'translateX(0%)';
    quizPage.style.scale = '1';
    quizPage.style.transform = 'translateX(100%)';
    categorySelectionPage.style.transform = 'translateY(-100%)';
    clearSelected(OptionsElmt);
    clearSelected(Categories);
    startQuiz();
}

function clearSelected(Category) {
    for (let j = 0; j < Category.length; j++) {
        Category[j].classList.remove('selected','wrongAnswer', 'correctAnswer');
    }
}

function checkAnswer(optionIndex) {
    if (OptionsElmt[optionIndex].textContent == Data[categoryIndex].Questions[index-1].answer) {
        Points += 25;
        OptionsElmt[optionIndex].classList.add('correctAnswer');
    }
    else {
        OptionsElmt[optionIndex].classList.add('wrongAnswer');
    }
}

startQuiz();