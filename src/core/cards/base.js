import {CARD_BASE_TYPE} from '../enum'

let _idCache = 1000

export default class BaseCard {

	constructor() {
		this.id = ++_idCache
		console.log('id', this.id)
		this.type = this.constructor.type
		this.baseCost = this.constructor.baseCost || 1
		this.desc = this.constructor.desc
		this.unplayable = this.constructor.unplayable
		this.retain = this.constructor.retain
		this.exhaust = this.constructor.exhaust
	}

	baseCost = 1;
	costFixOfTurn = 0;
	costFixOfBattle = 0;
	costFixBeforeLaunch = 0;

	xCost

	get cost () {
		let result = this.baseCost + this.costFixOfBattle + this.costFixOfTurn + this.costFixBeforeLaunch
		return result > 0 ? result : 0
	}

	name
	type;

	baseValue;
	attackTime;

	desc;

	comboFlag;

	unplayable
	retain
	tempRetain
	get isRetain () {
		return this.retain || this.tempRetain
	}

	extraLaunchCount = 0

	get typeClassName () {
		switch (this.type) {
			case CARD_BASE_TYPE.SKILL: return 'type-skill'
			case CARD_BASE_TYPE.ATTACK: return 'type-attack'
			case CARD_BASE_TYPE.ABILITY: return 'type-ability'
			case CARD_BASE_TYPE.STATE: return 'type-state'
		}
		return '#999999'
	}

	async onDraw (fn) {}
	async onDrop (fn) {}
	async onHandTurnEnd () {}

	async onLeaveFromHand () {}

	async onTurnEnd() {
		this.costFixOfTurn = 0
	}
	async onBattleEnd() {
		this.costFixOfBattle = 0
	}

	async onLaunch (fn) {}
	async afterLaunch (fn) {
		this.costFixBeforeLaunch = 0
	}

	async onRetain (fn) {
		this.tempRetain = false
	}

	updateRel (fn) {}
}

BaseCard.prototype.setCostFixOfTurn = function (value) {
	this.costFixOfTurn = value
}
BaseCard.prototype.addCostFixOfTurn = function (value) {
	this.costFixOfTurn += value
}
BaseCard.prototype.setCostFixOfBattle = function (value) {
	this.costFixOfBattle = value
}
BaseCard.prototype.addCostFixOfBattle = function (value) {
	this.costFixOfBattle += value
}
BaseCard.prototype.setCostFixBeforeLaunch = function (value) {
	this.costFixBeforeLaunch = value
}
BaseCard.prototype.addCostFixBeforeLaunch = function (value) {
	this.costFixBeforeLaunch += value
}
BaseCard.prototype.retainOnce = function () {
	this.tempRetain = true
}