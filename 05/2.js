import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data.toString();
	const lines = input
		.split('\n')
		.map((l) =>
			l.split(' -> ').map((p) => p.split(',').map((n) => parseFloat(n)))
		);

	const size = [0, 0];
	for (const l of lines) {
		size[0] = Math.max(size[0], l[0][1], l[1][1]);
		size[1] = Math.max(size[1], l[0][0], l[1][0]);
	}

	const grid = Array(size[0] + 1)
		.fill(0)
		.map(() =>
			Array(size[1] + 1)
				.fill(0)
				.map(() => 0)
		);

	lines.forEach((l) => runLine(grid, l));

	let secondStar = 0;
	for (const l of grid) {
		for (const v of l) {
			if (v >= 2) {
				secondStar++;
			}
		}
	}
	console.log({ secondStar });
});

function runLine(grid, [[x1, y1], [x2, y2]]) {
	if (x1 === x2) {
		for (let y = Math.min(y1, y2), l = Math.max(y1, y2); y <= l; y++)
			grid[y][x1]++;
	} else if (y1 === y2) {
		for (let x = Math.min(x1, x2), l = Math.max(x1, x2); x <= l; x++)
			grid[y1][x]++;
	} else {
		const ymin = Math.min(y1, y2);
		const [xmin, xmax] = ymin === y1 ? [x1, x2] : [x2, x1];
		const dx = Math.sign(xmax - xmin);
		for (let x = xmin, y = ymin, l = Math.max(y1, y2); y <= l; y++, x += dx)
			grid[y][x]++;
	}
}
