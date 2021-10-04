import {CARD_BASE_TYPE} from '../enum'

export default class BaseCard {
	cost = 1;

	baseValue;

	type;

	get typeClassName () {
		switch (this.type) {
			case CARD_BASE_TYPE.SKILL: return 'type-skill'
			case CARD_BASE_TYPE.ATTACK: return 'type-attack'
			case CARD_BASE_TYPE.ABILITY: return 'type-ability'
		}
		return '#999999'
	}

	onDraw () {

	}

	onLaunch (execute) {

	}
}

BaseCard.prototype.damageFix = function (execute) {
	let value = this.baseValue
	const stateList = execute.getHeroState()
	value = stateList.reduce((result, state) => {
		return result + (state.damageFixAdd || 0)
	}, value)
	value = stateList.reduce((result, state) => {
		return result * (state.damageFixMulti || 1)
	}, value)
	value = value >= this.baseValue ? Math.floor(value) : Math.ceil(value)
	return value
}