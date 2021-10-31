
const stateAttrFixProcess = (value, stateList, attrName) => {
	let org = value
	value = stateList.reduce((result, state) => {
		if (!state.active) return result
		return result + ((state[attrName] && state[attrName].add) || 0)
	}, value)
	value = stateList.reduce((result, state) => {
		if (!state.active) return result
		return result * ((state[attrName] && state[attrName].multi) || 1)
	}, value)
	return value >= org ? Math.ceil(value) : Math.floor(value)
}

export const stateDamageFix = (value, stateList) => {
	return stateAttrFixProcess(value, stateList, 'damageFix')
}

export const stateGetDamageFix = (value, stateList) => {
	return stateAttrFixProcess(value, stateList, 'getDamageFix')
}

export const stateDefenseFix = (value, stateList) => {
	return stateAttrFixProcess(value, stateList, 'defenseFix')
}