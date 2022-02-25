import BaseState from "./base";
import Poisoned from "./poisoned";

export default class NoxiousFumes extends BaseState{

	name = '剧毒空气'

	icon = 'noxiousFumes'

	priority = 6

	async onHostStartTurn (fn) {
		fn.enemyPushState(Poisoned, this.level * 2)
	}

}