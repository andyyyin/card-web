import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Poisoned from "../state/poisoned";

export default class PoisonedStab extends BaseCard {

	name = '毒刃'

	baseValue = 6

	type = CARD_BASE_TYPE.ATTACK

	desc = '造成3点中毒'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		fn.enemyPushState(Poisoned, 3)
	}

}