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
 * @param {string} selector
 * @returns {ReturnType<typeof document.querySelector>}
 */
export const select = (selector, context = document) => context.querySelector(selector);
/**
 *
 * @param {string} selector
 * @returns {ReturnType<typeof document.querySelectorAll>}
 */
export const selectAll = (selector, context = document) => context.querySelectorAll(selector);