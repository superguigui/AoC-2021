import t from './input.txt?raw';
import './styles.css';

const cont = document.getElementById('app');
const input = t.split('\n').map((a) => a.split(''));
const [h, w] = [input.length, input[0].length];
debug(input);

let count = 0;
// for (let i = 0; i < 100; i++) {
// 	step();
// 	debug(input);
// }
// console.log({firstStar: count});

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function firstStar() {
	for (let i = 0; i < 100; i++) {
		step();
		debug(input);
    await sleep(10);
	}
	console.log({ firstStar: count });
}

async function secondStar() {
	let i = 0;
	while (!isSynced()) {
		step();
		debug(input);
		i++;
		await sleep(30);
	}
	console.log({ secondStar: i });
}

secondStar();

function debug(arr) {
	cont.innerHTML = arr
		.map((a) =>
			a.map((b) => '<span class="c' + b + '">' + b + '</span>').join('')
		)
		.join('<br>');
}

function step() {
	for (let y = 0; y < w; y++) {
		for (let x = 0; x < h; x++) {
			const c = input[y][x];
			if (c === 9) flash(y, x);
			else if (c > -1) input[y][x]++;
		}
	}
	for (let y = 0; y < w; y++) {
		for (let x = 0; x < h; x++) {
			if (input[y][x] === -1) input[y][x] = 0;
		}
	}
}

function getNeighbors(y, x) {
	const res = [];

	if (y > 0 && x > 0) res.push([y - 1, x - 1]);
	if (y > 0) res.push([y - 1, x]);
	if (y > 0 && x < w - 1) res.push([y - 1, x + 1]);

	if (x > 0) res.push([y, x - 1]);
	if (x < w - 1) res.push([y, x + 1]);

	if (y < h - 1 && x > 0) res.push([y + 1, x - 1]);
	if (y < h - 1) res.push([y + 1, x]);
	if (y < h - 1 && x < w - 1) res.push([y + 1, x + 1]);

	return res;
}

function flash(y, x) {
	count++;
	input[y][x] = -1;
	getNeighbors(y, x).forEach(([y1, x1]) => {
		const n = input[y1][x1];
		if (n >= 0 && n < 9) input[y1][x1]++;
		else if (n === 9) flash(y1, x1);
	});
}

function isSynced() {
	return (
		input
			.map((a) => a.join(''))
			.join('')
			.replace(/0/g, '').length === 0
	);
}
