import fs from 'fs';

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const nsum = (n) => (n * (n + 1)) / 2;
const distance = (arr, pos) =>
	arr.reduce((a, b) => (a += nsum(Math.abs(pos - b))), 0);

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data
		.toString()
		.split(',')
		.map((n) => parseFloat(n));
	const mean = average(input);
	const distances = [Math.floor(mean), Math.ceil(mean)].map((a) =>
		distance(input, a)
	); // Obscure rounding problems and maths reasons force me to check the two closest values surrounding the mean
	const secondStar = Math.min(...distances);
	console.log({ secondStar });
});
