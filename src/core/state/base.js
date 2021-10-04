
export default class BaseState {

	name
	active = 1

	constructor(props) {
	}

	removeSelf () {
		this.active = 0
	}
}