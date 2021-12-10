import fs from 'fs';

const count = (s, c) =>
	(s.match(new RegExp('' + c.replace(')', '\\)') + '', 'g')) || []).length;

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data
		.toString()
		.split('\n');
	const openingChars = ['[', '(', '{', '<'];
	const closingChars = [']', ')', '}', '>'];
	const scores = [57, 3, 1197, 25137];
	const openings = [];
	const errors = input
		.map((line) => {
			for (let i = 0; i < line.length; i++) {
				const char = line[i];
				const io = openingChars.indexOf(char);
				const ic = closingChars.indexOf(char);
				if (io > -1) openings.push(char);
				else {
					const lastOp = openings[openings.length - 1];
					if (openingChars[ic] === lastOp) openings.pop();
					else return char;
				}
			}
			return null;
		})
		.filter((a) => a !== null)
		.join('');
	console.log({
		firstStar: closingChars
			.map((c, i) => count(errors, c) * scores[i])
			.reduce((a, b) => a + b, 0),
	});
});
