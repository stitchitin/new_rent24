export const isObject = (value) => {
	return (
		typeof value === "object" && value !== null && !(value instanceof FormData) && !Array.isArray(value)
	);
};

export const isFunction = (value) => typeof value === "function";
