import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Eviscerate extends BaseCard {

	baseCost = 3

	name = '掏空'

	baseValue = 7
	attackTime = 3

	type = CARD_BASE_TYPE.ATTACK

	desc = '在当前回合每丢弃一张牌，此牌的消费下降1点'

	dropCountCache = 0

	constructor() {
		super();
	}

	updateRel(fn) {
		let count = fn.getDroppedCountOfTurn()
		let addNum = count - this.dropCountCache
		this.dropCountCache = count
		this.addCostFixOfTurn(-addNum)
	}

	async onTurnEnd() {
		await super.onTurnEnd();
		this.dropCountCache = 0
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		await fn.strikeEnemy(this.baseValue)
		await fn.strikeEnemy(this.baseValue)
	}

}