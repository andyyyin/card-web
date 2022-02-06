import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Poisoned from "../state/poisoned";

export default class Poison extends BaseCard {

	name = '毒药'

	type = CARD_BASE_TYPE.SKILL

	desc = '造成5点中毒'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.enemyPushState(Poisoned, 5)
	}

}