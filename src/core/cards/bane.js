import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Poisoned from "../state/poisoned";

export default class Bane extends BaseCard {

	static name = '灾祸'

	static baseValue = 7

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '如果敌人有中毒状态，则发动两次攻击'

	constructor() {
		super();
	}

	updateRel(fn) {
		this.comboFlag = !!fn.enemyFindState(Poisoned)
		this.attackTime = this.comboFlag && 2
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		if (fn.enemyFindState(Poisoned)) {
			await fn.strikeEnemy(this.baseValue)
		}
	}

}