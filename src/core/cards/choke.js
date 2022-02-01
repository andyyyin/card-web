import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import ChokeState from '../state/choke'

export default class Choke extends BaseCard {

	baseCost = 2

	name = '锁喉'

	baseValue = 12

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

	async afterLaunch(fn) {
		fn.enemyPushState(ChokeState)
	}

}