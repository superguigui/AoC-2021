import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');
const bin = data
	.split('')
	.map((a) => parseInt(a, 16).toString(2).padStart(4, '0'))
	.join('');

let firstStar = 0;

function decode(s, q, value = '', i = 1, stride = 5) {
	while (!q || q[0] === '1') {
		i += stride;
		q = s.slice(i, i + stride);
		value += q.slice(1, 5);
	}
	return [i + 5, parseInt(value, 2)];
}

function solve(parent, s) {
	const version = parseInt(s.slice(0, 3), 2);
	const type = parseInt(s.slice(3, 6), 2);
	firstStar += version;
	if (type === 4) {
		const [length, value] = decode(s);
		parent.values = [...(parent.values ?? []), value];
		return s.substr(length);
	} else {
		const current = { c: [], t: type };
		parent.c.push(current);
		const b = s.slice(6, 6 + 1) === '1' ? 11 : 15;
		let l = parseInt(s.slice(7, 7 + b), 2);
		s = s.slice(7 + b);
		if (b === 15) {
			while (l > 0 && !isNaN(l)) {
				const temp = solve(current, s);
				l -= s.length - temp.length;
				s = temp;
			}
		} else {
			while (l > 0) {
				s = solve(current, s);
				l--;
			}
		}
		return s;
	}
}

const res = { c: [] };
solve(res, bin);
console.log({ firstStar, secondStar: compute(res.c[0]) });

function compute(n) {
	n.values = [...(n.values ?? []), ...(n.c ?? []).map((c) => compute(c))];
	if (n.t === 0) return n.values.reduce((a, b) => a + b, 0);
	if (n.t === 1) return n.values.reduce((a, b) => a * b, 1);
	if (n.t === 2) return n.values.sort((a, b) => a - b)[0];
	if (n.t === 3) return n.values.sort((a, b) => b - a)[0];
	if (n.t === 5) return n.values[0] > n.values[1] ? 1 : 0;
	if (n.t === 6) return n.values[0] < n.values[1] ? 1 : 0;
	if (n.t === 7) return n.values[0] === n.values[1] ? 1 : 0;
}
