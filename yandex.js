fetch(
	"https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20211111T195052Z.bfd523b03f8031e0.41ccadd0d30a6acf8a0b9c26d198070f209e05a4&lang=ru-en&text=а*&ui=ru&FAMILY=0x0001"
)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		console.log(`${def[0].text}(${def[0].ts})`);
		data.def.forEach((def) => {
			console.log(`${def.text} + def.tr`);
		});
	});
// forEach((element, i) => {
//   console.log(`${i + 1} - ${element.text} (${element.mean} )`);
// });
