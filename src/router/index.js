import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			name: 'home',
			component: () => import(/* webpackChunkName: "home" */ '../components/HelloWorld.vue'),
		},
		{
			path: '/main',
			name: 'main',
			component: () => import(/* webpackChunkName: "main" */ '../components/MainScene.vue'),
		},
		{
			path: '/test',
			name: 'test',
			component: () => import(/* webpackChunkName: "test" */ '../components/Test.vue'),
		},
	]
})

export default router