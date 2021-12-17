import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');
const input = /x=([0-9-]+)..([0-9-]+), y=([0-9-]+)..([0-9-]+)/g.exec(data);
const rx = [input[1], input[2]].map(Number).sort((a, b) => a - b);
const ry = [input[3], input[4]].map(Number).sort((a, b) => a - b);
let maxpy = 0;
let successes = 0;

function step(p, v) {
	p[0] += v[0];
	p[1] += v[1];
	if (p[1] > maxpy) maxpy = p[1];
	if (p[0] >= rx[0] && p[0] <= rx[1] && p[1] >= ry[0] && p[1] <= ry[1])
		return 1;
	if (p[0] > rx[1] || p[1] < ry[0]) return -1;
	v[0] = v[0] > 0 ? v[0] - 1 : v[0] < 0 ? v[0] + 1 : v[0];
	v[1]--;
	return 0;
}

function solve(v) {
	const p = [0, 0];
	let r = 0;
	const saveMaxPY = maxpy;
	while (r === 0) {
		r = step(p, v);
	}
	if (r === 1) {
		successes++;
	} else {
		maxpy = saveMaxPY;
	}
}

function getMinVx() {
	let minvx = 0;
	let success = false;
	while (!success) {
		minvx++;
		const p = [0, 0];
		let v = minvx;
		while (p[0] < rx[0] && v > 0) {
			p[0] += v;
			v--;
			if (p[0] >= rx[0]) success = true;
		}
	}
	return minvx;
}
const minVX = getMinVx();
const maxVX = rx[1] + 1;

for (let x = minVX; x < maxVX; x++) {
	// didn't even bother to find ideal y range, just shooted large enough
	for (let y = -500; y < 500; y++) {
		solve([x, y]);
	}
}

console.log({ firstStar: maxpy });
console.log({ secondStar: successes });
