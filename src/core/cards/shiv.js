import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Accuracy from "../state/accuracy";

export default class Shiv extends BaseCard {

	static baseCost = 0

	static name = '小刀'

	static baseValue = 4

	static type = CARD_BASE_TYPE.ATTACK

	static exhaust = true

	constructor() {
		super();
	}

	updateRel(fn) {
		let accuracy = fn.heroFindState(Accuracy)
		this.baseValue = 4 + ((accuracy && accuracy.level) || 0) * 4
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
	}

}