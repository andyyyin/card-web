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

	prepare () {
		const action = AT.getRandomOneWeighted(this.actionList)
		this.prepareAction = action.action
		const {intention, value} = action
		return {intention, value}
	}

	commonAttack (execute) {
		let value = this.baseDamage
		console.log('ai act attack', value)
		execute.strikeHero(value)
	}

	commonDefense (execute) {
		let stateList = execute.getEnemyState()
		let value = stateDefenseFix(this.baseDefense, stateList)
		console.log('ai act defense', value)
		execute.enemyChangeDefense(value)
	}

}