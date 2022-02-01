<template>
	<van-popup class="selector-popup" v-model:show="show" :close-on-click-overlay="false">
		<div class="selector-title">{{title}}</div>
		<div class="operate-cards-panel">
			<card class="card-item"
				  v-for="card in cards"
				  :key="card.id"
				  :is-prepared="readyList.includes(card.id)"
				  :card="card"
				  :on-click="clickCard"
				  :is-static="true"
			/>
		</div>
		<div class="button-group row">
			<div v-if="onSkip" class="button skip grow" @click="skip">跳过</div>
			<div v-show="isReady" class="button confirm grow" @click="confirm">确认</div>
		</div>
	</van-popup>
</template>

<script setup>
import Card from './Card.vue'
import {computed, ref} from "vue";

const props = defineProps({
	show: Boolean,
	title: String,
	cards: Array,
	onSkip: Function,
	limit: {type: Array, default: [1]},
	onConfirm: Function,
})

const emit = defineEmits(['update:show'])

const readyList = ref([])

const isReady = computed(() => {
	let min = props.limit[0] < props.cards.length ? props.limit[0] : props.cards.length
	return readyList.value.length >= min
})

const clickCard = (id) => {
	let eIndex, limitMax = props.limit[1] || props.limit[0]
	if ((eIndex = readyList.value.indexOf(id)) > -1) {
		readyList.value.splice(eIndex, 1)
	} else if (readyList.value.length < limitMax) {
		readyList.value.push(id)
	} else if (limitMax === 1) {
		readyList.value[0] = id
	}
}

const confirm = () => {
	let [min, max] = props.limit
	if (!max) max = min
	if (min > props.cards.length) min = props.cards.length
	if (readyList.value.length < min || readyList.value.length > max) return
	props.onConfirm([...readyList.value])
	readyList.value = []
	emit('update:show', false)
}

const skip = () => {
	props.onSkip()
	readyList.value = []
	emit('update:show', false)
}

</script>