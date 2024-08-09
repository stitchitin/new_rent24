import { isFunction, isObject } from "./typeof.js";

const createStore = (initializer) => {
	let state;
	const listeners = new Set();

	const setState = (newState, shouldReplace) => {
		const nextState = isFunction(newState) ? newState(state) : newState;

		if (Object.is(nextState, state)) return;

		const previousState = state;

		state =
			!shouldReplace && isObject(state) && isObject(nextState)
				? { ...state, ...nextState }
				: nextState;

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
