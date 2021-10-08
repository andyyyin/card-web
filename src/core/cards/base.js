import {CARD_BASE_TYPE} from '../enum'
import {stateDamageFix} from "../algorithm";

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