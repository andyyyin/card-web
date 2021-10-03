import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Strength from "../state/strength";

export default class StrengthUp extends BaseCard {

	name = '力量'

	baseValue = 2

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
		this.id = Math.floor(Math.random() * 100000)
	}

	onLaunch(execute) {
		execute.heroPushState(new Strength(this.baseValue))
	}

}