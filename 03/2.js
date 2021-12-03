import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data.toString();
	const lines = input.split('\n');
	const length = lines[0].length;
	const resultsMost = new Array(length + 1).fill(0).map(() => []);
	const resultsLeast = new Array(length + 1).fill(0).map(() => []);
	resultsMost[0] = [...lines];
	resultsLeast[0] = [...lines];

	let mostValue = undefined;
	let leastValue = undefined;

	for (let i = 0; i < length; i++) {
		const countMost = count(resultsMost[i], i);
		const countLeast = count(resultsLeast[i], i);
		const charLeast = countLeast.zeros <= countLeast.ones ? '0' : '1';
		const charMost = countMost.ones >= countMost.zeros ? '1' : '0';
		save(resultsMost[i], i, charMost, resultsMost[i + 1]);
		save(resultsLeast[i], i, charLeast, resultsLeast[i + 1]);
		if (resultsMost[i + 1].length === 1) {
			mostValue = resultsMost[i + 1][0];
		}
		if (resultsLeast[i + 1].length === 1) {
			leastValue = resultsLeast[i + 1][0];
		}
	}
	const secondStar = parseInt(mostValue, 2) * parseInt(leastValue, 2);
	console.log({ secondStar });
});

function count(arr, index) {
	let zeros = 0;
	let ones = 0;
	for (let i = 0, l = arr.length; i < l; i++) {
		if (arr[i][index] === '0') {
			zeros++;
		} else {
			ones++;
		}
	}
	return { zeros, ones };
}

function save(arr, p = 0, char = '0', res = []) {
	for (let i = 0, l = arr.length; i < l; i++) {
		if (arr[i][p] === char) {
			res.push(arr[i]);
		}
	}
}
