import anime from "../../anime";
import MT from '../function/mathTools'
import {waitFor} from "../function/common";

export default (fn, state, refs) => {
	let anim = {}
	anim.glint = async () => {
		const mask = refs.animEl.mask
		mask.style.display = 'block'
		await anime.glint(mask)
		mask.style.display = 'none'
	}

	anim.attack = async () => {
		const missileList = refs.animEl.attackMissile
		let missile = missileList.find(m => m.style.display === 'none')

		const wave = missile.getElementsByClassName('wave')[0]
		const hole = missile.getElementsByClassName('hole')[0]
		missile.style.top = (40 + Math.random() * 10) + '%'
		missile.style.left = (45 + Math.random() * 10) + '%'

		let offsetX = -150 + Math.random() * 300
		let offsetY = 250
		let angle = MT.getTwoPointAngle([offsetX, offsetY])
		let rotate = 180 - (angle / Math.PI * 180)

		missile.style.transform = `translateY(${offsetY}px) translateX(${offsetX}px) rotate(${rotate}deg) scale(5)`
		missile.style.display = 'block'
		await anime.moveBack(missile, {duration: 150, easing: 'linear'})
		wave.style.display = 'none'
		hole.style.display = 'block'
		setTimeout(() => {
			wave.style.display = 'block'
			hole.style.display = 'none'
			missile.style.display = 'none'
		}, 1000)
	}

	anim.getAttack = async (isDamage = true, isBlock = false) => {
		let animList = []
		if (isDamage) animList.push(heroHpFlash())
		if (isBlock) animList.push(heroDfFlash())
		await Promise.all(animList)
	}

	anim.enemyGetAttack = async (isDamage = true, isBlock = false) => {
		let animList = []
		if (isDamage) animList.push(enemyHpFlash())
		if (isBlock) animList.push(enemyDfFlash())
		await Promise.all(animList)
	}

	anim.enemyPower = async() => {
		const elList = refs.animEl.enemyPower
		const duration = 200

		for (let i = 0; i < elList.length; i++) {
			let power = elList[i]
			const targetSize = 2000
			power.style.width = power.style.height = '0'
			power.style.display = 'block'
			anime.spread(power, {targetSize, duration}).then(() => power.style.display = 'none')
			await waitFor(duration / 2)
		}


	}

	const enemyDfFlash = () => stateFlash(refs.animEl.enemyDfMask, 'white')
	const enemyHpFlash = () => stateFlash(refs.animEl.enemyHpMask, 'white')

	const heroDfFlash = () => stateFlash(refs.animEl.heroDfMask, 'white')
	const heroHpFlash = () => stateFlash(refs.animEl.heroHpMask, '#FF6464')

	const stateFlash = async (el, color) => {
		const duration = 500
		const easing = 'easeOutBack'
		el.style.backgroundColor = color
		el.style.display = 'block'
		await anime.flash(el, {duration, easing})
		el.style.display = 'none'
	}

	fn.anim = anim
	return fn
}