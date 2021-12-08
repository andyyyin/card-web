

export default (state) => {
	const fn = {}

	fn.pushLog = (param) => {
		let newLog = typeof param === 'string' ? {text: param} : param
		state.logs.push(newLog)
	}

	return fn
}