import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Defense extends BaseCard {

	static isBase = true

	static name = '防御'

	static baseValue = 5

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

}