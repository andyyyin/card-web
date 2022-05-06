import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Poisoned from "../state/poisoned";

export default class Poison extends BaseCard {

	static name = '毒药'

	static type = CARD_BASE_TYPE.SKILL

	static desc = '造成5点中毒'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.enemyPushState(Poisoned, 5)
	}

}