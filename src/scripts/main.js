CORRECT_WAIT_SECONDS = 5500;
WRONG_WAIT_SECONDS = 4500;

points = 0;
currentQuestion = 0;
questions = this.shuffleArray(new Questions().get());
n_questions = questions.length;

function init() {
   alert('Reverte ya está mayor y le cuesta recordar lo que quiere decir. ¡Ayúdalo!');
   this.paintQuestion(questions[currentQuestion]);

   document.getElementById('curtain').classList.add('hidden');
}

function nextQuestion() {
  if (currentQuestion < n_questions) {
    this.paintQuestion(questions[currentQuestion]);
  } else {
    let text;
    if (points <= (n_questions / 2)) {
      text = 'Ha completado el juego con una puntuación de solo ' + points + ' puntos de un total de ' + n_questions + '.'
        + ' Mi recomendación es que lea vuesa merced más, para así dejar de ser un analfabeto.';
    } else {
      text = '¡Felicidades! Vuesa merced ha completado el juego con una puntuación de '
        + points + ' puntos de un total de ' + n_questions + '. Sois todo un Reverter.'
    }

    alert(text);
  }
}

function paintQuestion(question) {
  const answers = this.shuffleArray(question.answers);

  const correct = this.correct;
  const wrong = this.wrong;
  const nextQuestion = this.nextQuestion;

  const removeAllListeners = function() {
    let element;
    for (i = 0; i < 4; i++) {
      element = answers_elements[i];
      element.removeEventListener('click', answer_listeners[i]);
    }
  }
  const answer_a_correct = function(event) {
    correct(event, nextQuestion);
    removeAllListeners();
  };
  const answer_b_wrong = function(event) {
    wrong(event, correct_answer, nextQuestion);
    removeAllListeners();
  };
  const answer_c_wrong = function(event) {
    wrong(event, correct_answer, nextQuestion);
    removeAllListeners();
  };
  const answer_d_wrong = function(event) {
    wrong(event, correct_answer, nextQuestion);
    removeAllListeners();
  };

  const answer_wrong_listeners = [
    answer_b_wrong,
    answer_c_wrong,
    answer_d_wrong,
  ];

  let answers_elements = [
    document.getElementById('answer_a'),
    document.getElementById('answer_b'),
    document.getElementById('answer_c'),
    document.getElementById('answer_d'),
  ];
  let answer_listeners = [];
  let correct_answer;

  let i, answer, listener, element;
  for (i = 0; i < 4; i++) {
    answer = answers[i];
    element = answers_elements[i];

    if (answer.correct) {
      element.addEventListener('click', answer_a_correct);
      answer_listeners.push(answer_a_correct);
      correct_answer = answers_elements[i];
    } else {
      listener = answer_wrong_listeners.pop();
      element.addEventListener('click', listener);
      answer_listeners.push(listener);
    }

    //SetUpElement
    element.classList.remove('green');
    element.classList.remove('red');
    element.innerHTML = answer.text;
  }

  document.getElementById('question').innerHTML = question.text;
}

function correct(event, nextQuestion) {
  event.target.classList.add('green');

  new Audio('audios/correct.wav').play(); // 5 seconds

  points++;

  document.getElementById('points').innerHTML = points;

  setTimeout(function(){
    currentQuestion++;
    this.nextQuestion();
  }, CORRECT_WAIT_SECONDS);
}

function wrong(event, correct_answer, nextQuestion) {
  event.target.classList.add('red');
  correct_answer.classList.add('green');

  new Audio('audios/wrong.wav').play(); // 3.5 - 4 seconds

  setTimeout(function(){
    currentQuestion++;
    this.nextQuestion();
  }, WRONG_WAIT_SECONDS);
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

window.onload = init;
