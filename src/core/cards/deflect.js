import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Deflect extends BaseCard {

	baseCost = 0

	name = '偏斜'

	baseValue = 4

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

}