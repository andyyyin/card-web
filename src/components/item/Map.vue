<template>
	<van-popup class="map-panel" v-model:show="show" :close-on-click-overlay="false">
		<div class="panel-content">
			<div class="flex-center" v-for="row in [...map].reverse()">
				<div class="node" v-for="node in row" :ref="el => node.el = el" @click="clickNode(node)">
					<div class="line" v-for="link in node.linkList" :ref="el => link.el = el"></div>
					<div class="event">{{node.event.enemy.name}}</div>
					<div class="player" v-if="position[0] === node.p[0] && position[1] === node.p[1]"></div>
					<div class="available" v-if="node.p[0] === position[0] + 1 && node.linkList.find(l => l.to === position[1])"></div>
				</div>
			</div>
		</div>
	</van-popup>
</template>

<script setup>
import {onMounted, ref, watchEffect, nextTick} from "vue";
import MT from '../../core/function/mathTools'
import G from "../../core/game/index"

const map = G.Map.get()
const position = ref(G.Map.getPosition())

onMounted(() => {
	watchEffect(() => {
		if (props.show) {
			position.value = G.Map.getPosition()
			nextTick(drawLink)
		}
	})
})

const drawLink = () => {
	let lastRow
	for (let row of map) {
		for (let node of row) {
			for (let link of node.linkList) {
				if (!lastRow) continue
				let nodeTarget = lastRow[link.to]
				let line = link.el, node1 = node.el, node2 = nodeTarget.el
				const x1 = node1.offsetLeft, x2 = node2.offsetLeft, y1 = node1.offsetTop, y2 = node2.offsetTop
				line.style.height = MT.getDistanceOfTwoPoints([x1, y1], [x2, y2]) + 'px'

				let angle = MT.getTwoPointAngle([x2, y2], [x1, y1])
				let rotate = 180 - (angle / Math.PI * 180)
				line.style.transformOrigin = 'top center'
				line.style.transform = `rotate(${rotate}deg)`
			}
		}
		lastRow = row
	}
}

const clickNode = (node) => {
	if (!G.Map.checkCanMove(node)) return
	position.value = G.Map.moveTo(node)
	G.setEvent(node.event)
	props.onDone()
	close()
}

const props = defineProps({
	show: Boolean,
	active: Boolean,
	onDone: Function
})

const emit = defineEmits(['update:show'])

const close = () => {
	emit('update:show', false)
}

</script>
<style lang="less">
.map-panel{
	width: calc(100% - 40px);
	height: calc(100% - 40px);
	.panel-content{

		position: relative;
		.node{
			position: relative;
			width: 36px;
			height: 36px;
			background-color: #1b05ad;
			margin: 20px;
			.line{
				width: 2px;
				background-color: #1b05ad;
				position: absolute;
				left: calc(50% - 1px);
				top: calc(50% - 1px);
			}
			.event{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				font-size: 12px;
				color: #fff;
			}
			.player{
				width: 36px;
				height: 36px;
				border-radius: 50%;
				background-color: #42b983;
				position: absolute;
				top: 0;
				left: 0;
			}
			.available{
				position: absolute;
				top: -2px;
				left: -2px;
				width: 36px;
				height: 36px;
				border: 2px solid #42b983;
			}
		}
	}
}
</style>