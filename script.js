const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');



//Make an array of object that stores Q.w, ans, and choices
const quiz = [
    {
        question: "Q.1 Which of the following is not a Css box model property?",
        choices:["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q.2 Which of the following is not a valid way to declair a function in JavaScript",
        choices: ["function myFunction() {}", "let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object","It refers to the window object", "It used for comments" ],
        answer: "It refers to the current object"
    }
]

//Make Variable to track the indexing of array 0 is 1st index and 1 Q.w
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

//Arrow fun to show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails. question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

//Function to check answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
         displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
         displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;

    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        showScore();
        stopTimer();
    }
}

 //Function to show the score
  const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `Your Scored ${score} out of ${quiz.length}!`
    nextBtn.textContent = "Play Again";
    quizOver = true;
    displayAlert("You have completed this quiz");
    timer.style.display = 'none';
    
  }

  // Function to show alert
  const displayAlert = (msg) => {
    alert.style.display = 'block';
      alert.textContent = msg; 
    setTimeout(() => {
       alert.style.display = 'none'
    }, 2000)
    
  }

  // function to startTimer
  const startTimer = () => {  //check for any exixt timer
    clearInterval(timerID);
    timer.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;  
        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!!! Do you want to play quiz again");
            if (confirmUser) {
                timeLeft = 15;
                startQuiz();
            } else {
                startBtn.style.display = 'block';
                container.style.display = 'none';
            }
        }
    }
   timerID = setInterval(countDown, 1000);
  }

  //Function to stop Timer
  const stopTimer = () => {
      clearInterval(timerID);
  }

  // Fuction to shuffle question
  const shuffleQuestuons = () => {
    for (let i = quiz.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
  }

 // function to start quiz
  const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    // showQuestions();
    shuffleQuestuons();
  }



  //Adding event listner on statrtbtn to start
  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    container.style.display = 'block';
     startQuiz();
  })
  

//beacuse we want to show our question without click next so call the function before el
 // showQuestions();

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        // showQuestions();
        startQuiz();
        
    }
    else {
        checkAnswer();
    }
});