import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Accuracy from "../state/accuracy";

export default class Shiv extends BaseCard {

	baseCost = 0

	name = '小刀'

	baseValue = 4

	type = CARD_BASE_TYPE.ATTACK

	exhaust = true

	constructor() {
		super();
	}

	checkCombo(fn) {
		let accuracy = fn.heroFindState(Accuracy)
		this.baseValue = 4 + (accuracy && accuracy.level * 4) || 0
	}

	async onLaunch(fn) {
		fn.strikeEnemy(this.baseValue)
	}

}