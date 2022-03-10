<template>
	<div class="state-icon" :style="style">
		<div v-if="level" class="level">{{level}}</div>
	</div>
</template>

<script>
export default {
	props: {
		icon: String,
		iconUrl: String,
		level: Number,
		size: Number,
	},
	computed: {
		style () {
			return {
				backgroundImage: this.iconUrl || `url(/src/assets/state-icon/${this.icon}.svg)`,
				backgroundSize: (this.size || 18) + 'px',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}
		}
	}
}
</script>