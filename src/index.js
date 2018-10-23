class State {
	constructor({
		notZero = [],
		expressions = [],
		answer = [],
		unused = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	} = {}) {
		this._notZero = new Set(notZero);
		this._expressions = expressions.map(
			({ moveUp, terms, sum }) => ({ moveUp, terms: [...terms], sum })
		);
		this._answer = new Map(answer);
		this._unused = new Set(unused);
	}

	get notZero() { return this._notZero; }
	get expressions() { return this._expressions; }
	get answer() { return this._answer; }
	get unused() { return this._unused; }
}

const checkExpressions = (state) => {
	// 破壊的。下位桁の等式の成立判定を行う。
	// 等式成立を確認した桁は、state.expressions から削除する。
	// 破綻を確認した場合は false、そうでなければ true を返す。

	const { expressions, answer } = state;
	while (expressions.length) {
		const { moveUp, terms, sum } = expressions[expressions.length - 1];
		if (!answer.has(sum)) return true;
		if (terms.find((v) => !answer.has(v))) return true;
		const real = terms.reduce(((acc, v) => acc + answer.get(v)), moveUp);
		if (real % 10 !== answer.get(sum)) return false;
		expressions.pop();
		if (expressions.length === 0) return real < 10;
		expressions[expressions.length - 1].moveUp = ~~(real / 10);
	}
	return true;
};

const getKeys = (state) => {
	// 文字一覧を、下位桁に出現するもの順に並べたものを返す。

	const keys = new Set;
	const { expressions } = state;
	for (let i = expressions.length - 1; i >= 0; i--) {
		const expression = expressions[i];
		expression.terms.forEach(v => keys.add(v));
		keys.add(expression.sum);
	}
	return [...keys];
};

const search = function*(initialState) {
	// 解を探索する。

	const keys = getKeys(initialState);
	const stack = [{ state: initialState, depth: 0 }];
	while (stack.length) {
		const { state, depth } = stack.pop();
		if (!checkExpressions(state)) continue;
		if (depth >= keys.length) {
			yield state.answer;
			continue;
		}
		const key = keys[depth];
		const notZero = state.notZero.has(key);
		state.unused.forEach((n) => {
			if (notZero && n === 0) return;
			const newState = new State(state);
			newState.answer.set(key, n);
			newState.unused.delete(n);
			stack.push({ state: newState, depth: depth + 1 });
		});
	}
};

module.exports = class {
	static *solve(...sentences) {
		// 覆面の各項と和を順に並べたものを引数に、解の各項と和を順に並べたものを繰り返す。
		// 例: [...solve('SEND', 'MORE', 'MONEY')] => [ [ 9567, 1085, 10652 ] ]

		const terms = [...sentences];
		const sum = terms.pop();
		const maxLength = sum.length;
		if (terms.find((term) => term.length > maxLength)) return;	// 和の桁数よりも多い桁の項が存在する。
		const state = new State;
		[...sentences].forEach((sentence) => state.notZero.add(sentence[0]));
		for (let i = 0; i < maxLength; i++) {
			const expressionTerms = [];
			terms.forEach((term) => {
				if (term.length < maxLength - i) return;
				expressionTerms.push(term[i + term.length - maxLength]);
			});
			state.expressions.push({
				moveUp: i === maxLength - 1 ? 0 : null,
				terms: expressionTerms,
				sum: sum[i],
			});
		}
		for (const answer of search(state)) {
			yield [...sentences].map(
				(sentence) => +[...sentence].map((key) => answer.get(key)).join('')
			);
		}
	}

	static get VERSION() {
		return '0.0.1';
	}
};
