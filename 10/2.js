import fs from 'fs';

const openingChars = ['[', '(', '{', '<'];
const closingChars = [']', ')', '}', '>'];
const scores = [2, 1, 3, 4];
const score = (s) =>
	s
		.split('')
		.map((c) => scores[closingChars.indexOf(c)])
		.reduce((a, b) => a * 5 + b, 0);

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data.toString().split('\n');
	const outputs = input
		.map((line) => {
			const openings = [];
			for (let i = 0; i < line.length; i++) {
				const char = line[i];
				const io = openingChars.indexOf(char);
				const ic = closingChars.indexOf(char);
				if (io > -1) openings.push(char);
				else {
					const lastOp = openings[openings.length - 1];
					if (openingChars[ic] === lastOp) openings.pop();
					else return null;
				}
			}
			return openings
				.reverse()
				.map((c) => closingChars[openingChars.indexOf(c)])
				.join('');
		})
		.filter((a) => a !== null)
		.map(score)
		.sort((a, b) => a - b);
	console.log({ secondStar: outputs[~~(outputs.length / 2)] });
});
