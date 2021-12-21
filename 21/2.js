import fs from 'fs';
import mem from 'mem';

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const players = data
	.map((s) => /Player \d+ starting position: (\d+)/g.exec(s))
	.map(([_, pos]) => +pos);

const combinations = [
	[3, 1],
	[4, 3],
	[5, 6],
	[6, 7],
	[7, 6],
	[8, 3],
	[9, 1],
];

let step = (p0, p1, s0 = 0, s1 = 0) => {
	if (s1 >= 21) return [0, 1];
	const res = [0, 0];
	combinations.forEach(([move, numberOfTimes]) => {
		const p0b = (p0 + move) % 10 || 10;
		const [w1, w0] = step(p1, p0b, s1, s0 + p0b);
		res[0] += w0 * numberOfTimes;
		res[1] += w1 * numberOfTimes;
	});
	return res;
};

step = mem(step, {
	cacheKey: (_) => _.join(','),
});

console.log({
	secondStar: step(players[0], players[1], 0, 0).sort((a, b) => b - a)[0],
});
