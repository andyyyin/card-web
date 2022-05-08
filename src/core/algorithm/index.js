
const stateAttrFixProcess = (value, stateList, attrName) => {
	let add = 0, multi = 1
	stateList.forEach(state => {
		if (!state.active || !state[attrName]) return
		add += (state[attrName].add || 0)
		multi *= (state[attrName].multi || 1)
	})
	let fixed = (value + add) * multi
	if (fixed <= 0) return 0
	return fixed >= value ? Math.ceil(fixed) : Math.floor(fixed) // 远离原始值
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