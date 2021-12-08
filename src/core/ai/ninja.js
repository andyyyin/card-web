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
			this.actionList = [{intention: INTENTION.STAY, action: this.stay}]
		} else if ((turnNum - 1) % 3 === 0 && turnNum > 3) {
			this.baseDamage = 10
			this.actionList = [{intention: INTENTION.ATTACK, action: this.multiAttack, value: this.baseDamage + 'x2'}]
		} else {
			this.baseDamage = 5
			this.actionList = [{intention: INTENTION.ATTACK, action: this.multiAttack, value: this.baseDamage + 'x2'}]
		}
		return super.prepare();
	}

	onStartNewTurn (fn) {
		fn.enemyPushState(Ninjutsu, 3)
	}

	multiAttack (fn) {
		fn.strikeHero(this.baseDamage)
		fn.strikeHero(this.baseDamage)
	}

}