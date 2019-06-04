const NUMQUESTIONS = 10;


let questionsMap = new Map();


let quizSequence = [];


let quizStats = {
  counter: 0,
  correct: 0,
  wrong: 0,
  currentQuestion: 0 };



function quizQuestions() {
  questionsMap.set(1, {
    question: "Fue creada para su uso en los medios impresos de la época y  es sin lugar a duda, una de las mejores tipografías creadas hasta la fecha:",
    a: "Garamond",
    b: "Bodoni",
    c: "Dynamoe",
    d: "Courier",
    answer: "a" });

  questionsMap.set(2, {
    question: "Una de las características más importantes de esta tipografía es la  diferencia entre los palos finos y los grueso:",
    a: "Clarendon",
    b: "Futura",
    c: "Bodoni",
    d: "Baskerville",
    answer: "d" });

  questionsMap.set(3, {
    question: "La característica más importante es la anchura de sus caracteres y los finos remates:",
    a: "Clarendon",
    b: "Bodoni",
    c: "Futura",
    d: "Gill Sans",
    answer: "b" });

  questionsMap.set(4, {
    question: "Hoy día figura en alguno de los logotipos de importantes marcas y periódicos:",
    a: "Clarendon",
    b: "Gill Sans ",
    c: "Futura",
    d: "Helvética",
    answer: "a" });

  questionsMap.set(5, {
    question: "Se fundamenta tomando como base los triángulos, círculos y cuadrados, además tiene una extensa gama de pesos:",
    a: "Gill Sans",
    b: "Futura",
    c: "Helvética",
    d: "Franklin Gothic",
    answer: "b" });

  questionsMap.set(6, {
    question: "Fue diseñada para el metro de Londres:",
    a: "Futura",
    b: "Gill Sans",
    c: "Dynamoe",
    d: "Helvética",
    answer: "b" });

  questionsMap.set(7, {
    question: "Se convirtió en un estándar en la industria tipográfica:",
    a: "Gill Sans",
    b: "Helvética",
    c: "Courier",
    d: "Franklin Gothic",
    answer: "c" });

  questionsMap.set(8, {
    question: "Tiene un uso muy extenso tanto en textos como en titulares, gracias a su limpio diseño y gran legibilidad:",
    a: "Clarendon",
    b: "Futura",
    c: "Courier",
    d: "Helvética",
    answer: "d" });

  questionsMap.set(9, {
    question: "Su robustos caracteres provocan que el texto tenga mayor peso y una apariencia más sólida:",
    a: "Franklin Gothic",
    b: "Dynamoe",
    c: "Futura",
    d: "Bodoni",
    answer: "a" });

  questionsMap.set(10, {
    question: "Es una tipografía Display muy apropiada para publicidad y embalaje:",
    a: "Franklin Gothic",
    b: "Dynamoe",
    c: "Garamond",
    d: "Futura",
    answer: "b" });

}

let questionContainer = document.getElementById("the-question"),
answerA = document.getElementById("first-answer"),
answerB = document.getElementById("second-answer"),
answerC = document.getElementById("third-answer"),
answerD = document.getElementById("fourth-answer"),
scoreCounter = document.getElementById("score-counter");


function determineSequence() {

  for (let [key, value] of questionsMap) {
    quizSequence.push(key);
  }


  function shuffle(array) {
    let currentIndex = array.length,
    temporaryValue,
    randomIndex;


    while (0 !== currentIndex) {


      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;

  }

  quizSequence = shuffle(quizSequence);
}


function getNextQuestion() {

  quizStats.counter++;

  let qn = quizSequence.shift();


  let a = questionsMap.get(qn).a,
  b = questionsMap.get(qn).b,
  c = questionsMap.get(qn).c,
  d = questionsMap.get(qn).d,
  question = questionsMap.get(qn).question;


  questionContainer.textContent = question;
  answerA.textContent = a;
  answerB.textContent = b;
  answerC.textContent = c;
  answerD.textContent = d;


  quizStats.currentQuestion = qn;
}


function addEventListeners() {
  answerA.addEventListener("click", checkTheAnswer);
  answerB.addEventListener("click", checkTheAnswer);
  answerC.addEventListener("click", checkTheAnswer);
  answerD.addEventListener("click", checkTheAnswer);
}


function addDataAttributes() {
  answerA.setAttribute("data-answer", "a");
  answerB.setAttribute("data-answer", "b");
  answerC.setAttribute("data-answer", "c");
  answerD.setAttribute("data-answer", "d");
}


function checkTheAnswer() {

  let givenAnswer = this.dataset.answer,
  correctAnswer = questionsMap.get(quizStats.currentQuestion).answer;


  if (givenAnswer === correctAnswer) {
    quizStats.correct++;
    this.classList.add("correct");
  } else
  {
    quizStats.wrong++;
    this.classList.add("wrong");
  }

  scoreCounter.textContent = quizStats.correct;

 
  if (quizStats.counter < NUMQUESTIONS) {
    setTimeout(clearClasses, 2000);
    setTimeout(getNextQuestion, 2000);
  }
 
  else {
      showTheResults();
    }
}


function clearClasses() {
  answerA.classList.remove("correct", "wrong");
  answerB.classList.remove("correct", "wrong");
  answerC.classList.remove("correct", "wrong");
  answerD.classList.remove("correct", "wrong");
}

function showTheResults() {

  let numCorrect = document.getElementById("num-correct"),
  numWrong = document.getElementById("num-wrong"),
  numTotal = document.getElementById("num-total");


  let correct = quizStats.correct,
  wrong = quizStats.wrong,
  total = NUMQUESTIONS;

  numCorrect.textContent = correct;
  numWrong.textContent = wrong;
  numTotal.textContent = total;

  document.getElementsByClassName("results-container")[0].classList.add("display");
}


(function startQuiz() {

  quizQuestions();
  determineSequence();
  getNextQuestion();
  addEventListeners();
  addDataAttributes();
})();