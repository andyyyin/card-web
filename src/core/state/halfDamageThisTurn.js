import BaseState from "./base";

export default class HalfDamageThisTurn extends BaseState{

	name = '本回合减半伤害'

	icon = 'powerless'

	constructor() {
		super();
		this.level = 0
	}

	get damageFix () {
		return {multi: 0.5}
	}

	async onHostEndTurn() {
		await super.onHostEndTurn();
		this.removeSelf()
	}

}