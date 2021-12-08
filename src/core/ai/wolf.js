import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Agility from "../state/agility";
import BaseAI from "./base";

export default class Wolf extends BaseAI{

	prepareAction

	img = 'wolf'

	mhp = 30

	baseDamage = 4

	actionList

	prepare(e) {
		const turnNum = e.getTurnNum()
		this.baseDamage = turnNum < 3 ? (this.baseDamage + 4) : 16
		if (turnNum % 3 === 0) {
			this.actionList = [{intention: INTENTION.ATTACK, action: this.multiAttack, value: '7x3'}]
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, action: this.commonAttack, value: this.baseDamage}]
		}
		return super.prepare();
	}

	multiAttack (fn) {
		fn.strikeHero(7)
		fn.strikeHero(7)
		fn.strikeHero(7)
	}

}