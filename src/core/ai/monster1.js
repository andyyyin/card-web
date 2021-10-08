import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Agility from "../state/agility";
import BaseAI from "./base";

export default class Monster1 extends BaseAI{

	prepareAction

	img = 'monster1'

	baseDamage = 9
	baseDefense = 7

	actionList = [
		{intention: INTENTION.ATTACK, action: this.commonAttack, value: this.baseDamage},
		{intention: INTENTION.DEFENSE, action: this.commonDefense},
		{intention: INTENTION.BUFF, action: this.stableUp},
	]

	stableUp (execute) {
		console.log('ai action agility up 2')
		execute.enemyPushState(Agility, 2)
	}

}