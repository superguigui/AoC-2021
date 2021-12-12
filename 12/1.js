import fs from 'fs';

const isU = (c) => c === c.toUpperCase();
const removeFromEnd = (arr, s) => {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] === s) {
			arr.splice(i, 1);
			return arr;
		}
	}
	return arr;
};

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data
		.toString()
		.split('\n')
		.map((a) => a.split('-'));

	const links = {};
	input.forEach(([from, to]) => {
		if (!links[from]) links[from] = [];
		if (!links[to]) links[to] = [];
		links[from].push(to);
		links[to].push(from);
	});
	const nodes = [...new Set(input.flat())];
	const paths = [];
	const visited = {};
	nodes.forEach((a) => (visited[a] = isU(a) ? -1 : 1));
	explore(links, paths, 'start', visited, ['start']);
	console.log({ firstStar: paths.map((a) => a.join(',')).length });
});

function explore(links, paths, a, visited, path) {
	if (a === 'end') return paths.push(path);
	if (visited[a] > 0) visited[a]--;
	links[a].forEach((l) => {
		if (visited[l] !== 0) {
			path.push(l);
			explore(links, paths, l, visited, [...path]);
			removeFromEnd(path, l);
		}
	});
	if (visited[a] >= 0) visited[a]++;
}
