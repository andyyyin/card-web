import {CARD_BASE_TYPE} from '../enum'

let _idCache = 1000

export default class BaseCard {

	baseCost = 1;
	fixedCost;

	get cost () { return this.fixedCost === undefined ? this.baseCost : this.fixedCost }

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

	async onDraw () {}
	async onHandEndTurn () {}

	async onLeaveFromHand () {
		this.fixedCost = undefined
	}

	async onLaunch (fn) {}
	async afterLaunch (fn) {}
}

BaseCard.prototype.tempFixCost = function (value) {
	this.fixedCost = this.cost + 1
}