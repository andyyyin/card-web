import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Defense extends BaseCard {

	name = '防御'

	baseValue = 7

	type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
		this.id = Math.floor(Math.random() * 10000)
	}

	onLaunch(execute) {
		execute.heroChangeDefense(this.baseValue)
	}

}