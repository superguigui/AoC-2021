import fs from 'fs';

fs.readFile('./input.txt', (err, data) => {
	if (err) throw err;
	const input = data.toString();
	const lines = input.split('\n');

	let forward = 0;
	let aim = 0;
    let depth = 0;
	for (let i = 0, l = lines.length; i < l; i++) {
		const line = lines[i];
		const fwds = line.split('forward ');
		const ups = line.split('up ');
		const downs = line.split('down ');
		if (fwds.length > 1) {
            const x = parseFloat(fwds[1]);
			forward += x;
            depth += aim * x;
		} else if (ups.length > 1) {
			aim -= parseFloat(ups[1]);
		} else if (downs.length > 1) {
			aim += parseFloat(downs[1]);
		}
	}
	const secondStar = forward * depth;
	console.log({secondStar})
});
