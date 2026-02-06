const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];
let currentQuestion = 0;

function load() {
    showWelcome(questions[currentQuestion]);
}

// Create skip button
const regenButton = document.createElement("button");
regenButton.id = "regen_button";
regenButton.type = "button";
regenButton.textContent = "Regenerate";
regenButton.addEventListener("click", nextQuestion);

// Create restart button
const resetButton = document.createElement("button");
resetButton.id = "reset_button";
resetButton.type = "button";
resetButton.textContent = "Reset"
resetButton.addEventListener("click", reset);


const GENRES = {
    platformer: {
        title: "2D Platformer",
        twists: [
            "But you can't jump",
            "Where you have a grappling hook"
        ]
    },
    farming: {
        title: "Cozy Farming Game",
        twists: [
            "But the animals are raising humans",
            "But the Animals starts to fight you"
        ]
    },
    puzzle: {
        title: "Puzzle Game",
        twists: [
            "But you need to hunt the puzzle pieces"
        ]
    }
}

function getGenre() {
    const genreid = localStorage.getItem('selectedGenre');
    const genre = GENRES[genreid]
    return genre;
}

function gather_data() {
    const genre = getGenre();
    const title = genre.title;
    const randint = getRandomInt(genre.twists.length);
    const twist = genre.twists[randint];
    showResult(title, twist)
    return "platformer"
}
function puzzle() {
    return "puzzle"
}

function genre(form) {
    if (form.platformer.checked) {
        localStorage.setItem('selectedGenre', "platformer")
        gather_data();
    } else if (form.puzzle.checked) {
        localStorage.setItem('selectedGenre', "puzzle")
        gather_data();
    } else if (form.farming.checked) {
        localStorage.setItem('selectedGenre', "farming")
        gather_data();
    }
    return true;
}



function showWelcome() {
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


}
function showResult(genre, twist) {
    const holder = document.getElementById("form_holder");
    holder.innerHTML = `
    <h2>${genre}</h2>
    <h1>${twist}</h1>   
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




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}