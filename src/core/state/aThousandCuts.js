import BaseState from "./base";

export default class AThousandCuts extends BaseState{

	name = '凌迟'

	icon = 'wound'

	priority = 6

	async onLaunchCard(fn) {
		await super.onLaunchCard(fn);
		fn.pureStrikeEnemy(this.level)
	}

}