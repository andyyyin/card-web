import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Ninjutsu from "../state/ninjutsu";
import BaseAI from "./base";

export default class Ninja extends BaseAI{

	prepareAction

	img = 'ninja'

	mhp = 50

	baseDamage = 5

	actionList = []

	prepare(e) {
		const turnNum = e.getTurnNum()
		if (turnNum % 3 === 0) {
			this.actionList = [{intention: INTENTION.STAY, run: this.stay.bind(this)}]
		} else if ((turnNum - 1) % 3 === 0 && turnNum > 3) {
			this.baseDamage = 10
			this.actionList = [{intention: INTENTION.ATTACK, run: this.multiAttack.bind(this), valueStr: this.baseDamage + 'x2'}]
		} else {
			this.baseDamage = 5
			this.actionList = [{intention: INTENTION.ATTACK, run: this.multiAttack.bind(this), valueStr: this.baseDamage + 'x2'}]
		}
		return super.prepare();
	}

	onStartNewTurn (fn) {
		fn.enemyPushState(Ninjutsu, 3)
	}

	async multiAttack (fn) {
		fn.strikeHero(this.baseDamage)
		fn.strikeHero(this.baseDamage)
	}

}