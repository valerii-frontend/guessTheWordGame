const input = document.querySelector("#input");
const body = document.querySelector("body");
let text;
function clearBody() {
	let h2 = document.querySelector("h2");
	let h3 = document.querySelector("h3");
	if (h3) body.removeChild(h3);
	if (h2) body.removeChild(h2);
}
input.addEventListener("keydown", function (e) {
	if (e.code == "Enter") {
		clearBody();
		text = this.value.toLowerCase();
		let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) =>
				body.insertAdjacentHTML(
					"beforeend",
					`<h3>${data[0].meanings[0].definitions[0].definition} <p> Number of letters -  ${text.length} </p></h3>
          <h2>You have a <strong>${text.length}</strong> try</h2>
          <p class='info'>Type the answer and press "SPACE"</p>`
				)
			);
		input.classList.add("game");
		this.value = "";
	}
	if (e.code == "Space") {
		let info = document.querySelector(".info");
		if (input.value == text) {
			info.textContent = "YOU WON!";
			input.style.background = "rgb(175, 255, 175)";
			info.style.background = "rgb(175, 255, 175)";
		}
		let counter = document.querySelector("h2 strong");
		counter.textContent--;
		if (counter.textContent == 0) {
			clearBody();
			info.textContent = "YOU LOSE!";
			input.setAttribute("disabled", "disabled");
			input.style.background = "rgb(255, 175, 175)";
		}
	}
});
