import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data
		.toString()
		.split('\n')
		.map((n) => n.split(' | ').map((b) => b.split(' ')));

	const secondStar = input.reduce((a, b) => a + decode(b), 0);
	console.log({ secondStar });
});

const commonCharacterCount = (s1, s2) => {
	s2 = s2.split('');
	return s1.split('').filter((c) => s2.includes(c)).length;
};
const sortAlpha = (a) => a.split('').sort().join('');
const findWithLength = (signals, l) => signals.find((a) => a.length === l);
const findAllWithLength = (signals, l) => signals.filter((a) => a.length === l);
const contains = (target, chars) =>
	commonCharacterCount(target, chars) === chars.length;

function decode(line) {
	const signals = line[0];
	const map = {},
		dic = {};
	map[1] = findWithLength(signals, 2);
	map[7] = findWithLength(signals, 3);
	map[4] = findWithLength(signals, 4);
	map[8] = findWithLength(signals, 7);

	findAllWithLength(signals, 6).forEach((a) => {
		if (contains(a, map[4])) map[9] = a;
		else if (contains(a, map[7])) map[0] = a;
		else map[6] = a;
	});

	findAllWithLength(signals, 5).forEach((a) => {
		if (contains(a, map[7])) map[3] = a;
		else if (commonCharacterCount(a, map[4]) === 3) map[5] = a;
		else map[2] = a;
	});

	Object.entries(map).forEach(([key, value]) => (dic[sortAlpha(value)] = key));

	return parseInt(line[1].map((a) => dic[sortAlpha(a)]).join(''));
}
