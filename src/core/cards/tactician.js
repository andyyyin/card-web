import BaseCard from "./base";
import {CARD_BASE_TYPE} from '../enum'

export default class Tactician extends BaseCard {

	name = '战术大师'

	static type = CARD_BASE_TYPE.SKILL

	desc = '如果此牌被丢弃，获得1点能量'

	unplayable = true

	constructor() {
		super();
	}

	async onDrop(fn) {
		await fn.gainPower(1)
	}

}