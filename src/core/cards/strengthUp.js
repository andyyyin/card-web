import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Strength from "../state/strength";

export default class StrengthUp extends BaseCard {

	name = '力量'

	static type = CARD_BASE_TYPE.ABILITY

	desc = '获得2点力量'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroPushState(Strength, 2)
	}

}