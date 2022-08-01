import { DogService } from '@/services';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		dogs: [],
		breeds: [],
	},
	getters: {},
	mutations: {
		SET_DOGS(state, items) {
			state.dogs = items;
		},
		SET_BREEDS(state, items) {
			state.breeds = items;
		},
	},
	actions: {
		async fetchRandomDogs() {
			try {
				const res = await DogService.fetchRandomDogs();

				return res.message;
			} catch (error) {
				//
			}
		},
	},
});
