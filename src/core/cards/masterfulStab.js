import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class MasterfulStab extends BaseCard {

	baseCost = 0

	name = '精湛刀法'

	baseValue = 12

	static type = CARD_BASE_TYPE.ATTACK

	desc = '每当你失去hp，此卡在本场战斗上涨1点消费'

	constructor() {
		super();
	}

	comboCountCache = 0

	updateRel(fn) {
		let count = fn.getBattleLoseHpCount()
		let newCount = count - this.comboCountCache
		this.comboCountCache = count
		this.addCostFixOfBattle(newCount)
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}