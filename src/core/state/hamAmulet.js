import BaseState from "./base";
import {CARD_BASE_TYPE} from "../enum";

export default class HamAmulet extends BaseState{

	name = '火腿护符'

	iconPic = 'hamAmulet'

	follow = true

	level = null

	desc = '每场战斗结束恢复6点HP'

	onSuperposition () {/* 不可叠加 */}

	async onBattleEnd (fn) {
		await fn.heroChangeHp(6)
	}

}