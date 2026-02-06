const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];
let currentQuestion = 0;

function load() {
    showWelcome(questions[currentQuestion]);
}

// Create skip button
const skipButton = document.createElement("button");
skipButton.id = "skip_button";
skipButton.type = "button";
skipButton.textContent = "Skip";
skipButton.addEventListener("click", nextQuestion);

// Create restart button
const resetButton = document.createElement("button");
resetButton.id = "reset_button";
resetButton.type = "button";
resetButton.textContent = "Reset"
resetButton.addEventListener("click", reset);


function platformer(){
    return "platformer"
}
function puzzle(){
    return "puzzle"
}

function genre(form){
    if (form.platformer.checked) {
        platformer();
    } else if(form.puzzle.checked){
        puzzle();
    }
    return true;
}



function showWelcome(){
    const holder = document.getElementById("form_holder");
    const template = document.getElementById("welcome_page");

    holder.replaceChildren(template.content.cloneNode(true));
}

function reset() {
    currentQuestion = 0;
    showQuestion(questions[currentQuestion]);
}
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion(questions[currentQuestion]);
    } else {
        showResult();
    }
}

function showQuestion(id) {
    const holder = document.getElementById("form_holder");
    const template = document.getElementById(id);

    holder.replaceChildren(template.content.cloneNode(true));
    const radioDiv = document.getElementById("radio_div");
    const optionCount = radioDiv.querySelectorAll('input[type="radio"]').length;

    if (optionCount > 4) {
        radioDiv.classList.add("two-columns");
    }
    holder.appendChild(skipButton);


}
function showResult() {
    const scores = getScores();

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    const [winner, winnerScore] = sorted[0];
    const [runnerUp] = sorted[1];

    const result = ENGINE_DESCRIPTIONS[winner];
    const holder = document.getElementById("form_holder");
    holder.innerHTML = `
    <h2>Your Top Pick</h2>
    <h1>${result.title}</h1>
    <p>${result.description}</p>
    <h2>Alternative</h2>
    <h1>${ENGINE_DESCRIPTIONS[runnerUp].title}</h1>
    <p>${ENGINE_DESCRIPTIONS[runnerUp].description}</p>
`;
    holder.appendChild(resetButton);
    const disclaimerTitle = document.createElement("h2");
    disclaimerTitle.id = "disclaimer";
    disclaimerTitle.textContent = "Disclaimer";

    const disclaimerText = document.createElement("p");
    disclaimerText.textContent =
        "This is an opinionated tool, not a rulebook. It’s meant to give you a good starting point. Thanks for checking in!";

    holder.appendChild(disclaimerTitle);
    holder.appendChild(disclaimerText);
}

function showEmail() {
  const emailSpan = document.getElementById("email");
  const button = document.getElementById("contact_button");

  emailSpan.textContent = "contact.sture@gmail.com";
  emailSpan.style.display = "block";
  button.style.display = "none";
}




