import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data
		.toString()
		.split(',')
		.map((n) => parseFloat(n));
	const counters = Array(9).fill(0);
	input.forEach((v) => counters[v]++);
	for (let i = 0; i < 256; i++) {
		const babies = counters[0];
		for (let j = 0; j < counters.length - 1; j++) {
			counters[j] = counters[j + 1];
		}
		counters[counters.length - 1] = babies;
		counters[6] += babies;
	}
	const secondStar = counters.reduce((a, b) => a + b, 0);
	console.log({ secondStar });
});
