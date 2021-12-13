import t from './input.txt?raw';

const input = t.split('\n');
const coords = [];
const folds = [];
input.forEach((l) => {
	const v = l.split(',');
	if (v.length === 2) coords.push(v.map(Number));
	else if (l !== '') {
		const fold = l.split('=');
		folds.push([fold[0].replace('fold along ', ''), Number(fold[1])]);
	}
});

console.log({
	firstStar: fold(coords, folds[0][0] === 'x', folds[0][1]).length,
});

let coords2 = [...coords];
folds.forEach(
	([axis, value]) => (coords2 = fold(coords2, axis === 'x', value))
);
print(coords2);

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
	const canvas = document.getElementById('app');
	const ctx = canvas.getContext('2d');
	canvas.width = 256;
	canvas.height = 256;
	canvas.style.width = canvas.width * 4 + 'px';
	canvas.style.height = canvas.height * 4 + 'px';
	values.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
}
