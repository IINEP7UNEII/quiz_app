const quizData = 
[
    {
        question: "1. What is the capital of France?",
        choices: ["Paris", "Berlin", "Rome", "Madrid"],
        answer: "Paris"
    },
    {
        question: "2. Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "3. What is the largest mammal?",
        choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        question: "4. What is the proffesor's name?",
        choices: ["Bobby Lee", "Bobby Chan", "Jackie Chan", "Jackie Lee"],
        answer: "Bobby Chan"
    },
    {
        question: "5. What is the class number for this current class?",
        choices: ["CMPT 275", "CMPT 295", "CMPT 213", "CMPT 276"],
        answer: "CMPT 276"
    }
];

var selectedAnswers = 
[
    {
        answer: "",
    },
    {
        answer: "",
    },
    {
        answer: "",
    },
    {
        answer: "",
    },
    {
        answer: "",
    }
];

const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const choiceContainer = document.getElementById("choice-container");
const quizNavigation = document.getElementById("quiz-navigation");
const choices = document.getElementsByClassName("choice-btn");
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

var currentQuestion = 0;
var submited = false;

function startQuiz() 
{
    showQuestion();
    choiceSelector();
    navigationSelector();
}

function navigationSelector() 
{
    document.querySelectorAll('.nav-btn').forEach(function(e) 
    {
        e.addEventListener('click', function() 
        {
            if (currentQuestion == (quizData.length - 2) 
            && selectedAnswers[currentQuestion].answer != "")
            {
                nextButton.innerText = "Submit";
            }

            if (this == nextButton && currentQuestion == (quizData.length - 1)
            && selectedAnswers[currentQuestion].answer != "")
            {
                console.log("submit");
                submited = true;
                console.log(selectedAnswers);
                submit();
            }
            else if (this == nextButton && currentQuestion < (quizData.length - 1) 
            && selectedAnswers[currentQuestion].answer != "")
            {
                ++currentQuestion;
                resetChoiceBtnColor();
                showQuestion();

                if (selectedAnswers[currentQuestion].answer != "")
                {
                    showPreviousChoice();
                }
            }
            else if (this == previousButton && currentQuestion > 0)
            {
                --currentQuestion;
                nextButton.innerText = "Next";
                resetChoiceBtnColor();
                showQuestion();
                showPreviousChoice();
            }
        })
    });
}

function choiceSelector()
{
    document.querySelectorAll('.choice-btn').forEach(function(e) 
    {
        e.addEventListener('click', function() 
        {
            if (selectedAnswers[currentQuestion].answer == "")
            {
                resetChoiceBtnColor();
                selectedAnswers[currentQuestion].answer = this.innerText;
                console.log("Seleted answer: " + selectedAnswers[currentQuestion].answer);
                markAnswer(this);
            }
        })
    });
}

function showQuestion() 
{
    questionText.innerText = quizData[currentQuestion].question

    for (var count = 0; count < quizData[currentQuestion].choices.length; ++count) 
    {
        choices[count].innerText = quizData[currentQuestion].choices[count];
    }
}

function showPreviousChoice() 
{
    for (var count = 0; count < quizData[currentQuestion].choices.length; ++count) 
    {
        if (choices[count].innerText == quizData[currentQuestion].answer)
        {
            choices[count].style.backgroundColor = "#00b82e";
        }

        if (selectedAnswers[currentQuestion].answer == choices[count].innerText
        && choices[count].innerText != quizData[currentQuestion].answer)
        {
            choices[count].style.backgroundColor = "#b30606";
        }
    }
}

function resetChoiceBtnColor()
{
    for (var count = 0; count < quizData[currentQuestion].choices.length; ++count) 
    {
        choices[count].style.backgroundColor = "#3498db";
    }
}

function submit()
{
    questionText.innerText = "Here are the results:";
    choiceContainer.style.display = "none";
    previousButton.style.display = "none";
    nextButton.style.display = "none";
    const score = document.createElement("p");
    questionText.appendChild(score);
    
    score.innerText = "Your score is: " + getTotalScore() + "/" + quizData.length;
}

function markAnswer(btn) 
{
    if (selectedAnswers[currentQuestion].answer == quizData[currentQuestion].answer) 
    {
        console.log("Correct");
        btn.style.backgroundColor = "#00b82e";
    } 
    else 
    {
        btn.style.backgroundColor = "#b30606";

        for (var count = 0; count < quizData[currentQuestion].choices.length; ++count) 
        {
            if (choices[count].innerText == quizData[currentQuestion].answer)
            {
                choices[count].style.backgroundColor = "#00b82e";
            }
            else if (choices[count].innerText == quizData[currentQuestion].answer)
            {
                choices[count].style.backgroundColor = "#00b82e";
            }
            else if (choices[count].innerText == quizData[currentQuestion].answer)
            {
                choices[count].style.backgroundColor = "#00b82e";
            }
            else if (choices[count].innerText == quizData[currentQuestion].answer)
            {
                choices[count].style.backgroundColor = "#00b82e";
            }
        }

        console.log("Incorrect");
    }
}

function getTotalScore()
{
    var score = 0;

    for (var count = 0; count < quizData.length; ++count)
    {
        if (quizData[count].answer == selectedAnswers[count].answer)
        {
            ++score;
        }
    }
    return score;
}

startQuiz();