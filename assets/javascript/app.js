$(document).ready(function () {
    const quiz = [
        {
            question: 'Question 1?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 2?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 3?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 4?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 5?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 6?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 7?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 8?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 9?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        },
        {
            question: 'Question 10?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A'
        }
    ];

    let count = 0;
    let currentQuestion = (quiz[count]);
    let timer = 31;
    let splashTimer = 5;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    let intervalId;
    let splashIntervalId;

    console.log(quiz);
    console.log(quiz[0]);

    $('#start-button').on('click', function () {

        $('#start-button-div').empty();
        $('#question').text(quiz[count].question);

        generateOptions();
        run();

    });

    $(document).on('click', '.multiple-choice', function() {
        console.log($(this).attr('value'));

        let val = $(this).attr('value');
        console.log(val);

        // if (timer === 0) {
        //     stop();
        // }

        if (val !== currentQuestion.correctAnswer) {
            console.log('Wrong!');
            wrong++;
            console.log('correct', correct);
            console.log('wrong', wrong);
            console.log('unanswered', unanswered);
            clearInterval(intervalId);
            renderWrongAnswerPage();
        } 

        else {
            console.log('Correct!');
            correct++;
            console.log('correct', correct);
            console.log('wrong', wrong);
            console.log('unanswered', unanswered);
            
            clearInterval(intervalId);
            renderCorrectAnswerPage();
        }


    });

    function generateOptions() {
        console.log('count: ', count);
        $('#cromulon-image').html('<img src="./assets/images/cromulon.png" class="img-fluid" alt="Cromulon"><p>"SHOW ME WHAT YOU GOT"</p>');
        currentQuestion.options.map(option => {
            $('#answers').append(`<div class="multiple-choice" value="${option}"><h4>${option}</h4></div>`);
        });
    }

    function renderWrongAnswerPage() {
        $('#question').empty();
        $('#answers').empty();
        $('#timer').empty();
        $('#result').text('Nope!');
        $('#correct-answer').text(currentQuestion.correctAnswer);
        runSplash();
    }

    function renderCorrectAnswerPage() {
        $('#question').empty();
        $('#answers').empty();
        $('#result').text('Correct!');
        runSplash();

    }

    function renderTimesUpPage() {
        $('#question').empty();
        $('#answers').empty();
        $('#timer').empty();
        $('#result').text('Times Up!');
        runSplash();

    }

    function renderNextQuestion() {
        count++;
        timer = 31;

        $('#question').empty();
        $('#answers').empty();
        $('#result').empty();
        $('#correct-answer').empty();
        $('#answer-image').empty();

       if (count < quiz.length) {
        $('#question').text(quiz[count].question);

        generateOptions();
        run();
       }

       else {
        $('#question').text('Game Over');
       }


    }


    function run() {
        intervalId = setInterval(decrement, 1000);
    }

    function runSplash() {
        clearInterval(splashTimer);
        splashTimer = 5;
        splashIntervalId = setInterval(splashDecrement, 1000);
        
    }

    function decrement() {

        timer--;

        $('#timer').html('<h4>Time Remaining: ' + timer + '</h4>');

        if (timer === 0) {
            unanswered++;
            console.log('correct', correct);
            console.log('wrong', wrong);
            console.log('unanswered', unanswered);
            stop();
            renderTimesUpPage();
        }
    }

    function splashDecrement() {

        splashTimer--;
        console.log('splashTimer: ', splashTimer);

        if (splashTimer === 0) {
            clearInterval(splashIntervalId);
            renderNextQuestion();
        }
    }

    function stop() {

        clearInterval(intervalId);
        timer = 30;
    }

});