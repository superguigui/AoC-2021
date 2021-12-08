import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	console.log({
		secondStar: data
			.toString()
			.split('\n')
			.map((n) => n.split(' | ').map((b) => b.split(' ')))
			.reduce((a, b) => a + decode(b), 0),
	});
});

const has = (a, b) => a.match(new RegExp(b));
const common = (a, b) => a.split('').filter((c) => has(b, c)).length;
const sortAlpha = (a) => a.split('').sort().join('');
const contains = (a, b) => common(a, b) === b.length;

function decode(line) {
	const sig = line[0],
		map = {},
		dic = {};
	map[1] = sig.find((a) => a.length === 2);
	map[7] = sig.find((a) => a.length === 3);
	map[4] = sig.find((a) => a.length === 4);
	map[8] = sig.find((a) => a.length === 7);

	sig.filter((a) => a.length === 6).forEach((a) => {
		if (contains(a, map[4])) map[9] = a;
		else if (contains(a, map[7])) map[0] = a;
		else map[6] = a;
	});

	sig.filter((a) => a.length === 5).forEach((a) => {
		if (contains(a, map[7])) map[3] = a;
		else if (common(a, map[4]) === 3) map[5] = a;
		else map[2] = a;
	});

	Object.entries(map).forEach(([key, value]) => (dic[sortAlpha(value)] = key));

	return parseInt(line[1].map((a) => dic[sortAlpha(a)]).join(''));
}
