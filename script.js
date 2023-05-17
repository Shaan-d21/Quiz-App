// Getting All Required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector(".timer .timer_text");

// Creating an array and passing the numbers, questions, options, and answers
let questions = [
    {
        numb: 1,
        question: "Which of the following is a valid variable name in Python?",
        answer: "variable_1",
        options: [
            "1variable",
            "variable_1",
            "variable one",
            "variable one"
        ]
    },
    {
        numb: 2,
        question: "What is the correct way to define a function in python?",
        answer: "def myFunction()",
        options: [
            "function myFunction()",
            "define myFunction()",
            "def myFunction()",
            "myFunction()"
        ]
    },
    {
        numb: 3,
        question: "Which of the following is not a valid way to create a tuple in Python?",
        answer: "x = [1,2,3]",
        options: [
            "x =(1,2,3)",
            "x = 1,2,3",
            "tuple([1,2,3])",
            "x = [1,2,3]"
        ]
    },
    {
        numb: 4,
        question: "What is the correct way to create an empty list in Python?",
        answer: "Both a and b",
        options: [
            "x = []",
            "x = list()",
            "x = {}",
            "Both a and b"
        ]
    },
    {
        numb: 5,
        question: "Which of the following is not a valid way to create a set in Python?",
        answer: "x = {}",
        options: [
            "x = set()",
            "x = {}",
            "x = {1,2,3}",
            "x = set([1,2.3])"
        ]
    },
]

// If Start Quiz button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Show the info box
}

// If Exit button Clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide the info box
}

// If Continue button Clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;
    showQuestions(que_count);
    queCounter(que_count + 1);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
}

quit_quiz.onclick = () => {
    window.location.reload();
}

// If Next Buton clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        showQuestions(que_count);
        queCounter(que_count + 1);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed !!");
        showResultBox();
    }

}


// Getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + '. ' + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore)
        answer.classList.add("correct");
        console.log("Correct Answer");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else {
        answer.classList.add("wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        console.log("Wrong Answer");

        // If answer is incorrect then automatically select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    // Once user Selected disabled all option
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); // Hide Info Box
    quiz_box.classList.remove("activeQuiz"); // Hide Quiz Box
    result_box.classList.add("activeResult") // Show Result Box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag = '<span>and Congrats! 😎 You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
        result_box.querySelector(".icon").innerHTML = '<iframe src="https://embed.lottiefiles.com/animation/107653"></iframe>';
    }
    else if (userScore > 1) {
        let scoreTag = '<span>and nice, 😃 You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
        result_box.querySelector(".icon").innerHTML = '<iframe src="https://embed.lottiefiles.com/animation/14595"></iframe>';
    }
    else {
        let scoreTag = '<span>and sorry,😓 You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
        result_box.querySelector(".icon").innerHTML = '<iframe src="https://embed.lottiefiles.com/animation/84655"></iframe>';
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timeOff.textContent = "Time Out";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}
function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}