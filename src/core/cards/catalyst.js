import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Poisoned from "../state/poisoned";

export default class Catalyst extends BaseCard {

	name = '催化剂'

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		let poisoned = fn.enemyFindState(Poisoned)
		poisoned && poisoned.levelChange(poisoned.level)
	}

}