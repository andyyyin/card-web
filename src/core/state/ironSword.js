import BaseState from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class IronSword extends BaseState{

	name = '铁剑'

	iconPic = 'ironSword'

	follow = true

	level = 4

	desc = '每累计打出的第5张攻击牌伤害翻倍'

	onSuperposition () {/* 不可叠加 */}

	async onLaunchCard (fn, card) {
		if (card.type === CARD_BASE_TYPE.ATTACK) {
			if (this.level === 0 && this.comboFlag) {
				this.level = 5
				this.comboFlag = false
				this.damageFix = null
			}
			this.level -= 1
			if (this.level === 0) {
				this.damageFix = {multi: 2}
				this.comboFlag = true
			}
		}
	}
}