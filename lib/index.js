'use strict';

function asyncGetValueFromArr(arr, i) {
	return new Promise(resolve => setImmediate(() => resolve(arr[i])));
}

function rangeObjToStr(o) {
	return o.first === o.last ? `${o.first}` : `${o.first}-${o.last}`;
}

module.exports.arrToRange = async function (arr) {
	if (!Array.isArray(arr) || !arr.length) return '';

	const ranges = [];			// массив собранных диапазонов
	let anticipated = null;	// ожидаемое значение в диапазоне
	let currentRange = null; // { first: X, last: Y }
	const initCurrentRange = v => {
		currentRange = { first: v, last: v };
		anticipated = v;
	};
	for (let i = 0; i < arr.length; ++i) {
		const current = parseInt(await asyncGetValueFromArr(arr, i), 10);
		// игнорируем неподходящие по правилам значения
		if (isNaN(current) || (currentRange && currentRange.last > current)) {
			continue;
		}
		if (!currentRange) {
			initCurrentRange(current);
		} else {
			++anticipated;
			if (anticipated === current) { // диапазон продолжается
				currentRange.last = current;
			} else { // диапазон завершился
				ranges.push(rangeObjToStr(currentRange));
				initCurrentRange(current);
			}
		}
	} // for (let i = 0; i < arr.length; ++i) {
	if (currentRange) ranges.push(rangeObjToStr(currentRange));

	return Promise.resolve(ranges.join(','));
}
