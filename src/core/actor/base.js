
export default class BaseActor {

	name = 'actor'

	hp = 100
	mhp = 100
	defense = 0

	stateList = []

	constructor(obj) {
		Object.assign(this, obj)
	}

}

BaseActor.prototype.changeHp = function (value) {
	this.hp += value
	console.log(this.name, 'change hp', value)
}

BaseActor.prototype.changeDefense = function (value) {
	this.defense += value
	console.log(this.name, 'change defense', value)
}

BaseActor.prototype.getStrike = function (value) {
	if (this.defense) {
		let parry = value < this.defense ? value : this.defense
		value -= parry
		this.defense -= parry
		console.log(this.name, 'parry', parry)
	}
	this.changeHp(-value)
}

BaseActor.prototype.pushState = function (state) {
	let exist = this.stateList.find(s => s.name === state.name)
	if (exist) {
		exist.onSuperposition(state)
	} else {
		this.stateList.push(state)
	}
	console.log(this.name, 'push state', state.name, state.level)
	console.log(this.stateList);
}