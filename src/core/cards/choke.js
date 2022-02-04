import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import ChokeState from '../state/choke'

export default class Choke extends BaseCard {

	baseCost = 2

	name = '锁喉'

	baseValue = 12

	static type = CARD_BASE_TYPE.ATTACK

	desc = '本回合后续每发动一张卡牌，对敌人发动3点攻击'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

	async afterLaunch(fn) {
		await super.afterLaunch(fn)
		fn.enemyPushState(ChokeState)
	}

}