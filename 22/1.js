import fs from 'fs';

const clamp = (n, min = -50, max = 50) => Math.min(Math.max(n, min), max);
const data = fs
	.readFileSync('./input.txt', 'utf-8')
	.split('\n')
	.map((l) =>
		/(\w+) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/g.exec(l)
	)
	.filter(([_, __, x1, x2, y1, y2, z1, z2]) => {
		if (
			(x1 < -50 && x2 < -50) ||
			(x1 > 50 && x2 > 50) ||
			(y1 < -50 && y2 < -50) ||
			(y1 > 50 && y2 > 50) ||
			(z1 < -50 && z2 < -50) ||
			(z1 > 50 && z2 > 50)
		)
			return false;
		return true;
	})
	.map(([_, toggle, x1, x2, y1, y2, z1, z2]) => [
		toggle,
		clamp(+x1) + 50,
		clamp(+x2) + 50,
		clamp(+y1) + 50,
		clamp(+y2) + 50,
		clamp(+z1) + 50,
		clamp(+z2) + 50,
	]);

const a = Array(101)
	.fill(0)
	.map((a) =>
		Array(101)
			.fill(0)
			.map((a) =>
				Array(101)
					.fill(0)
					.map((a) => 0)
			)
	);

data.forEach(([toggle, x1, x2, y1, y2, z1, z2]) => {
	const v = toggle === 'on' ? 1 : 0;
	for (let x = x1; x <= x2; x++) {
		for (let y = y1; y <= y2; y++) {
			for (let z = z1; z <= z2; z++) {
				a[x][y][z] = v;
			}
		}
	}
});

const w = a.length;
const h = a[0].length;
const d = a[0][0].length;
let count = 0;
for (let x = 0; x < w; x++) {
	for (let y = 0; y < h; y++) {
		for (let z = 0; z < d; z++) {
			count += a[x][y][z];
		}
	}
}

console.log({ count });
