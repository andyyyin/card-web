import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import AccuracyState from "../state/accuracy";

export default class Accuracy extends BaseCard {

	name = '精准'

	baseValue = 1

	static type = CARD_BASE_TYPE.ABILITY

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(AccuracyState)
	}

}