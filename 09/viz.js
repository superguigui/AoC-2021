const canvasSketch = require('canvas-sketch');
const load = require('load-asset');

const settings = {
	dimensions: [512, 512],
	duration: 4,
	animate: true,
	fps: 30,
};

const palette = [
	'#fafa6e',
	'#c4ec74',
	'#92dc7e',
	'#64c987',
	'#39b48e',
	'#089f8f',
	'#00898a',
	'#08737f',
	'#215d6e',
	'#2a4858',
];

const sketch = async () => {
	const txt = await load('./input.txt');
	const data = txt.split('\n');
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

	const terrain = data.map((l) => l.split('').map(Number));
	const terrainSize = [terrain[0].length, terrain.length];

	let neighbors;
	let flooded;

	return ({ context, width, height, frame }) => {
		const dx = width / terrainSize[0];
		const dy = height / terrainSize[1];

		if (frame === 0) {
			context.fillStyle = 'black';
			context.fillRect(0, 0, width, height);
			neighbors = [...lows];
			flooded = Array(a.length).fill(0);
		}

		for (let i = 0, l = lows.length; i < l; i++) {
			const low = lows[i];
			flood(context, low, terrainSize, dx, dy, a[low]);
		}

		const futures = [];
		const olds = [];
		for (let j = 0; j < neighbors.length; j++) {
			if (Math.random() < 0.05) {
				const n = neighbors[j];
				flooded[n] = 1;
				flood(context, n, terrainSize, dx, dy, a[n]);
				futures.push(...getNeighbors(a, n, w, h, flooded));
			} else {
				olds.push(neighbors[j]);
			}
		}
		neighbors = [...olds, ...futures];
	};
};

canvasSketch(sketch, settings);

function flood(context, i, terrainSize, dx, dy, index) {
	const x = (i % terrainSize[0]) * dx;
	const y = ~~(i / terrainSize[0]) * dy;
	const color = palette[(index % palette.length) - 1];
	context.fillStyle = color;
	context.fillRect(x, y, dx, dy);
}

function getNeighbors(a, i, w, h, flooded) {
	const x = i % w,
		y = ~~(i / w),
		neighbors = [];
	if (y > 0) {
		const j = (y - 1) * w + x;
		if (flooded[j] === 0 && ~~a[j] < 9) neighbors.push(j);
	}
	if (y < h - 1) {
		const j = (y + 1) * w + x;
		if (flooded[j] === 0 && ~~a[j] < 9) neighbors.push(j);
	}
	if (x > 0) {
		const j = y * w + x - 1;
		if (flooded[j] === 0 && ~~a[j] < 9) neighbors.push(j);
	}
	if (x < w - 1) {
		const j = y * w + x + 1;
		if (flooded[j] === 0 && ~~a[j] < 9) neighbors.push(j);
	}
	return neighbors;
}
