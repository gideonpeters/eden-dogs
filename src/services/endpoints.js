export const ENDPOINTS = {
	LIST_BREEDS: '/breeds/list/all',
	LIST_SUB_BREEDS: '/breed/hound/list',
	LIST_RANDOM: (count) => `/breeds/image/random/${count}`,
	LIST_BY_BREED: (params) => `/breed/${params.breed}/images`,
	LIST_BY_SUB_BREED: (params) => `/breed/${params.breed}/${params.subBreed}/images`,
};
