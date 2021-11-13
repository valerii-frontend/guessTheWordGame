const input = document.querySelector(".input");
const find = document.querySelector(".find");
const answer = document.querySelector(".answer");
const newGame = document.querySelector(".new");
const body = document.querySelector("body");
const content = document.querySelector(".content");
const language = document.querySelector(".language input");
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
function getImage() {
	let random = Math.floor(Math.random() * 10);
	let randomW = Math.floor(Math.random() * 10);
	let image = `https://picsum.photos/80${random}/60${randomW}`;
	body.style.backgroundImage = `url("${image}")`;
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
		h1.innerText = `ЗАГАДАННОЕ СЛОВО! - ${word.toUpperCase()}`;
		info.textContent = "ТЫ ВЫИГРАЛ! 🎉";
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
		h1.innerText = `ПРАВИЛЬНЫЙ ОТВЕТ - '${word.toUpperCase()}'`;
		info.textContent = `ТЫ ПРОИГРАЛ 😣!`;
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
	input.setAttribute("placeholder", "Введите ответ");
	clearBody();
	word = input.value.toLowerCase();
	let url = `https://api.dictionaryapi.dev/api/v2/entries/ru/${word}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			let definition =
				String(data[0].meanings[0].definitions[0].definition).slice(0, 1).toUpperCase() +
				String(data[0].meanings[0].definitions[0].definition).slice(1);
			content.insertAdjacentHTML(
				"beforeend",
				`<h3>${definition} <p> Количество букв -  ${word.length} </p></h3>
          <h2>Осталось <strong>${word.length}</strong> попыток</h2>
          <p class='info game'>Введите ответ и нажмите <span class='answer'>"ОТВЕТИТЬ 🔑"</span> или нажмите <span class='key'>"ENTER"</span></p>`
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
// GAME ANSWER EVENT
answer.addEventListener("click", checkTheAnswer);
input.addEventListener("keydown", function (e) {
	if (e.code == "Enter" && input.classList.contains("game")) checkTheAnswer();
	if (e.code == "Enter" && input.classList.contains("start")) findTheWord();
});
// NEW GAME
newGame.addEventListener("click", startGame);
// LANG TOGGLE

function langToggle() {
	let langs = language.querySelectorAll("span");
	langs.forEach((lang) => {
		if (lang.classList.contains("hide")) {
			lang.classList.remove("hide");
		} else {
			lang.classList.add("hide");
		}
	});
}
language.addEventListener("mouseenter", function (e) {
	langToggle();
	language.style.opacity = 1;
});
language.addEventListener("mouseleave", function (e) {
	language.style.opacity = 0.5;
	langToggle();
});
