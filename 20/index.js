import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
let [algo, _, ...img] = data;

function read(image, x, y, pad) {
	let s = '';
	for (let dy = -1; dy <= 1; dy++) {
		for (let dx = -1; dx <= 1; dx++) s += image[y + dy]?.[x + dx] ?? pad;
	}
	return parseInt(s.replace(/#/g, 1).replace(/\./g, 0), 2);
}

const alternatePad = (pad) =>
	pad === '.' ? (algo[0] === '.' ? '.' : '#') : '.';

function compute(image, pad) {
	const output = [];
	for (let y = -1, l = image.length + 1; y < l; y++) {
		const line = [];
		output.push(line);
		for (let x = -1, m = image[0].length + 1; x < m; x++) {
			line.push(algo[read(image, x, y, pad)]);
		}
	}
	return output;
}

const count = (s) =>
	s
		.map((s) => s.join(''))
		.join('')
		.replace(/\./g, '').length;

let firstStar;
let pad = '.';
for (let i = 0; i < 50; i++) {
	img = compute(img, pad);
	pad = alternatePad(pad);
	if (i === 1) firstStar = count(img);
}

console.log({ firstStar, secondStar: count(img) });
