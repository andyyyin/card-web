import BaseState from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class Team extends BaseState{

	name = '一群'

	icon = 'team'

	async finalDamageFilter (fn, damage, isThrough) {
		if (!isThrough) return damage
		let {hp, mhp} = fn.getEnemyHp()
		if (damage < hp) return damage
		let throughTime = 1 + Math.floor((damage - hp) / mhp)
		if (throughTime > this.level) {
			this.levelChange(-throughTime)
			return mhp
		}
		this.levelChange(-throughTime)
		return (damage - hp) % mhp
	}

	async onHpEmpty (fn) {
		fn.enemyChangeHp(10000)
		this.levelChange(-1)
	}

}