import { isFunction } from "../typeof.js";

const createStore = (initializer, options = {}) => {
	let state;

	const listeners = new Set();

	const { equalityFn = Object.is } = options;

	const setState = (newState, shouldReplace) => {
		const nextState = isFunction(newState) ? newState(state) : newState;

		if (equalityFn(nextState, state)) return;

		const previousState = state;

		state = !shouldReplace ? { ...state, ...nextState } : nextState;

		listeners.forEach((onStoreChange) => onStoreChange(state, previousState));
	};

	const getState = () => state;

	const getInitialState = () => initialState;

	const subscribe = (onStoreChange) => {
		listeners.add(onStoreChange);

		return () => listeners.delete(onStoreChange);
	};

	const api = { getState, getInitialState, setState, subscribe };

	const initialState = (state = initializer(getState, setState, api));

	return api;
};

export { createStore };
