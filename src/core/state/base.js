
export default class BaseState {

	name
	active = 1
	level

	constructor(props) {
		this.level = props || 1
	}

	removeSelf () {
		this.active = 0
	}

	async onGetStrike () {}

	async onHostEndTurn () {}

	async onHostStartTurn () {}

	async onOpponentEndTurn () {}

	async onLaunchCard () {}

	async onHostLaunchAttack () {}

	async onHpEmpty () {}

	async finalDamageFilter (fn, damage, isThrough) { return damage }

	onSuperposition (param) {
		if ((!param || typeof param === 'number') && this.level) {
			this.levelChange(param || 1)
		}
	}

	levelChange (value) {
		this.level += value
		if (this.level <= 0) {
			this.removeSelf()
		}
	}
}