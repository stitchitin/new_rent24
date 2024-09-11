import { isFunction } from "../typeof.js";

const createStore = (initializer, options = {}) => {
	let state;

	const listeners = new Set();

	const getState = () => state;

	const getInitialState = () => initialState;

	const { equalityFn = Object.is } = options;

	const setState = (newState, shouldReplace) => {
		const previousState = state;

		const nextState = isFunction(newState) ? newState(previousState) : newState;

		if (equalityFn(nextState, state)) return;

		state = !shouldReplace ? { ...state, ...nextState } : nextState;

		listeners.forEach((onStoreChange) => onStoreChange(state, previousState));
	};

	const subscribe = (onStoreChange) => {
		listeners.add(onStoreChange);

		return () => listeners.delete(onStoreChange);
	};

	subscribe.withSelector = (selector, onStoreChange, subscribeOptions = {}) => {
		const { equalityFn: sliceEqualityFn = equalityFn, fireListenerImmediately = false } =
			subscribeOptions;

		if (fireListenerImmediately) {
			const slice = selector(getState());

			onStoreChange(slice, slice);
		}

		const handleOnStoreChange = ($state, prevState) => {
			const previousSlice = selector(prevState);
			const slice = selector($state);

			if (sliceEqualityFn(slice, previousSlice)) return;

			onStoreChange(slice, previousSlice);
		};

		return subscribe(handleOnStoreChange);
	};

	const api = { getInitialState, getState, setState, subscribe };

	const initialState = (state = initializer(getState, setState, api));

	return api;
};

export { createStore };
