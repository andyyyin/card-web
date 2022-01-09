<template>
	<section class="battle-view" :style="battleViewStyle">
		<img class="actor-show" :src="imgSrc" alt="">
		<div class="log-show-panel">
			<transition-group :css="false" @before-enter="logBeforeEnter" @enter="logEnter" @leave="logLeave">
				<div class="log-text-row" v-for="(log, index) in logShowList" :key="log.index" :data-index="index"
					 v-html="log.text">
				</div>
			</transition-group>
		</div>

		<section class="special-state-section up row-align">
			<state-icon v-for="state in stateShowUpList" :icon="state.icon || ''" :level="state.level || ''"/>
		</section>

		<section class="special-state-section down row-align">
			<state-icon v-for="state in stateShowDownList" :icon="state.icon || ''" :level="state.level || ''"/>
		</section>
		<div class="anim-mask" :ref="props.animMaskRef"/>
	</section>
</template>
<script setup>
import {computed, ref, watchEffect} from "vue";
import StateIcon from "./item/StateIcon.vue";
import anime, {flatten} from "../anime";

const props = defineProps({
	stateShowUpList: Array,
	stateShowDownList: Array,
	logs: Array,
	img: String,
	animMaskRef: Function,
})

const logShowList = ref([])

const logShowNum = 5

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
.battle-view{
	.actor-show{
		display: block;
		object-fit: contain;
	}
}
.anim-mask{
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #000;
	opacity: 0;
}
</style>
