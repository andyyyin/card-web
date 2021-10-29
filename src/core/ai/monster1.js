import {INTENTION} from "../enum";
import AT from '../function/arrayTools'
import Agility from "../state/agility";
import BaseAI from "./base";

export default class Monster1 extends BaseAI{

	prepareAction

	img = 'monster1'

	mhp = 60

	baseDamage = 10
	baseDefense = 8

	actionList = [
		{intention: INTENTION.ATTACK, action: this.commonAttack, value: this.baseDamage},
		{intention: INTENTION.DEFENSE, action: this.stableDefense},
	]

	stableDefense (execute) {
		this.commonDefense(execute)
		execute.enemyPushState(Agility, 2)
	}

}