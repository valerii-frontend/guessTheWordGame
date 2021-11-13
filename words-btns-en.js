const input = document.querySelector(".input");
const find = document.querySelector(".find");
const answer = document.querySelector(".answer");
const newGame = document.querySelector(".new");
const body = document.querySelector("body");
const content = document.querySelector(".content");
// const language = document.querySelector(".language input");
const KEY = "mJUy_-8LKXPIvkpyyASoETkb7hhKW822TQTGJ1_pons";
let word;
let h1 = document.querySelector("h1");
// CLEAR HEADERS FUNC
function clearBody() {
	let h2 = document.querySelector("h2");
	let h3 = document.querySelector("h3");
	if (h3) content.removeChild(h3);
	if (h2) content.removeChild(h2);
}
function getImage() {
	fetch(`https://api.unsplash.com/photos/random?client_id=${KEY}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			let image = data.urls.regular;
			body.style.background = `url("${image}") center/cover no-repeat`;
		});
}
// ANSWER FUNC
function checkTheAnswer() {
	let counter = document.querySelector("h2 strong");
	getImage();
	counter.classList.add("blink");
	setTimeout(() => {
		counter.classList.remove("blink");
	}, 300);
	let info = document.querySelector(".info");
	if (input.value.toLowerCase() == word) {
		clearBody();
		info.classList.add("end");
		h1.classList.add("win");
		h1.classList.add("end");
		h1.innerText = `You guessed! - ${word.toUpperCase()}`;
		info.textContent = "YOU WON! 🎉";
		info.classList.add("win");
		newGame.classList.remove("hide");
		answer.classList.add("hide");
		input.classList.add("hide");
	} else counter.textContent--;
	if (counter.textContent == 0) {
		clearBody();
		info.classList.add("end");
		newGame.classList.remove("hide");
		answer.classList.add("hide");
		input.classList.add("hide");
		h1.classList.add("lose");
		h1.classList.add("end");
		h1.innerText = `The answer was '${word.toUpperCase()}'`;
		info.textContent = `YOU LOSE 😣!`;
		info.classList.add("lose");
	}
}
// RELOAD FUNCTION
function startGame() {
	location.reload();
}
// FIND FUNCTION
function findTheWord() {
	input.classList.remove("start");
	find.classList.add("hide");
	answer.classList.remove("hide");
	input.setAttribute("placeholder", "Enter the answer");
	clearBody();
	word = input.value.toLowerCase();
	let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			let definition =
				String(data[0].meanings[0].definitions[0].definition).slice(0, 1).toUpperCase() +
				String(data[0].meanings[0].definitions[0].definition).slice(1);
			content.insertAdjacentHTML(
				"beforeend",
				`<h3>${definition} <p> Number of letters -  ${word.length} </p></h3>
          <h2>You have a <strong>${word.length}</strong> try</h2>
          <p class='info game'>Type the answer and click <span class='answer'>"ANSWER BUTTON 🔑"</span> or press <span class='key'>"ENTER"</span></p>`
			);
		});
	input.classList.add("game");
	input.value = "";
}
//LOAD FOCUS INPUT
window.addEventListener("load", (event) => {
	input.focus();
	getImage();
});
// START GAME EVENT
find.addEventListener("click", function (e) {
	findTheWord();
	getImage();
});
// LANG TOGGLE
/*
language.addEventListener("change", function (e) {
	const label = document.querySelector(".language label");
	if (this.checked) {
		label.textContent = "RU";
		label.classList.add("ru");
		label.classList.remove("en");
	} else {
		label.textContent = "EN";
		label.classList.add("en");
		label.classList.remove("ru");
	}
});
*/
// GAME ANSWER EVENT
answer.addEventListener("click", checkTheAnswer);
input.addEventListener("keydown", function (e) {
	if (e.code == "Enter" && input.classList.contains("game")) checkTheAnswer();
	if (e.code == "Enter" && input.classList.contains("start")) findTheWord();
});
// NEW GAME
newGame.addEventListener("click", startGame);
