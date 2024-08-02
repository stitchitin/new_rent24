export { callApi } from "https://esm.run/@zayne-labs/callapi@0.4.6";

export * as dateFns from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

import "https://cdn.jsdelivr.net/npm/sweetalert2@11";
export { default as Swal } from "https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm";

export const sweetAlert = (value) => Swal.fire(value);

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
