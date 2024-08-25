let mono = document.querySelector('#mono')
let movement = 1;
let winH = window.innerHeight;
let winW = window.innerWidth;
let objH = mono.clientHeight;
let objW = mono.clientWidth;

var Keys = {
	up: false,
	down: false,
	left: false,
	right: false
};

// Set player position on load
window.addEventListener('load', () => {
	mono.style.position = 'absolute';
	mono.style.top = '45vh'; // 50vh - (objH / 2)
	mono.style.left = '48.5vw'; // 50vh - (objW / 2)
});

// Key codes
// W -> 87 / A -> 65 / S -> 83 / D -> 68
// Up -> 38 / Left -> 37 / Down -> 40 / Right -> 39

/* window.addEventListener('keyup', (e) => {
	var kc = e.key;
	e.preventDefault();

	if (kc == 'ArrowLeft' || kc === 65)
		Keys.left = false;
	else if (kc == 'ArrowUp' || kc === 87)
		Keys.up = false;
	else if (kc == 'ArrowRight' || kc === 68)
		Keys.right = false;
	else if (kc == 'ArrowDown' || kc === 83)
		Keys.down = false;
}); */

// Working eventListener but its handling is very simple
window.addEventListener('keydown', (e) => {
	var kc = e.key;
	var x = parseInt(mono.style.left);
	var y = parseInt(mono.style.top);
	console.log(y)
	e.preventDefault();

	if (kc == 'ArrowUp')
		Keys.up = true;  // only one key per event
	if (kc == 'ArrowDown')
		Keys.down = true;    // so check exclusively

	if (kc == 'ArrowLeft')
		Keys.left = true;
	if (kc == 'ArrowRight')
		Keys.right = true;

	switch (kc) {
		case 'ArrowLeft':
			//while (Keys.left)
			if (x - movement >= 0)
				mono.style.left = (x - movement) + 'vw';
			break;
		case 'ArrowRight':
			//while (Keys.right)
			if (x + movement <= 100 - 3)
				mono.style.left = (x + movement) + 'vw';
			break;
		case 'ArrowUp':
			//while (Keys.up)
			if (y - movement >= 0)
				mono.style.top = (y - movement) + 'vh';
			break;
		case 'ArrowDown':
			//while (Keys.down)
			if (y + movement <= 100 - 10)
				mono.style.top = (y + movement) + 'vh';
			break;
	}
});
