/**
 * 计算两个角度值之间的夹角绝对值
 * */
const computeAngleOff = (angle1, angle2) => {
	let a = Math.abs(angle1 - angle2)
	if (a < Math.PI) return a
	return 2 * Math.PI - a
}

/**
 * 根据距离（参数d）和方向（参数r）计算目标位置的相对坐标
 * */
const getRelativePositionByDistance = (d, r) => {
	let targetX, targetY
	targetX = d * Math.sin(r)
	targetY = d * Math.cos(r)
	return {targetX, targetY}
}

/**
 * 计算两点之间由start指向end的角度值（两个参数需要带有x,y属性）
 * */
const getTwoPointAngle = (start, end) => {
	let startX = 0, startY = 0, endX = 0, endY = 0
	if (start && start.length) { startX = start[0]; startY = start[1] || startX }
	if (end && end.length) { endX = end[0]; endY = end[1] || endX }
	if (start && start.x) { startX = start.x; startY = start.y }
	if (end && end.x) { endX = end.x; endY = end.y }
	// -------------- 以上 参数校验、解析
	let directionX = endX - startX
	let directionY = endY - startY
	// noinspection JSSuspiciousNameCombination
	return Math.atan2(directionX, directionY)
}

/**
 * 角度计算结果处理，将结果封装到正PI到负PI的区间内
 * */
const angleResult = (result, isAngle) => {
	let threshold = isAngle ? 180 : Math.PI
	if (result > threshold) return ((threshold + result) % (2*threshold)) - threshold
	if (result < -threshold) return ((result - threshold) % (2*threshold)) + threshold
	return result
}


export default {
	computeAngleOff,
	getRelativePositionByDistance,
	getTwoPointAngle,
	angleResult,
}