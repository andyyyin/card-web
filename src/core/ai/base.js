import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Weak from "../state/weak";
import {stateDefenseFix} from "../algorithm";

export default class BaseAI {

	prepareAction

	img

	baseDamage
	baseDefense

	actionList

	action (fn) {
		console.log('run ai')
		this.prepareAction(fn)
	}

	onDebut () {}

	onStartNewTurn () {}

	prepare () {
		const action = this.actionList.length > 1 ?
			AT.getRandomOneWeighted(this.actionList) :
			this.actionList[0]
		this.prepareAction = action.action
		const {intention, name, value} = action
		return {intention, name, value}
	}

	stay () {}

	commonAttack (fn) {
		let value = this.baseDamage
		fn.pushLog({text: '攻击，威力=' + value})
		// console.log('ai act attack', value)
		fn.strikeHero(value)
	}

	commonDefense (fn) {
		// console.log('ai act defense', this.baseDefense)
		fn.pushLog({text: '防御=' + this.baseDefense})
		fn.enemyChangeDefense(this.baseDefense)
	}

}