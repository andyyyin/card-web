import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Deflect extends BaseCard {

	static baseCost = 0

	static name = '偏斜'

	static baseValue = 4

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

}