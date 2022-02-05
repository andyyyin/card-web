import BaseState from "./base";

export default class AThousandCuts extends BaseState{

	name = '余像'

	icon = 'shieldEchoes'

	async onLaunchCard(fn) {
		await super.onLaunchCard(fn);
		fn.heroChangeDefense(this.level)
	}

}