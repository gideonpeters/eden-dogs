import { http } from '@/utils/api';
import { ENDPOINTS } from './endpoints';

export default class DogService {
	static async fetchAllBreeds() {
		try {
			const res = await http.get(ENDPOINTS.LIST_BREEDS);

			return res.data;
		} catch (error) {
			//
		}
	}
	static async fetchSubBreeds() {
		try {
			const res = await http.get(ENDPOINTS.LIST_SUB_BREEDS);

			return res.data;
		} catch (error) {
			//
		}
	}
	static async fetchRandomDogs(count = 50) {
		try {
			const res = await http.get(ENDPOINTS.LIST_RANDOM(count));

			return res.data;
		} catch (error) {
			//
		}
	}
	static async fetchByBreed(params) {
		try {
			const res = await http.get(ENDPOINTS.LIST_BY_BREED(params));

			return res.data;
		} catch (error) {
			//
		}
	}
	static async fetchBySubBreed(params) {
		try {
			const res = await http.get(ENDPOINTS.LIST_BY_SUB_BREED(params));

			return res.data;
		} catch (error) {
			//
		}
	}
}
