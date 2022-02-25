import BaseState from "./base";

export default class Strength extends BaseState{

	name = '力量'

	icon = 'strength'

	priority = 2

	get damageFix () {
		return {add: this.level}
	}

}