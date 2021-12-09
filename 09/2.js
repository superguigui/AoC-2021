import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	data = data.toString().split('\n');
	const [w, h] = [data[0].length, data.length];
	const a = data.join('');

	const lows = [];
	for (let i = 0, l = a.length; i < l; i++) {
		const x = i % w,
			y = ~~(i / w),
			c = ~~a[i];
		if (
			(y > 0 && c >= ~~a[(y - 1) * w + x]) ||
			(y < h - 1 && c >= ~~a[(y + 1) * w + x]) ||
			(x > 0 && c >= ~~a[y * w + x - 1]) ||
			(x < w - 1 && c >= ~~a[y * w + x + 1])
		)
			continue;

		lows.push(i);
	}

	console.log({
		secondStar: lows
			.map((low) => flood(a, low, w, h))
			.sort((a, b) => b - a)
			.splice(0, 3)
			.reduce((a, b) => a * b, 1),
	});
});

function flood(a, low, w, h) {
	const flooded = Array(a.length).fill(0);
	flooded[low] = 1;

	const neighbors = getNeighbors(a, low, w, h, flooded);
	while (neighbors.length) {
		const n = neighbors.shift();
		flooded[n] = 1;
		neighbors.push(...getNeighbors(a, n, w, h, flooded));
	}
	return countFlood(flooded, w, h);
}

function getNeighbors(a, i, w, h, flooded) {
	const x = i % w,
		y = ~~(i / w),
		neighbors = [];
	if (y > 0) {
		const j = (y - 1) * w + x;
		if (flooded[j] === 0 && a[j] < 9) neighbors.push(j);
	}
	if (y < h - 1) {
		const j = (y + 1) * w + x;
		if (flooded[j] === 0 && a[j] < 9) neighbors.push(j);
	}
	if (x > 0) {
		const j = y * w + x - 1;
		if (flooded[j] === 0 && a[j] < 9) neighbors.push(j);
	}
	if (x < w - 1) {
		const j = y * w + x + 1;
		if (flooded[j] === 0 && a[j] < 9) neighbors.push(j);
	}
	return neighbors;
}

function debug(flooded, w, h) {
	let f = [...flooded];
	let s = '';
	for (let i = 0; i < h; i++) {
		s += f.splice(0, w).join('') + '\n';
	}
	console.log(s);
}

function countFlood(flooded) {
	return [...flooded].join('').replace(/0+/g, '').length;
}
