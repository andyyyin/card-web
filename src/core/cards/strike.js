import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Strike extends BaseCard {

	name = '打击'

	baseValue = 10

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
		this.id = Math.floor(Math.random() * 10000)
	}

	onLaunch(execute) {
		const value = this.damageFix(execute)
		execute.strikeEnemy(value)
	}

}