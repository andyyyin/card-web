import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class survivor extends BaseCard {

	name = '幸存'

	baseValue = 8

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
	}

	async afterLaunch(fn) {
		fn.dropSelectCard()
	}

}