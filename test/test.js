'use strict';

const arrToRange = require('../lib/index').arrToRange
	, assert = require('assert')
	;

const tests = [
	{
		descr: 'ends with null'
		, arr: [null, 'sdfsdf', 1, 3, 4, 5, 7, 8, 9, 3, 10, 12, 24, 25, 26, 28, null]
		, str: '1,3-5,7-10,12,24-26,28'
	}
	, {
		descr: 'one range'
		, arr: [24, 25, 26, 27]
		, str: '24-27'
	}
	, {
		descr: 'ends with single number'
		, arr: [24, 25, 26, 27, 29]
		, str: '24-27,29'
	}
	, {
		descr: 'simple one number'
		, arr: [10000]
		, str: '10000'
	}
	, {
		descr: 'empty array'
		, arr: []
		, str: ''
	}
	, {
		descr: 'array without numbers'
		, arr: [null, '']
		, str: ''
	}
];

describe('await arrToRange', function () {
	for (let o of tests) {
		it(o.descr, async function () {
			const str = await arrToRange(o.arr);
			assert.equal(str, o.str);
		});
	}
});