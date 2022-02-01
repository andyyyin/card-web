import BaseState from "./base";

export default class Strength extends BaseState{

	name = '力量'

	icon = 'strength'

	get damageFix () {
		return {add: this.level}
	}

}