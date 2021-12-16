import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

function shortestIn(list, dist) {
	let min = Infinity;
	let res;
	for (let i = 0, l = list.length; i < l; i++) {
		const v = list[i];
		const d = dist[v];
		if (d < min) {
			min = d;
			res = v;
		}
	}
	return res;
}

function makeGraph(input) {
	const graph = {};
	for (let y = 0, h = input.length - 1; y <= h; y++) {
		const line = input[y];
		for (let x = 0, w = line.length - 1; x <= w; x++) {
			const neighbors = {};
			if (y > 0) {
				neighbors[x + ',' + (y - 1)] = Number(input[y - 1][x]);
			}
			if (y < h) {
				neighbors[x + ',' + (y + 1)] = Number(input[y + 1][x]);
			}
			if (x > 0) {
				neighbors[x - 1 + ',' + y] = Number(input[y][x - 1]);
			}
			if (x < w) {
				neighbors[x + 1 + ',' + y] = Number(input[y][x + 1]);
			}
			graph[x + ',' + y] = neighbors;
		}
	}
	return graph;
}

function djikstra(graph, start) {
	const dist = {};
	const prev = {};
	const list = [];

	Object.keys(graph).forEach((key) => {
		dist[key] = Infinity;
		prev[key] = [];
		list.push(key);
	});
	dist[start] = 0;
	const size = list.length;
	while (list.length) {
		const u = shortestIn(list, dist);
		list.splice(list.indexOf(u), 1);
		const node = graph[u];
		const keys = Object.keys(node);
		for (let i = 0; i < keys.length; i++) {
			const v = keys[i];
			const value = node[v];
			if (list.indexOf(v) >= 0) {
				const alt = Number(dist[u]) + Number(value);
				if (alt < dist[v]) {
					dist[v] = alt;
					prev[v] = [...prev[v], u];
				}
			}
		}
		console.clear();
		console.log(
			'Djikstra\n' +
				Math.round((1 - list.length / size) * 10000) / 10000 +
				' - ' +
				keys.length
		);
	}
	console.clear();
	return prev;
}

function explore(prev, paths, path = [], u = undefined) {
	if (prev[u] === undefined) return;
	if (u === undefined || !prev[u].length) {
		paths.push(path);
		return paths;
	}
	prev[u].forEach((l) => {
		path.splice(0, 0, l);
		explore(prev, paths, [...path], l);
		path.splice(path.indexOf(l), 1);
	});
}

function solve(input) {
	const source = '0,0';
	const target = input[input.length - 1].length - 1 + ',' + (input.length - 1);
	const graph = makeGraph(input);
	console.log('- graph ok');
	const prev = djikstra(graph, source);
	console.log('- djikstra ok');

	const paths = [];
	explore(prev, paths, [], target);
	const correctPaths = paths.map((p) => {
		p.splice(0, 1);
		p.push(target);
		return p;
	});

	const scores = correctPaths.map((path) =>
		path
			.map((a) => a.split(','))
			.map(([x, y]) => Number(input[y][x]))
			.reduce((a, b) => a + b, 0)
	);
	return scores.sort((a, b) => a - b)[0];
}

const input = data.split('\n');
const fullGrid = [...input];
const inputLines = input.length;
for (let i = 0; i < 4; i++) {
	for (let j = 0; j < inputLines; j++) {
		const prev = fullGrid[i * inputLines + j];
		fullGrid.push(
			prev
				.split('')
				.map((a) => Math.max(1, (Number(a) + 1) % 10))
				.join('')
		);
	}
}
const inputCols = input[0].length;
for (let i = 0, l = fullGrid.length; i < l; i++) {
	for (let j = 0; j < 4; j++) {
		const prev = fullGrid[i].substr(j * inputCols, inputCols);
		fullGrid[i] += prev
			.split('')
			.map((a) => Math.max(1, (Number(a) + 1) % 10))
			.join('');
	}
}

console.log({ firstStar: solve(input) });
console.log({ secondStar: solve(fullGrid) });
