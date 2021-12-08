

export default (state) => {
	const fn = {}

	fn.pushLog = (newLog) => {
		state.logs.push(newLog)
	}

	return fn
}