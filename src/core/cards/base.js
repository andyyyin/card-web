import {CARD_BASE_TYPE} from '../enum'

let _idCache = 1000

export default class BaseCard {

	constructor() {
		this.id = ++_idCache
		console.log('id', this.id)
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

	isBase; // 是否是基础牌（基础牌不进入卡库）

	name
	type;

	baseValue;
	attackTime;

	desc;

	comboFlag;

	exhaust; // 是否具有消耗属性
	unplayable // 是否不可打出
	retain // 是否具有保留属性
	ethereal; // 是否具有虚无属性，当此卡在手牌中，结束回合时消耗
	innate; // 是否具固有属性，固有属性的卡牌在战斗一开始就在手牌中
	tempRetain // 当前回合临时保留属性
	get isRetain () {
		return this.retain || this.tempRetain
	}

	extraLaunchCount = 0 // 额外发动次数，打出此牌的时候额外打出n次

	areaAttack; // 是否范围攻击，范围攻击拥有team状态敌人的时候可以击穿hp限制造成全额伤害

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

BaseCard.prototype.commonStrike = async function (fn) {
	let time = this.attackTime || 1
	for (let i = 0; i < time; i++) {
		await fn.strikeEnemy(this.baseValue, this.areaAttack)
	}
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