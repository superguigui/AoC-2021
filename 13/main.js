import t from './input.txt?raw';

const input = t.split('\n');
const coords = [];
const folds = [];
input.forEach((l) => {
	const v = l.split(',');
	if (v.length === 2) coords.push(v.map(Number));
	else if (l !== '') {
		const [axis, value] = l.split('=');
		folds.push([axis.replace('fold along ', ''), Number(value)]);
	}
});

console.log({
	firstStar: fold(coords, folds[0][0] === 'x', folds[0][1]).length,
});

print(
	folds.reduce((res, [axis, value]) => fold(res, axis === 'x', value), coords)
);

function fold(arr, isX, value) {
	const res = arr.map(([x, y]) =>
		(isX ? x > value : y > value)
			? [isX ? value + (value - x) : x, !isX ? value + (value - y) : y]
			: [x, y]
	);
	return [...new Set(res.map((a) => a.join(',')))].map((a) =>
		a.split(',').map(Number)
	);
}

function print(values) {
	const ctx = document.getElementById('app').getContext('2d');
	values.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
}
