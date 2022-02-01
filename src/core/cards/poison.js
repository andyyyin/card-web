import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Poisoned from "../state/poisoned";

export default class Poison extends BaseCard {

	name = '毒药'

	stateValue = 5

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.enemyPushState(Poisoned, this.stateValue)
	}

}