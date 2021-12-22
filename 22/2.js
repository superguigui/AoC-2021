import fs from 'fs';

const data = fs
	.readFileSync('./input.txt', 'utf-8')
	.split('\n')
	.map((l) =>
		/(\w+) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/g.exec(l)
	)
	.map(([_, toggle, x1, x2, y1, y2, z1, z2]) => [
		toggle === 'on' ? 1 : 0,
		[x1, x2, y1, y2, z1, z2].map((a) => +a),
	]);

function intersectAxis(a0, a1, b0, b1) {
	if (b0 > a1 || a0 > b1) return undefined;
	const nums = [a0, a1, b0, b1].sort((a, b) => a - b);
	return [nums[1], nums[2]];
}

function intersect(
	[x11, x12, y11, y12, z11, z12],
	[x21, x22, y21, y22, z21, z22]
) {
	const x = intersectAxis(x11, x12, x21, x22);
	const y = intersectAxis(y11, y12, y21, y22);
	const z = intersectAxis(z11, z12, z21, z22);
	if (!x || !y || !z) return undefined;
	return [...x, ...y, ...z];
}

function remove(box, bounds) {
	const removed = intersect(box.bounds, bounds);
	if (!removed) return;
	const intersections = box.intersections ?? [];
	for (const intersection of intersections) remove(intersection, removed);
	box.intersections = [...intersections, { bounds: removed }];
}

function compute(box) {
	const [x1, x2, y1, y2, z1, z2] = box.bounds;
	return (
		(x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1) -
		(box.intersections ?? []).reduce((a, b) => a + compute(b), 0)
	);
}

const boxes = [];
for (const [toggle, bounds] of data) {
	for (const box of boxes) remove(box, bounds);
	if (toggle === 1) boxes.push({ bounds });
}

console.log({
	secondStar: boxes.reduce((a, b) => a + compute(b), 0),
});
