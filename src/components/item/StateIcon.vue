<template>
	<div class="state-icon" :style="style">
		<div class="level">{{level}}</div>
	</div>
</template>

<script>
export default {
	props: {
		icon: String,
		level: Number
	},
	computed: {
		style () {
			return {
				backgroundImage: `url(/src/assets/state-icon/${this.icon}.svg)`,
				backgroundSize: '18px',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}
		}
	}
}
</script>
<style lang="less">
.state-icon{
	position: relative;
	width: 24px;
	height: 24px;
	.level{
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 12px;
		font-weight: 600;
		color: #000;
	}
}
</style>