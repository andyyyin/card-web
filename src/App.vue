<template>
	<router-view msg="Hello Vue 3 + Vite"></router-view>
<!--	<HelloWorld msg="Hello Vue 3 + Vite"/>-->
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<style lang="less">
@import './common/style/base.less';
@import './common/style/mixin.less';

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
