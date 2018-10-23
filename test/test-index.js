const assert = require('assert');
const Solver = require('../src/index.js');

describe('SEND+MORE=MONEY', () => {
	it('SEND+MORE=MONEY を解けること。', () => {
		assert.deepEqual([...Solver.solve('SEND', 'MORE', 'MONEY')], [[9567, 1085, 10652]]);
	});
});

describe('A+B=C', () => {
	it('A+B=C を解けること。', () => {
		assert.deepEqual(new Set(Solver.solve('A', 'B', 'C')), new Set([
			[1, 2, 3],
			[2, 1, 3],
			[1, 3, 4],
			[3, 1, 4],
			[1, 4, 5],
			[2, 3, 5],
			[3, 2, 5],
			[4, 1, 5],
			[1, 5, 6],
			[2, 4, 6],
			[4, 2, 6],
			[5, 1, 6],
			[1, 6, 7],
			[2, 5, 7],
			[3, 4, 7],
			[4, 3, 7],
			[5, 2, 7],
			[6, 1, 7],
			[1, 7, 8],
			[2, 6, 8],
			[3, 5, 8],
			[5, 3, 8],
			[6, 2, 8],
			[7, 1, 8],
			[1, 8, 9],
			[2, 7, 9],
			[3, 6, 9],
			[4, 5, 9],
			[5, 4, 9],
			[6, 3, 9],
			[7, 2, 9],
			[8, 1, 9],
		]));
	});
});

describe('VERSION', () => {
	it('バージョン番号を取得できること。', () => {
		assert.strictEqual(Solver.VERSION, '0.0.1');
	});
});
