<template>
	<section class="battle-view" :style="battleViewStyle" :ref="el => props.setAnimEl(el, 'battleView')">
		<img class="actor-show" :src="imgSrc" alt="">
		<div class="log-show-panel">
			<transition-group :css="false" @before-enter="logBeforeEnter" @enter="logEnter" @leave="logLeave">
				<div class="log-text-row" v-for="(log, index) in logShowList" :key="log.index" :data-index="index"
					 v-html="log.text">
				</div>
			</transition-group>
		</div>

		<section class="special-state-section up row-align">
			<state-icon v-for="state in stateShowUpList" v-bind="state"/>
		</section>

		<section class="special-state-section down row-align">
			<state-icon v-for="state in stateShowDownList" v-bind="state"/>
		</section>

		<section class="special-state-section right">
			<state-icon v-for="state in stateShowRightList" v-bind="state" :size="26"/>
		</section>

		<div class="anim-cover-mask" :ref="el => props.setAnimEl(el, 'battleMask')"/>

		<div class="anim-inside-container">
			<div v-for="i in animMissilePoolLength" class="attack-anim-item" :ref="el => animMissileList[i - 1] = el" style="display: none">
				<div class="wave"></div>
				<div class="hole" style="display: none"></div>
			</div>
		</div>
		<div v-for="i in enemyPowerPoolLength" class="enemy-power-attack-container" :ref="el => enemyPowerList[i - 1] = el" style="display: none"></div>
	</section>
</template>
<script setup>
import {computed, ref, watchEffect} from "vue";
import StateIcon from "./item/StateIcon.vue";
import anime, {flatten} from "../anime";

const props = defineProps({
	stateShowUpList: Array,
	stateShowDownList: Array,
	stateShowRightList: Array,
	logs: Array,
	img: String,
	setAnimEl: Function,
})

const logShowList = ref([])

const logShowNum = 5

const animMissilePoolLength = 10
const animMissileList = ref([])

const enemyPowerPoolLength = 3
const enemyPowerList = ref([])

const imgSrc = computed(() => {
	const {img} = props
	if (!img) return
	if (img.startsWith('http')) return img
	return `/src/assets/actor/${img}.png`
})

watchEffect(() => {
	let {length} = props.logs
	logShowList.value = []
	props.logs.map((item, index) => {
		if (length - index <= logShowNum) {
			logShowList.value.push({...item, index})
		}
	})
})
watchEffect(() => {
	if (animMissileList.value.length === animMissilePoolLength) {
		props.setAnimEl(animMissileList.value, 'attackMissile')
	}
})
watchEffect(() => {
	if (enemyPowerList.value.length === enemyPowerPoolLength) {
		props.setAnimEl(enemyPowerList.value, 'enemyPower')
	}
})

const battleViewScale = window.innerWidth + 'px';
const battleViewStyle = {width: battleViewScale, height: battleViewScale}

const logBeforeEnter = (el) => {
	el.style.opacity = 0
	el.style.height = '0'
}
const logEnter = (el, done) => {
	anime.recoverToHeight(el, 12).then(done)
}
const logLeave = (el, done) => {
	anime.flatten(el).then(done)
}

</script>
<style src="../common/style/main.less"/>
<style lang="less">
@import '../common/style/mixin.less';
.battle-view{
	.actor-show{
		display: block;
		object-fit: contain;
	}
}
.anim-inside-container{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
}

.attack-anim-item{
	position: absolute;
	top: 45%;
	left: 200px;
	background-color: #000;
	.wave{
		background: url('../assets/effect/power-wave.png') center top no-repeat;
		background-size: contain;
		width: 40px;
		height: 100px;
		position: absolute;
		top: -8px;
		left: 50%;
		transform: translateX(-50%);
	}
	.hole{
		background: url("../assets/effect/strike.png") center no-repeat;
		background-size: contain;
		position: absolute;
		width: 80px;
		height: 80px;
		top: -40px;
		left: 50%;
		transform: translateX(-50%);
	}
}

.enemy-power-attack-container{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: url("../assets/effect/howl.png") center no-repeat;
	display: block;
	background-size: 100%;
	width: 2000px;
	height: 2000px;
	z-index: 1000;
	opacity: .8;
}

</style>
