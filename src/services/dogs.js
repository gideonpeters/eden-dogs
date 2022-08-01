import { http } from '@/utils/api';
import { ENDPOINTS } from './endpoints';

export default class DogService {
	static async fetchSubBreeds() {
		try {
			const res = await http.get(ENDPOINTS.LIST_SUB_BREEDS);
			console.log(res);
			return res.data;
		} catch (error) {
			//
		}
	}
	static async fetchRandomDogs(count = 50) {
		try {
			const res = await http.get(ENDPOINTS.LIST_RANDOM(count));
			console.log(res);
			return res.data;
		} catch (error) {
			//
		}
	}
}
