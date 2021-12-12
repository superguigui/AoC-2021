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
	const mins = [
		null,
		...nodes.filter((a) => a !== 'start' && a !== 'end' && !isU(a)),
	];
	console.log({
		secondStar: [...new Set(mins.map((a) => resolve(a, links, nodes)).flat())]
			.length,
	});
});

function resolve(min, links, nodes) {
	const paths = [];
	const visited = {};
	nodes.forEach((a) => (visited[a] = a === min ? 2 : isU(a) ? -1 : 1));
	explore(links, paths, min, 'start', visited, ['start']);
	return paths.map((a) => a.join(','));
}

function explore(links, paths, min, a, visited, path) {
	if (a === 'end') return paths.push(path);
	if (visited[a] > 0) visited[a]--;
	links[a].forEach((l) => {
		if (visited[l] !== 0) {
			path.push(l);
			explore(links, paths, min, l, visited, [...path]);
			removeFromEnd(path, l);
		}
	});
	if (visited[a] >= 0) visited[a]++;
}
