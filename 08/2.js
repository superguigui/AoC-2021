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

const containsChars = (signal, chars) => {
	const r = new RegExp('([' + chars + '])', 'gi');
	return signal.match(r);
};

const findTwo = (signals, one) => {
	const a = signals
		.map((a, i) => ({ i, v: containsChars(a, one) }))
		.filter(({ v }) => v.length === 1)
		.map(({ i, v }) => ({ i, v: v[0] }));
	let res;
	one.split('').forEach((c) => {
		const count = a.filter((b) => b.v === c);
		if (count.length === 1) {
			res = signals[count[0].i];
		}
	});
	signals.splice(signals.indexOf(res), 1);
	return res;
};

const commonCharacterCount = (s1, s2) => {
	let count = 0;
	s1 = s1.split('');
	s2 = s2.split('');

	s1.forEach((e) => {
		if (s2.includes(e)) {
			count++;
			s2.splice(s2.indexOf(e), 1);
		}
	});

	return count;
};

const commonCharacters = (s1, s2) => {
	let res = '';
	s1 = s1.split('');
	s2 = s2.split('');
	s1.forEach((e) => {
		if (s2.includes(e)) {
			res += e;
			s2.splice(s2.indexOf(e), 1);
		}
	});

	return res;
};

const findThreeFive = (signals, two) => {
	const length5 = signals.filter((a) => a.length === 5);
	length5.forEach((a) => signals.splice(signals.indexOf(a), 1));
	const a = length5.map((a) => commonCharacterCount(a, two));
	return a[0] === 3 ? [length5[1], length5[0]] : [length5[0], length5[1]];
};

const sortAlpha = (a) => a.split('').sort().join('');
const add = (a, b) => {
	let toto = a;
	b.split('').forEach((v) => {
		if (toto.indexOf(v) < 0) {
			toto += v;
		}
	});
	return sortAlpha(toto);
};

const findNine = (signals, five, seven) => {
	const comp = add(five, seven);
	let res;
	signals.forEach((s) => {
		if (sortAlpha(s) === comp) res = s;
	});
	signals.splice(signals.indexOf(res), 1);
	return res;
};

const findZeroSix = (signals, two, three, four, five) => {
	const midChar = commonCharacters(
		commonCharacters(commonCharacters(two, three), four),
		five
	);
	return signals[0].indexOf(midChar) < 0
		? [signals[0], signals[1]]
		: [signals[1], signals[0]];
};

const findWithLength = (signals, l) => {
	const v = signals.filter((a) => a.length === l)[0];
	signals.splice(signals.indexOf(v), 1);
	return v;
};

function decode(line) {
	const signals = line[0];
	const map = {};
	map[1] = findWithLength(signals, 2);
	map[7] = findWithLength(signals, 3);
	map[4] = findWithLength(signals, 4);
	map[8] = findWithLength(signals, 7);

	map[2] = findTwo(signals, map[1]);

	const [three, five] = findThreeFive(signals, map[2]);
	map[3] = three;
	map[5] = five;
	map[9] = findNine(signals, map[5], map[7]);
	const [zero, six] = findZeroSix(signals, map[2], map[3], map[4], map[5]);
	map[0] = zero;
	map[6] = six;

	const dic = {};
	Object.entries(map).forEach(([key, value]) => {
		dic[sortAlpha(value)] = key;
	});

	return parseInt(line[1].map((a) => dic[sortAlpha(a)]).join(''));
}
