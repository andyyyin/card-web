import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import {stateDamageFix} from "../algorithm";

export default class Strike extends BaseCard {

	name = '打击'

	baseValue = 6

	type = CARD_BASE_TYPE.ATTACK

	constructor() {
		super();
	}

	onLaunch(execute) {
		const stateList = execute.getHeroState()
		const value = stateDamageFix(this.baseValue, stateList)
		execute.strikeEnemy(value)
	}

}