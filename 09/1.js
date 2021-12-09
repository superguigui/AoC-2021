import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	data = data.toString().split('\n');
	const [w, h] = [data[0].length, data.length];
	const a = data.join('');
	let risk = 0;
	for (let i = 0, l = a.length; i < l; i++) {
		const x = i % w,
			y = ~~(i / w),
			c = ~~a[i];
		if (
			(y > 0 && c >= ~~a[(y - 1) * w + x]) ||
			(y < h - 1 && c >= ~~a[(y + 1) * w + x]) ||
			(x > 0 && c >= ~~a[y * w + x - 1]) ||
			(x < w - 1 && c >= ~~a[y * w + x + 1])
		)
			continue;

		risk += 1 + c;
	}
	console.log({ firstStar: risk });
});
