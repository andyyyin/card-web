<template>
	<div class="card-container">
		<div class="card-display" @click.stop="onClickCard" :class="cardClassNames">
			<div>{{card.name}}</div>
			<div v-if="card.baseValue">({{card.baseValue}})</div>
			<div v-if="!card.unplayable" class="card-cost" :class="{fixed: card.fixedCost !== undefined}">
				{{card.cost}}
			</div>
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
		locked: Boolean,
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
			if (this.locked) return
			if (this.isDisabled) return
			if (this.card.unplayable) return
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