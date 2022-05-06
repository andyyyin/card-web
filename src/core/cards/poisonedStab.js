import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Poisoned from "../state/poisoned";

export default class PoisonedStab extends BaseCard {

	static name = '毒刃'

	static baseValue = 6

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '造成3点中毒'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Poisoned, 3)
	}

}