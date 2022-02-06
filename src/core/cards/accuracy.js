import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import AccuracyState from "../state/accuracy";

export default class Accuracy extends BaseCard {

	name = '精准'

	type = CARD_BASE_TYPE.ABILITY

	desc = '小刀攻击力+4'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(AccuracyState)
	}

}