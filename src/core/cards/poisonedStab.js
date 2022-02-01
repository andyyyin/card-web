import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Poisoned from "../state/poisoned";

export default class PoisonedStab extends BaseCard {

	name = '毒刃'

	baseValue = 6

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Poisoned, 4)
	}

}