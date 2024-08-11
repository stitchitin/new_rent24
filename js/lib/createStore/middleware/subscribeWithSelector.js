const subscribeWithSelector = (initializer) => (set, get, api) => {
	const originalSubscribe = api.subscribe;

	api.subscribe = (selector, optionalOnStoreChange, options = {}) => {
		// == If optionalListener is not provided, assume the selector to be the listener and pass it to the original subscribeFn
		if (!optionalOnStoreChange) {
			return originalSubscribe(selector);
		}

		const { equalityFn = Object.is, fireListenerImmediately = false } = options;

		let slice = selector(api.getState());

		if (fireListenerImmediately) {
			optionalOnStoreChange(slice, slice);
		}

		const onStoreChange = (state) => {
			const nextSlice = selector(state);

			if (equalityFn(slice, nextSlice)) return;

			const previousSlice = slice;

			slice = nextSlice;

			optionalOnStoreChange(slice, previousSlice);
		};

		return originalSubscribe(onStoreChange);
	};

	const initialState = initializer(set, get, api);

	return initialState;
};

export { subscribeWithSelector };
