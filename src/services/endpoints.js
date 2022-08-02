export const ENDPOINTS = {
	LIST_BREEDS: '/breeds/list/all',
	LIST_SUB_BREEDS: ({ breed }) => `/breed/${breed}/list`,
	LIST_RANDOM: (count) => `/breeds/image/random/${count}`,
	LIST_RANDOM_BREEDS: ({ breed, count }) => `/breed/${breed}/images/random/${count}`,
	LIST_BY_BREED: ({ breed }) => `/breed/${breed}/images`,
	LIST_BY_SUB_BREED: ({ breed, subBreed }) => `/breed/${breed}/${subBreed}/images`,
	FETCH_BREED_INFO: ({ breed }) => `/breed/${breed}`,
};
