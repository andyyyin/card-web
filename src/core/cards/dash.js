import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Accuracy from "../state/accuracy";

export default class Dash extends BaseCard {

	static baseCost = 2

	static name = '猛冲'

	static baseValue = 10

	static type = CARD_BASE_TYPE.ATTACK

	static desc = '获得10点护甲'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		await fn.heroChangeDefense(this.baseValue)
	}

}