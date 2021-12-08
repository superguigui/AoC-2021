import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const lengths = [2, 3, 4, 7];
	const firstStar = data
		.toString()
		.split('\n')
		.map((n) => n.split(' | ')[1].split(' '))
		.flat()
		.filter((a) => lengths.includes(a.length)).length;
	console.log({ firstStar });
});
