import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data.toString();
	const lines = input.split('\n');
	const answers = lines[0].split(',').map((a) => parseFloat(a));
	let arr = [];
	const grids = [];
	for (let i = 2; i < lines.length; i++) {
		const line = lines[i];
		if (line.length > 0) {
			arr.push(line);
			if (arr.length === 5) {
				const grid = new Grid(arr);
				grids.push(grid);
				arr = [];
			}
		}
	}

	const winningGrid = run(answers, grids);
	if (winningGrid) {
		const { grid, winningNumber } = winningGrid;
		const sum = grid.sumUnmarked();
		console.log({ firstStar: sum * winningNumber });
	}
});

function run(answers, grids) {
	for (let i = 0; i < answers.length; i++) {
		const value = answers[i];
		for (let j = 0; j < grids.length; j++) {
			const grid = grids[j];
			if (grid.tick(value)) {
				return { grid, winningNumber: value };
			}
		}
	}
	return null;
}

const reg = new RegExp(/([0-9]+)/g);

class Grid {
	constructor(input) {
		this.ticks = [];
		this.values = input.map((line) => {
			const values = line.match(reg).map((a) => parseFloat(a));
			const ticks = values.map((v) => false);
			this.ticks.push(ticks);
			return values;
		});
	}

	tick(value) {
		this.values.forEach((line, i) => {
			line.forEach((col, j) => {
				if (col === value) {
					this.ticks[i][j] = true;
				}
			});
		});
		return this.checkRows() || this.checkColumns();
	}

	checkRows() {
		for (let i = 0; i < this.ticks.length; i++) {
			const line = this.ticks[i];
			const lineTicked = line.every((v) => v === true);
			if (lineTicked) return true;
		}
		return false;
	}

	checkColumns() {
		const nbLines = this.ticks.length;
		const nbColumns = this.ticks[0].length;
		for (let i = 0; i < nbColumns; i++) {
			let v = nbLines;
			for (let j = 0; j < nbLines; j++) {
				const ticked = this.ticks[j][i];
				if (ticked === true) {
					v--;
				}
			}
			if (v === 0) return true;
		}
		return false;
	}

	sumUnmarked() {
		let sum = 0;
		for (let i = 0; i < this.values.length; i++) {
			const line = this.values[i];
			for (let j = 0; j < line.length; j++) {
				const value = line[j];
				const tick = this.ticks[i][j];
				if (!tick) sum += value;
			}
		}
		return sum;
	}
}
