import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data.toString();
	const lines = input.split('\n').map((v) => parseFloat(v));

	// Group by sliding windows
	const slidingWindows = [];
	for (let i = 0, l = lines.length; i < l - 2; i++) {
		slidingWindows.push(lines[i] + lines[i + 1] + lines[i + 2]);
	}

	function countIncreases(a) {
		let count = 0;
		for (let i = 1, l = a.length; i < l; i++) {
			if (a[i] > a[i - 1]) {
				count++;
			}
		}
		return count;
	}

	const firstStar = countIncreases(lines);
	const secondStar = countIncreases(slidingWindows);

	console.log({firstStar, secondStar});
});
