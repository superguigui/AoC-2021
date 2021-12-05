import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data.toString();
	const lines = input
		.split('\n')
		.map((l) =>
			l.split(' -> ').map((p) => p.split(',').map((n) => parseFloat(n)))
		);

	const gridSize = [0, 0];
	for (const l of lines) {
		gridSize[0] = Math.max(gridSize[0], l[0][1], l[1][1]);
		gridSize[1] = Math.max(gridSize[1], l[0][0], l[1][0]);
	}
	const size = Math.max(gridSize[0] + 1, gridSize[1] + 1);

	const grid = Array(size)
		.fill(0)
		.map(() =>
			Array(size)
				.fill(0)
				.map(() => 0)
		);

	lines.forEach((l) => {
		runHVLine(grid, l);
	});

	let firstStar = 0;
	for (const l of grid) {
		for (const v of l) {
			if (v >= 2) {
				firstStar++;
			}
		}
	}
	console.log({ firstStar });
});

function runHVLine(grid, line) {
	if (line[0][0] === line[1][0]) {
		const x = line[0][0];
		const y1 = Math.min(line[0][1], line[1][1]);
		const y2 = Math.max(line[0][1], line[1][1]);
		for (let y = y1; y <= y2; y++) {
			grid[y][x] += 1;
		}
	} else if (line[0][1] === line[1][1]) {
		const y = line[0][1];
		const x1 = Math.min(line[0][0], line[1][0]);
		const x2 = Math.max(line[0][0], line[1][0]);
		for (let x = x1; x <= x2; x++) {
			grid[y][x] += 1;
		}
	}
}
