import BaseCard from "./base";
import {CARD_BASE_TYPE} from "../enum";
import BlurState from "../state/blur"

export default class Blur extends BaseCard {

	name = '残影'

	baseValue = 5

	static type = CARD_BASE_TYPE.SKILL

	constructor() {
		super();
	}

	async onLaunch(fn) {
		fn.heroChangeDefense(this.baseValue)
		fn.heroPushState(BlurState)
	}

}