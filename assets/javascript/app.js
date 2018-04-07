$(document).ready(function () {
    const quiz = [
        {
            question: 'What does Rick use to travel between dimensions and universes?',
            options: ['Space Laser', 'Portal Gun', 'Tardis', 'Universe Key'],
            correctAnswer: 'Portal Gun',
            image: './assets/images/portalgun.gif'
        },
        {
            question: 'Who is Morty based on?',
            options: ['Morty Seinfeld', 'Marty McFly', 'Hugo Strange', 'Scott Howard'],
            correctAnswer: 'Marty McFly',
            image: './assets/images/martymclfy.gif'
        },
        {
            question: "Who are Rick's two best friends?",
            options: ['Birdperson and Squanchy', 'Eagleperson and Scrunchy', 'Beakperson and Squinchy', 'Hawkperson and Sqelchy'],
            correctAnswer: 'Birdperson and Squanchy',
            image: './assets/images/birdpersonandsquanchy.jpg'
        },
        {
            question: "What non-human species makes up half of Morty's son?",
            options: ['Gatarama', 'Gurglenstein', 'Gazorpazorp', 'Gaflumarorp'],
            correctAnswer: 'Gazorpazorp',
            image: './assets/images/gazorpazorp.gif'
        },
        {
            question: "What is the Smith's favourite cereal?",
            options: ['Raspberries Rumbles', 'Blueberry Buggles', 'Mango Mungles', 'Strawberry Smiggles'],
            correctAnswer: 'Strawberry Smiggles',
            image: './assets/images/strawberrysmiggles.gif'
        },
        {
            question: 'What word should you never say to a Traflorkian?',
            options: ['Glip-Glop', 'Hello', 'Crunchugle', 'Mimsypop'],
            correctAnswer: 'Glip-Glop',
            image: './assets/images/glipglop.gif'
        },
        {
            question: "What ingredient was taken out from Yummy'Yums?",
            options: ['Clynenol', 'Raspenol', 'Purgenol', 'Hydrophol'],
            correctAnswer: 'Purgenol',
            image: './assets/images/purgenol.gif'
        },
        {
            question: 'What are the "Ball Fondlers"?',
            options: [`Rick and Morty's arch nemisis
            `, `Rick and Morty's most hated TV show
            `, `Rick and Morty's favorite TV show
            `, `A crime fighting team that fights crime
            `],
            correctAnswer: `Rick and Morty's favorite TV show
            `,
            image: './assets/images/ballfondlers.gif'
        },
        {
            question: 'What is the name of the park that Rick builds inside an Australian homeless man??',
            options: ['Anatomy Park', 'Anatomical Fair', 'Anatomy Works', 'Anatomical World'],
            correctAnswer: 'Anatomy Park',
            image: './assets/images/anatomypark.gif'
        },
        {
            question: `What's Rick's catchphrapse?`,
            options: ['Hold on to your butts', 'Mathmatical!', 'Wubba lubba dub dub!', 'Jerry is the best'],
            correctAnswer: 'Wubba lubba dub dub!',
            image: './assets/images/wubbalubbadubdub.gif'
        }
    ];

    let count = 0;
    let currentQuestion;
    let timer = 30;
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

    $(document).on('click', '#restart-button', function() {
        count = 0;
        correct = 0;
        wrong = 0;
        unanswered = 0;

        $('#question').empty();
        $('#correct-answers').empty();
        $('#wrong-answers').empty();
        $('#unanswered-answers').empty();
        $('#restart-button-div').empty();

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
        currentQuestion = quiz[count];
        console.log(currentQuestion);
        $('#timer').text('Time Remaining: 30');
        $('#cromulon-image').html('<img id="cromulon" src="./assets/images/cromulon.png" class="img-fluid" alt="Cromulon">');
        $('#cromulon-text').html('<p>"SHOW ME WHAT YOU GOT"</p>');
        currentQuestion.options.map(option => {
            $('#answers').append(`<div class="multiple-choice" value="${option}"><h4>${option}</h4></div>`);
        });
    }

    function renderWrongAnswerPage() {
        $('#question').empty();
        $('#answers').empty();
        $('#timer').empty();
        $('#cromulon-image').html('<img id="cromulon-splash" src="./assets/images/cromulon.png" class="img-fluid" alt="Cromulon">');
        $('#cromulon-text').html('<p>"DISQUALIFIED!"</p>');
        // $('#result').text('Nope!');
        $('#correct-answer').text(`Corret Answer: ${currentQuestion.correctAnswer}`);
        $('#answer-image').html(`<img id="answer-gif" src=${currentQuestion.image} class="img-fluid" alt=${currentQuestion.correctAnswer}>`);
        runSplash();
        
    }

    function renderCorrectAnswerPage() {
        $('#question').empty();
        $('#answers').empty();
        $('#cromulon-image').html('<img id="cromulon-splash" src="./assets/images/cromulon.png" class="img-fluid" alt="Cromulon">');
        $('#cromulon-text').html('<p>"WINNER!"</p>');
        // $('#result').text('Correct!');
        $('#answer-image').html(`<img id="answer-gif" src=${currentQuestion.image} class="img-fluid" alt=${currentQuestion.correctAnswer}>`);
        runSplash();

    }

    function renderTimesUpPage() {
        $('#question').empty();
        $('#answers').empty();
        $('#timer').empty();
        $('#correct-answer').text(`Corret Answer: ${currentQuestion.correctAnswer}`);
        $('#cromulon-text').html('<p>"DISQUALIFIED!"</p>');
        $('#answer-image').html(`<img id="answer-gif" src=${currentQuestion.image} class="img-fluid" alt=${currentQuestion.correctAnswer}>`);
        runSplash();

    }

    function renderNextQuestion() {
        count++;
        timer = 30;
        clearInterval(splashTimer);
        $('#timer').empty();
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
        $('#question').html('<h1>GAME OVER</h1>');
        $('#correct-answers').text(`Correct: ${correct}`);
        $('#wrong-answers').text(`Wrong: ${wrong}`);
        $('#unanswered-answers').text(`unaswered: ${unanswered}`);
        $('#restart-button-div').html('<button id="restart-button" type="button" class="btn btn-outline-info">START OVER</button>');
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

        $('#timer').text('Time Remaining: ' + timer);

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