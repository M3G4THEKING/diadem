export function noPermResult(result: any = []) {
	return {
		error: "Missing permissions",
		result
	};
}

export function result(result: any = undefined, error?: string = undefined) {
	return { result, error }
}
