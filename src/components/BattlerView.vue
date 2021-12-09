<template>
	<section class="battle-view" :style="battleViewStyle">
		<img class="actor-show" :src="img && `/src/assets/actor/${img}.png`" alt="">
		<div class="log-show-panel">
			<transition-group :css="false" @before-enter="logBeforeEnter" @enter="logEnter" @leave="logLeave">
				<div class="log-text-row" v-for="(log, index) in logShowList" :key="log.index" :data-index="index">
					{{log.text}}
				</div>
			</transition-group>
		</div>

		<section class="special-state-section up row-align">
			<state-icon v-for="state in stateShowUpList" :icon="state.icon || ''" :level="state.level || ''"/>
		</section>

		<section class="special-state-section down row-align">
			<state-icon v-for="state in stateShowDownList" :icon="state.icon || ''" :level="state.level || ''"/>
		</section>
	</section>
</template>
<script setup>
import {ref, watchEffect} from "vue";
import StateIcon from "./item/StateIcon.vue";
import anime, {flatten} from "../anime";

const props = defineProps({
	stateShowUpList: Array,
	stateShowDownList: Array,
	logs: Array,
	img: String,
})

const logShowList = ref([])

const logShowNum = 5

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
</style>
