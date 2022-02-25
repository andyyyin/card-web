import BaseState from "./base";
import {CARD_BASE_TYPE} from "../enum";
import Strength from "./strength";

export default class Anger extends BaseState{

	name = '愤怒'

	priority = 10

	icon = 'anger'

	async onLaunchCard (fn, card) {
		if (card.type === CARD_BASE_TYPE.SKILL) {
			fn.enemyPushState(Strength, this.level)
		}
	}

}