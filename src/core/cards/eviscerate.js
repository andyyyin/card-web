import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Eviscerate extends BaseCard {

	baseCost = 3

	name = '掏空'

	baseValue = 7

	static type = CARD_BASE_TYPE.ATTACK

	dropCountCache = 0

	constructor() {
		super();
	}

	checkCombo(fn) {
		let count = fn.getDroppedCountOfTurn()
		let addNum = count - this.dropCountCache
		this.dropCountCache = count
		this.addCostFixInTurn(-addNum)
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