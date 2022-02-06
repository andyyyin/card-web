import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Poisoned from "../state/poisoned";
import Weak from "../state/weak";

export default class CripplingCloud extends BaseCard {

	baseCost = 2

	name = '致命毒云'

	stateValue = 5

	type = CARD_BASE_TYPE.SKILL

	desc = '造成5级中毒，3级虚弱'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.enemyPushState(Poisoned, this.stateValue)
		fn.enemyPushState(Weak, 3)
	}

}