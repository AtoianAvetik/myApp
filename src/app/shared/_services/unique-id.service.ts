import { Injectable } from '@angular/core';

interface Dublicate {
	dublicate: string;			// the generated id that was duplicated
	dublicateCount: number;		// 0 is the first duplication, so 1 is the second duplication etc
	indexCreated: number;		// the index where the original ID was created
	indexDublicated: number;	// the index where the original ID is duplicated
}

@Injectable()
export class UniqueID {
	generateID() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}

	UUID () {
		function chr4() {
			return Math.random().toString(16).slice(-4);
		}
		return chr4() + chr4() +
			'-' + chr4() +
			'-' + chr4() +
			'-' + chr4() +
			'-' + chr4() + chr4() + chr4();
	}

	checkDuplicates(generator, count) {
		const hash = {};
		const dupe = [];
		for (let idx = 0; idx < count; ++idx) {
			const gen = generator(idx); // generate our unique ID

			// if it already exists, then it has been duplicated
			if (typeof hash[gen] !== 'undefined') {
				dupe.push({
					duplicate: gen,
					indexCreated: hash[gen],
					indexDuplicated: idx,
					duplicateCount: dupe.filter(function(cur) {return cur.duplicate === gen}).length,
				});
			}
			hash[gen] = idx;
		}
		return dupe;
	}
}
