import fs from 'fs';

const median = (arr) => {
	arr = [...arr];
	arr.sort((a, b) => a - b);
	const half = Math.floor(arr.length / 2);
	if (arr.length % 2) return arr[half];
	return (arr[half - 1] + arr[half]) / 2.0;
};

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data
		.toString()
		.split(',')
		.map((n) => parseFloat(n));
	const pos = median(input);
	const firstStar = input.reduce((a, b) => (a += Math.abs(pos - b)), 0);
	console.log({ firstStar });
});
