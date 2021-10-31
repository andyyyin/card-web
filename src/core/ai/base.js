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

	action (execute) {
		console.log('run ai')
		this.prepareAction(execute)
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

	commonAttack (execute) {
		let value = this.baseDamage
		console.log('ai act attack', value)
		execute.strikeHero(value)
	}

	commonDefense (execute) {
		console.log('ai act defense', this.baseDefense)
		execute.enemyChangeDefense(this.baseDefense)
	}

}