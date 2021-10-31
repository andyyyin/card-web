import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class TripleStrike extends BaseCard {

	name = '三连击'

	baseValue = 3

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	onLaunch(execute) {
		execute.strikeEnemy(this.baseValue)
		execute.strikeEnemy(this.baseValue)
		execute.strikeEnemy(this.baseValue)
	}

}