
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
	if (this.hp > this.mhp) this.hp = this.mhp
	if (this.hp <= 0) this.hp = 0
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

BaseActor.prototype.filterState = function () {
	let filteredList = this.stateList.filter(s => s.active)
	this.stateList.splice(0, this.stateList.length, ...filteredList)
}

BaseActor.prototype.pushState = function (State, param) {
	console.log(this.name, 'before push state', State.name, param)
	if (typeof State !== 'function') return

	let exist = this.stateList.find(s => s instanceof State)
	if (exist) {
		exist.onSuperposition(param)
	} else {
		this.stateList.push(new State(param))
	}
	this.filterState()
	console.log(this.name, 'end push state', State.name, param)
	console.log(this.stateList);
}

BaseActor.prototype.reset = function (State, param) {
	this.hp = this.mhp
	this.defense = 0
	this.stateList.splice(0, this.stateList.length)
}