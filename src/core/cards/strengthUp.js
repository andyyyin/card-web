import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Strength from "../state/strength";

export default class StrengthUp extends BaseCard {

	name = '力量'

	baseValue = 2

	type = CARD_BASE_TYPE.ABILITY

	constructor() {
		super();
	}

	onLaunch(execute) {
		execute.heroPushState(Strength, this.baseValue)
	}

}