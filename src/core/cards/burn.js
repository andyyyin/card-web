import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Burn extends BaseCard {

	name = '燃烧'

	type = CARD_BASE_TYPE.STATE

	baseValue = 2

	consume = true

	constructor() {
		super();
	}

	onHandEndTurn (execute) {
		execute.specialStrikeHero(this.baseValue)
	}
}