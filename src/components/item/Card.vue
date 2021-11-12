<template>
	<div class="card-container">
		<div class="card-display" @click.stop="onClickCard" :class="cardClassNames">
			<div>{{card.name}}</div>
			<div v-show="card.baseValue">({{card.baseValue}})</div>
			<div class="card-cost">{{card.cost}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		card: Object,
		prepareCardId: null,
		powerCur: Number,
		cardLaunch: Function,
		cardPrepare: Function,
	},
	computed: {
		isDisabled () { return this.card.cost > this.powerCur },
		isPrepared () { return this.card.id === this.prepareCardId },
		cardClassNames () {
			let result = [this.card.typeClassName]
			if (this.isPrepared) result.push('active')
			if (this.isDisabled) result.push('disabled')
			return result.join(' ')
		},
	},
	methods: {
		onClickCard () {
			if (this.isDisabled) return
			if (this.isPrepared) {
				this.cardLaunch(this.card.id)
			} else {
				this.cardPrepare(this.card.id)
			}
		},
	}
}
</script>
<style src="../../common/style/main.less"/>