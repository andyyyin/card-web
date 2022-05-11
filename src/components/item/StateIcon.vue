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
		iconPic: String,
		level: Number,
		size: Number,
		comboFlag: Boolean,
	},
	computed: {
		style () {
			const backgroundImage = this.iconUrl ||
				this.icon && `url(/src/assets/state-icon/${this.icon}.svg)` ||
				this.iconPic && `url(/src/assets/state-pic/${this.iconPic}.png)`
			const result = {
				backgroundImage,
				backgroundSize: (this.size || 18) + 'px',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}
			if (this.comboFlag) {
				result.backgroundColor = 'rgba(0, 200, 0, .4)'
			}
			return result
		}
	}
}
</script>