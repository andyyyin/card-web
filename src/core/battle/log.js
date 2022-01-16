

export default (fn, state) => {

	fn.pushLog = (param) => {
		let newLog = typeof param === 'string' ? {text: param} : param
		state.logs.push(newLog)
	}

	return fn
}