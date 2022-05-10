import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Ninjutsu from "../state/ninjutsu";
import BaseAI from "./base";

export default class Ninja extends BaseAI{

	static level = 2

	prepareAction

	img = 'ninja'

	mhp = 50

	baseDamage = 5

	actionList = []

	prepare(fn) {
		const turnNum = fn.getTurnNum()
		if (turnNum % 3 === 0) {
			this.actionList = [{intention: INTENTION.STAY, run: this.stay.bind(this)}]
		} else if ((turnNum - 1) % 3 === 0 && turnNum > 3) {
			this.baseDamage = 10
			this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this), time: 2}]
		} else {
			this.baseDamage = 5
			this.actionList = [{intention: INTENTION.ATTACK, run: this.commonAttack.bind(this), time: 2}]
		}
		return super.prepare();
	}

	async onStartNewTurn (fn) {
		fn.enemyPushState(Ninjutsu, 3)
	}

}