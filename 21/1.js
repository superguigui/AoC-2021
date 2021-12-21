import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

let dice = 0;
let count = 0;

const inc = () => {
	dice = (dice + 1) % 101 || 1;
	return dice;
};
const roll = () => inc() + inc() + inc();

const players = data
	.map((s) => /Player \d+ starting position: (\d+)/g.exec(s))
	.map(([_, pos]) => [pos, 0].map(Number));

function solve() {
	while (true) {
		for (let j = 0; j < players.length; j++) {
			count += 3;
			players[j][0] = (players[j][0] + roll()) % 10 || 10;
			players[j][1] += players[j][0];
			if (players[j][1] >= 1000) return;
		}
	}
}
solve();
console.log({ firstStar: players.sort((a, b) => a[1] - b[1])[0][1] * count });
