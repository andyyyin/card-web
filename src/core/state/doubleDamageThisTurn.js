import BaseState from "./base";

export default class DoubleDamageThisTurn extends BaseState{

	name = '双倍伤害'

	icon = 'powerful'

	constructor() {
		super();
		this.level = 0
	}

	get damageFix () {
		return {multi: 2}
	}

	async onHostEndTurn() {
		await super.onHostEndTurn();
		this.removeSelf()
	}

}