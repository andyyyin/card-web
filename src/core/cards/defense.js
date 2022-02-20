import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Defense extends BaseCard {

	isBase = true

	name = '防御'

	baseValue = 5

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

}