const PromiseWithResolvers = () => {
	let resolve, reject;

	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return { promise, resolve, reject };
};

export const waitUntil = (delay) => {
	if (delay === 0) return;

	const { promise, resolve } = Promise?.withResolvers() ?? PromiseWithResolvers();

	setTimeout(resolve, delay);

	return promise;
};

/**
 *
 * @param {string} value
 * @returns {ReturnType<typeof document.querySelector>}
 */
export const select = (value) => document.querySelector(value);
/**
 *
 * @param {string} value
 * @returns {ReturnType<typeof document.querySelectorAll>}
 */
export const selectAll = (value) => document.querySelectorAll(value);
