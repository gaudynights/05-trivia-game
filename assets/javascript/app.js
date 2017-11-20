var score = 0;
var gameOver = false;

//question array - correct answers have a value of 1
var questionArray = [{
        "question": "1. Where did Barry go to school?",
        "answers": [
            ["Hogwarts", "0"],
            ["UT", "0"],
            ["Wesleyan", "1"],
            ["Madame Cromwell's finishing school for wayward boys", "0"],
        ]
    }, {
        "question": "2. What did Barry spend the most money on this month?",
        "answers": [
            ["Food", "0"],
            ["Alcohol", "0"],
            ["John Varvatos", "1"],
            ["Rent", "0"],
        ]
    }, {
        "question": "3. What's Barry's favorite font?",
        "answers": [
            ["Helvetica", "0"],
            ["Comic-Sans", "1"],
            ["Arial", "0"],
            ["Futura-Sans", "0"],
        ]
    }, {
        "question": "4. What's Barry's summer camp?",
        "answers": [
            ["Camp Firewood", "0"],
            ["Camp Nowhere", "0"],
            ["Grandma's house", "0"],
            ["Camp Mah-Kee-Nac", "1"],
        ]
    }, {
        "question": "5. Where is Barry?",
        "answers": [
            ["Getting a haircut", "1"],
            ["Working out", "0"],
            ["Arguing with someone", "0"],
            ["Grandma's house", "0"],
        ]
    }, {
        "question": "6. What is Barry's ringtone?",
        "answers": [
            ["Something professional", "0"],
            ["Something tasteful", "0"],
            ["'Lil Jon", "1"],
            ["Something not childish", "0"],
        ]
    }, {
        "question": "7. Is this working out?",
        "answers": [
            ["What?", "0"],
            ["Yes", "0"],
            ["Kinda", "0"],
            ["This is not working out AT ALL", "1"],
        ]
    },
    {
        "question": "8. Is Barry a wizard?",
        "answers": [
            ["Yes", "1"],
            ["Yes", "1"],
            ["Yes", "1"],
            ["Yes", "1"],
        ]
    }
];



function buildQuiz() {
	// clear the game space
    $("#game-space").text("");

    //create timerDiv
    var timerDiv = $("<div>").attr("id", "timer-div");
    // show inital time
    timerDiv.text("Time remaining: 60 seconds!");
    //put timer div in the game space
    $("#game-space").prepend(timerDiv);

    // for loop to make all our questions and answers
    for (var i = 0; i < questionArray.length; i++) {
        //creates the individual question div
        var questionDiv = $("<div>");
        questionDiv.addClass("question-div");

        // set question
        var question = $("<h3>").text(questionArray[i].question);
        //create answer div
        var answerDiv = $("<div>");
        answerDiv.addClass("answer-div");
        //for loop to create and add answers
        for (var k = 0; k < questionArray[i].answers.length; k++) {
            //creates the answer as an input set to radio type
            var answer = $("<span>");
            answer.text(questionArray[i].answers[k][0] + " ");
            //make answers radio 
            var answerBtn = $("<input>").attr("type", "radio").attr("name", "question-" + i).attr("value", questionArray[i].answers[k][1]);
            // add answer btns to answer div
            answerDiv.append(answerBtn);
            // add asnwer to answer div
            answerDiv.append(answer);

        };

        //put answers into question div
        // answerDiv.html();
        questionDiv.append(answerDiv);
        //put question into question div
        questionDiv.prepend(question);
        //adds that question div to the game space
        $("#game-space").append(questionDiv);

    }
    // create done button
    var endBtn = $("<button>").text("All done!").attr("id", "end-btn");
    // add done button to the game space
    $("#game-space").append(endBtn);

    // start timer
    timer.start();
};

function endGame() {
    // console.log("running endGame");
    // stop the timer
    gameOver = true;
    clearInterval(intervalId);

    //look at all the checked vals and add them to the score 
    $("input:checked").each(function(index, element) {
        score += parseInt($(element).val());
    });

    //clear game space
    $("#game-space").empty();
    //create score div
    var scoreDiv = $("<div>").html(
        `<h2>Let's see how you did...</h2> <h3>You got ${score} right!</h3>`);
    scoreDiv.addClass("score-div");

    // add score div to th game space
    $("#game-space").append(scoreDiv);
    // show happy or sad image depending on score
    if (score > 4) {
        var endImg = $("<img>").attr("src", "assets/images/happy-barry.png").attr("style", "width:300px");
        $("#game-space").append(endImg);
    } else {
        var endImg = $("<img>").attr("src", "assets/images/you-didnt-say-the-magic-word.gif").attr("style", "width:300px");
        $("#game-space").append(endImg);

    };
    var brk = $("<br>");

    $("#game-space").append(brk);

    var startOver = $("<button>").text("Try again!").attr("id", "refresh-btn").attr("onClick", "window.location.reload()");

    $("#game-space").append(startOver);

};


// when you click the start button, build the quiz
$("#start-btn").on("click", function(event) {
    buildQuiz();
});

// add funtionality to end button
// not this way because the button didnt exist when the page was created
// $("#end-btn").on("click",function(event){ endGame()x;});
// this way instead:
$(document).on("click", "#end-btn", endGame);



// a timer 
var intervalId;
var clockRunning = false;

var timer = {
    time: 60,
    start: function() {
        if (!clockRunning) {
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
        }

    },
    count: function() {
        //stop when it hits 0 or gameOver cuz user clicked done button
        if (timer.time <= 0 && gameOver == false) {
            clearInterval(intervalId);
            alert("Time's up!");
            endGame();
        } else if (timer.time<12) {
            //decrement time by 1
            timer.time--;
            // make the timer red
            $("#timer-div").attr("style","background:red;color:white")
            $("#timer-div").text("Time remaining: " + timer.time + " seconds!");
        }

        else {
            //decrement time by 1
            timer.time--;
            $("#timer-div").text("Time remaining: " + timer.time + " seconds!");
        }

    }

   

}; //end of timer object


// a done button

// if timer=0 or user clicks done, kick off SCORE function

// SCORE - 

// replace the html in "game-space"

