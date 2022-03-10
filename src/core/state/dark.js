import BaseState from "./base";
import HalfDamageThisTurn from "./halfDamageThisTurn";

export default class Dark extends BaseState{

	name = '黑暗'

	icon = 'dark'

	priority = 2

	desc = '如果上一回合对手没有攻击或使用过攻击牌，则本回合攻击伤害减半'

	enemyAttack = false
	heroAttack = false

	constructor() {
		super();
		this.level = 0
	}

	async onEnemyLaunchAttack (fn, card) {
		this.enemyAttack = true
	}

	async onHeroLaunchAttack (fn, card) {
		let state = fn.enemyFindState(HalfDamageThisTurn)
		if (state) state.removeSelf()
	}

	async onHeroStartTurn (fn) {
		if (this.enemyAttack) {
			this.enemyAttack = false
		} else {
			fn.heroPushState(HalfDamageThisTurn)
		}
		fn.enemyPushState(HalfDamageThisTurn)
	}

}