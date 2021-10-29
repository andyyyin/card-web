import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Agility from "../state/agility";
import BaseAI from "./base";

export default class Wolf extends BaseAI{

	prepareAction

	img = 'wolf'

	mhp = 30

	baseDamage = 12

	actionList

	prepare(e) {
		if (e.getTurnNum() === 1) {
			this.actionList = [{intention: INTENTION.ATTACK, action: this.multiAttack, value: '7x3'}]
		} else {
			this.actionList = [{intention: INTENTION.ATTACK, action: this.commonAttack, value: this.baseDamage}]
		}
		return super.prepare();
	}

	multiAttack (execute) {
		execute.strikeHero(7)
		execute.strikeHero(7)
		execute.strikeHero(7)
	}

}