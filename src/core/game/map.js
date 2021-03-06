import MT from '../function/mathTools'
import AT from '../function/arrayTools'
import AIMap from '../ai'


let map = []

let position = [0, 0]

let _levelCount = 20

let _aiList
let _aiUsed = []

const create = (aiList, levelCount) => {
	_aiList = [...aiList]
	map = []
	if (levelCount) _levelCount = levelCount
	for (let l = 0; l <= _levelCount; l++) {
		let list = []
		if (l === 0) {
			list.push({p: [0, 0], linkList: [], event: {}})
		} else {
			let branchCount = MT.randomInt(2, 5)
			for (let n = 0; n < branchCount; n++) {
				let enemy = getEnemyByLevel(l)
				let event = {type: 0, enemy}
				if (enemy.avatar) event.img = enemy.avatar
				else event.name = enemy.name
				list.push({p: [l, n], linkList: [], event})
			}
			createPath(map[l - 1], list)
		}

		map.push(list)
	}
	return map
}


const createPath = (group1, group2) => {

	let cursor1 = 0, cursor2 = 0

	const createLink = () => {
		const n2 = group2[cursor2]
		if (!n2.linkList) n2.linkList = []
		n2.linkList.push({to: cursor1})
	}
	while (true) {

		createLink()
		const isEnd1 = cursor1 === group1.length - 1
		const isEnd2 = cursor2 === group2.length - 1

		if (isEnd1 && isEnd2) {
			break
		} else if (isEnd1) {
			cursor2++
		} else if (isEnd2) {
			cursor1++
		} else {
			let process1 = (cursor1 + 1) / group1.length
			let process2 = (cursor2 + 1) / group2.length
			if ((process2 - process1) > 0.4) {
				cursor1++
			} else if ((process1 - process2) > 0.2) {
				cursor2++
			} else {
				MT.randomBool() ? cursor2++ : cursor1++
			}
		}
	}

}

const getEnemyByLevel = (level) => {
	let tIndex = _aiList.findIndex(a => a.level === level)
	if (tIndex > -1) {
		const [target] = _aiList.splice(tIndex, 1)
		_aiUsed.push(target)
		return target
	} else if (_aiList.length) {
		const target = AT.getRandomOne(_aiList)
		_aiList.splice(_aiList.indexOf(target), 1)
		_aiUsed.push(target)
		return target
	} else {
		return AT.getRandomOne(_aiUsed)
	}
}

const getPosition = () => position
const checkCanMove = (node) => {
	if (node.p[0] !== position[0] + 1) return false
	if (!node.linkList.find(l => l.to === position[1])) return false
	return true
}

const moveTo = (node) => position = node.p

const get = () => map

export default {
	get,
	create,
	getPosition,
	checkCanMove,
	moveTo,
}