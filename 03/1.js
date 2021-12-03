import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data.toString();
	const lines = input.split('\n');
	const length = lines[0].length;
	const zeros = Array(length).fill(0);
	const ones = Array(length).fill(0);

	for (let i = 0, l = lines.length; i < l; i++) {
		const line = lines[i];
		for (let ii = 0; ii < length; ii++) {
			count(line, ii, zeros, ones);
		}
	}
	let least = '';
	let most = '';
	for (let i = 0; i < zeros.length; i++) {
		const cond = zeros[i] > ones[i];
		least += cond ? '1' : '0';
		most += cond ? '0' : '1';
	}
	const firstStar = parseInt(least, 2) * parseInt(most, 2);
	console.log({ firstStar });
});

function count(arr, index, zeros, ones) {
	if (arr[index] === '0') {
		zeros[index]++;
	} else {
		ones[index]++;
	}
}
