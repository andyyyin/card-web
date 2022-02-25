import BaseState from "./base";
import Poisoned from "./poisoned";

export default class Envenom extends BaseState{

	name = '涂毒'

	icon = 'envenom'

	priority = 6

	async onHostLaunchAttack(fn, damage) {
		await super.onHostLaunchAttack(fn, damage);
		if (damage <= 0) return
		fn.opponentPushState(this, Poisoned, this.level)
	}

}