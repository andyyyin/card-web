
export default class BaseState {

	name
	active = 1
	level

	constructor(props) {
	}

	removeSelf () {
		this.active = 0
	}

	onGetDamage () {}

	onHostEndTurn () {}

	onOpponentEndTurn () {}

	onSuperposition (param) {
		if ((!param || typeof param === 'number') && this.level) {
			this.level += (param || 1)
		}
	}
}