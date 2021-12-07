import fs from 'fs';

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const nsum = (n) => (n * (n + 1)) / 2;
const closest = (arr, value) =>
	arr.reduce((prev, curr) =>
		Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
	);

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data
		.toString()
		.split(',')
		.map((n) => parseFloat(n));
	const pos = closest(input, Math.round(average(input)));
	const secondStar = input.reduce((a, b) => (a += nsum(Math.abs(pos - b))), 0);
	console.log({ secondStar });
});
