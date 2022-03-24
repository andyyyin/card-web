import MT from '../function/mathTools'
import AT from '../function/arrayTools'
import AIMap from '../ai'

const AIList = [
	AIMap.Warrior,
	AIMap.Witch,
	AIMap.Bat,
	AIMap.Mage,
	AIMap.Ninja,
	AIMap.Wolf,
	AIMap.Monster1,
]

let map = []

let position = [0, 0]

const LEVEL_COUNT = 10

const create = () => {
	map = []
	for (let l = 0; l < LEVEL_COUNT; l++) {
		let branchCount = l === 0 ? 1 : MT.randomInt(2, 5)
		let list = []
		for (let n = 0; n < branchCount; n++) {
			let enemy = AT.getRandomOne(AIList)
			let event = {type: 0, enemy}
			list.push({p: [l, n], linkList: [], event})
		}
		if (l > 0) {
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
				MT.randomInt(1) === 0 ? cursor2++ : cursor1++
			}
		}

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