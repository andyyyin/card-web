import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'
import Accuracy from "../state/accuracy";

export default class Dash extends BaseCard {

	baseCost = 2

	name = '猛冲'

	baseValue = 10

	type = CARD_BASE_TYPE.ATTACK

	desc = '获得10点护甲'

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.strikeEnemy(this.baseValue)
		await fn.heroChangeDefense(this.baseValue)
	}

}