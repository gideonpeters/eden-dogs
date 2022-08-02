import { DogService } from '@/services';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		dogs: [],
		breeds: JSON.parse(localStorage.getItem('ed-breeds') | null) || [],
	},
	getters: {},
	mutations: {
		SET_DOGS(state, items) {
			state.dogs = items;
		},
		SET_BREEDS(state, items) {
			state.breeds = items;

			// cache value in localStorage
			localStorage.setItem('ed-breeds', JSON.stringify(items));
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
		async fetchBreeds({ state }) {
			try {
				if (state.breeds.length > 0) {
					return;
				}

				const res = await DogService.fetchAllBreeds();

				return res.message;
			} catch (error) {
				//
			}
		},
		async fetchByBreed(_, payload) {
			try {
				const res = await DogService.fetchByBreed(payload);

				return res.message;
			} catch (error) {
				//
			}
		},
		async fetchBySubBreed(_, payload) {
			try {
				const res = await DogService.fetchBySubBreed(payload);

				return res.message;
			} catch (error) {
				//
			}
		},
		async fetchBreedInfo(_, payload) {
			try {
				const res = await DogService.fetchBreedInfo(payload);

				return res.message;
			} catch (error) {
				//
			}
		},
		async fetchRandomBreeds(_, payload) {
			try {
				const res = await DogService.fetchRandomBreeds(payload);

				return res.message;
			} catch (error) {
				//
			}
		},
	},
});
