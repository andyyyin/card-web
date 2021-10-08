
const stateAttrFixProcess = (value, stateList, attrName) => {
	let org = value
	value = stateList.reduce((result, state) => {
		return result + (state[attrName + 'FixAdd'] || 0)
	}, value)
	value = stateList.reduce((result, state) => {
		return result * (state[attrName + 'FixMulti'] || 1)
	}, value)
	return value >= org ? Math.floor(value) : Math.ceil(value)
}

export const stateDamageFix = (value, stateList) => {
	return stateAttrFixProcess(value, stateList, 'damage')
}

export const stateDefenseFix = (value, stateList) => {
	return stateAttrFixProcess(value, stateList, 'defense')
}