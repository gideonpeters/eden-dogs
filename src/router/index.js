import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routeEndpoints = {
	HOME: {
		name: 'home',
		path: '/',
	},
	DOG_VIEW: {
		name: 'dogs.view',
		path: '/dogs/:id',
	},
};

const routes = [
	{
		path: routeEndpoints.HOME.path,
		name: routeEndpoints.HOME.name,
		component: () => import(/* webpackChunkName: "dogs" */ '../views/HomeView.vue'),
	},
	{
		path: routeEndpoints.DOG_VIEW.path,
		name: routeEndpoints.DOG_VIEW.name,
		component: () => import(/* webpackChunkName: "dogs" */ '../views/DogView.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
