import fs from 'fs';

// const steps = 10; // first star
const steps = 40; // second star

const data = fs.readFileSync('./input.txt', 'utf-8');
const makeCounter = (arr) =>
	arr.reduce((a, b) => {
		a[b] = 0;
		return a;
	}, {});
const [template, _, ...input] = data.split('\n');
const rules = input
	.map((a) => a.split(' -> '))
	.reduce((a, [b, c]) => {
		a[b] = c;
		return a;
	}, {});
const first = template[0];
const chars = [...new Set(Object.values(rules))];
const charCounters = makeCounter(Object.values(chars));
let pairCounter = makeCounter(Object.keys(rules));

for (let i = 0; i < template.length - 1; i++) {
	pairCounter[template[i] + template[i + 1]]++;
}

for (let i = 0; i < steps; i++) {
	const newCounter = makeCounter(Object.keys(rules));
	Object.keys(pairCounter).forEach((key) => {
		const [a, b] = key.split('');
		const c = rules[key];
		newCounter[a + c] += pairCounter[key];
		newCounter[c + b] += pairCounter[key];
	});
	pairCounter = newCounter;
}

Object.entries(pairCounter).forEach(([key, value]) => {
	charCounters[key.split('')[1]] += value;
});
charCounters[first]++;

const counts = Object.values(charCounters).sort((a, b) => a - b);

console.log(counts[counts.length - 1] - counts[0] );
