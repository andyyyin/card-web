import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";

export default class HeelHook extends BaseCard {

	name = '绊脚'

	baseValue = 5

	static type = CARD_BASE_TYPE.ATTACK

	desc = '如果敌人有虚弱状态，获得1点能量，抽一张牌'

	constructor() {
		super();
	}

	updateRel(fn) {
		this.comboFlag = !!fn.enemyFindState(Weak)
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		if (this.comboFlag) {
			fn.gainPower()
			await fn.drawCard()
		}
	}

}