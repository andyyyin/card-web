import {INTENTION} from "../enum";
import BaseAI from "./base";
import Cards from '../cards'

export default class Mage extends BaseAI{

	prepareAction

	img = 'mage'

	mhp = 50

	baseDamage = 12

	actionList = []

	prepare(e) {
		const turnNum = e.getTurnNum()
		if ((turnNum - 1) % 3 === 0) {
			this.actionList = [{intention: INTENTION.STAY, action: this.stay}]
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, action: this.fireAttack, name: '火球术', value: this.baseDamage}]
		}
		return super.prepare();
	}

	fireAttack (fn) {
		fn.strikeHero(this.baseDamage)
		fn.addCardIntoDraw(new Cards.Burn())
	}

}