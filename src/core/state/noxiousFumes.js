import BaseState from "./base";
import Poisoned from "./poisoned";

export default class NoxiousFumes extends BaseState{

	name = '剧毒空气'

	icon = 'noxiousFumes'

	async onHostStartTurn (fn) {
		fn.enemyPushState(Poisoned, this.level * 2)
	}

}