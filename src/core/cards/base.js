import {CARD_BASE_TYPE} from '../enum'

let _idCache = 1000

export default class BaseCard {

	baseCost = 1;
	costFixInTurn = 0;
	costFixInBattle = 0;

	get cost () {
		let result = this.baseCost + this.costFixInBattle + this.costFixInTurn
		return result > 0 ? result : 0
	}

	name
	baseValue;

	type;

	comboFlag;

	constructor() {
		this.id = ++_idCache
		console.log('id', this.id)
		this.type = this.constructor.type
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
	async onHandTurnEnd () {}

	async onLeaveFromHand () {}

	async onTurnEnd() {
		this.costFixInTurn = 0
	}
	async onBattleEnd() {
		this.costFixInBattle = 0
	}

	async onLaunch (fn) {}
	async afterLaunch (fn) {}

	checkCombo (fn) {}
}

BaseCard.prototype.setCostFixInTurn = function (value) {
	this.costFixInTurn = value
}
BaseCard.prototype.addCostFixInTurn = function (value) {
	this.costFixInTurn += value
}
BaseCard.prototype.setCostFixInBattle = function (value) {
	this.costFixInBattle = value
}
BaseCard.prototype.addCostFixInBattle = function (value) {
	this.costFixInBattle += value
}