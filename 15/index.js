import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const getNeighbors = (y, x, h, w) => {
	const neighbors = [];
	if (y > 0) neighbors.push([x, y - 1]);
	if (y < h) neighbors.push([x, y + 1]);
	if (x > 0) neighbors.push([x - 1, y]);
	if (x < w) neighbors.push([x + 1, y]);
	return neighbors;
};
const coordsToKey = (a) => a.join(',');
const keyToCoords = (a) => a.split(',').map(Number);

function djikstra(grid) {
	const h = grid.length - 1;
	const w = grid[0].length - 1;
	const keyStart = '0,0';
	const keyEnd = coordsToKey([w, h]);
	const minDist = { [keyStart]: 0 };
	const visited = new Set();
	const queue = [{ k: keyStart, d: 0 }];

	while (queue.length > 0) {
		const { k: u, d: dist } = queue.pop();
		const [x, y] = keyToCoords(u);

		if (u === keyEnd) return dist;
		if (visited.has(u)) continue;
		visited.add(u);

		const neighbors = getNeighbors(y, x, h, w);
		for (const [xx, yy] of neighbors) {
			const v = coordsToKey([xx, yy]);
			if (visited.has(v)) continue;
			const newDist = dist + grid[yy][xx];
			if (minDist[v] === undefined || newDist < minDist[v]) {
				minDist[v] = newDist;
				queue.push({ k: v, d: newDist });
				queue.sort((a, b) => b.d - a.d);
			}
		}
	}
	return Infinity;
}

const grid = data.split('\n').map((l) => l.split('').map(Number));
const [h, w] = [grid.length, grid[0].length];
const expandedGrid = [...Array(h * 5)].map((_, y) =>
	[...Array(w * 5)].map(
		(_, x) => ((grid[y % h][x % w] + ~~(y / h) + ~~(x / w) - 1) % 9) + 1
	)
);

console.log({ firstStar: djikstra(grid) });
console.log({ secondStar: djikstra(expandedGrid) });
