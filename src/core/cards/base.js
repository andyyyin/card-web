import {CARD_BASE_TYPE} from '../enum'
import {stateDamageFix} from "../algorithm";

let _idCache = 1000

export default class BaseCard {

	cost = 1;
	name
	baseValue;

	type;

	constructor() {
		this.id = ++_idCache
		console.log('id', this.id)
	}

	get typeClassName () {
		switch (this.type) {
			case CARD_BASE_TYPE.SKILL: return 'type-skill'
			case CARD_BASE_TYPE.ATTACK: return 'type-attack'
			case CARD_BASE_TYPE.ABILITY: return 'type-ability'
			case CARD_BASE_TYPE.STATE: return 'type-state'
		}
		return '#999999'
	}

	onDraw () {}
	onHandEndTurn () {}

	onLaunch (fn) {}
}