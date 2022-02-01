import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Weak from "../state/weak";

export default class Acrobatics extends BaseCard {

	name = '杂技'

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		await fn.drawCard(3)
	}

	async afterLaunch(fn) {
		await fn.dropSelectCard()
	}

}