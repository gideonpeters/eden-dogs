<template>
	<div>
		<div class="mt-12 mb-5 flex flex-col justify-center items-center bg-purple-30 px-2 py-2 rounded-lg">
			<div class="sm:w-full w-full sm:flex sm:items-center">
				<div class="w-full flex flex-col">
					<label for="hero-email" class="sr-only">Enter Dog Breed</label>
					<VueSuggestion
						ref="breedInput"
						class="w-full"
						:disabled="isLoading"
						:inputOptions="{ placeholder: 'Enter Dog Breed to begin' }"
						:items="filteredBreeds"
						v-model="selectedBreed"
						:setLabel="setLabel"
						:minLen="1"
						:itemTemplate="itemTemplate"
						@changed="inputChange"
						@selected="breedSelected"
						@enter="handleBreedEnter"
					/>
				</div>
				<div class="w-full flex flex-col md:mx-5 md:mt-0 mt-3 mx-0" v-if="selectedBreed.subBreeds.length > 0">
					<label for="hero-email" class="sr-only">Enter Sub Breed</label>
					<VueSuggestion
						ref="subBreedInput"
						class="w-full"
						:disabled="isLoading"
						:inputOptions="{ placeholder: 'Enter Dog Sub Breed' }"
						:items="selectedBreed.subBreeds"
						v-model="selectedSubBreed"
						:setLabel="setLabel"
						:minLen="0"
						:itemTemplate="itemTemplate"
						@selected="subBreedSelected"
						@enter="handleBreedEnter"
					/>
				</div>
				<div class="mt-4 sm:mt-0 sm:ml-3">
					<SiteButton text="Search" :disabled="!selectedBreed.name" :isLoading="isLoading" @click="searchDogs" />
				</div>
			</div>
		</div>
		<small v-if="!selectedBreed.name" class="text-gray-700">
			If there are sub breeds for this breed, a second dropdown will be displayed
		</small>
		<SitePagination
			:totalPages="totalPages"
			:total="total"
			:perPage="perPage"
			:currentPage="currentPage"
			:hasMorePages="hasMorePages"
			@pagechanged="showMore"
		/>

		<DogList v-if="!isLoading" :dogs="paginatedDogs" :breed="selectedBreed.name" />
		<div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 place-items-center">
			<div class="shadow rounded-md max-w-sm w-full mx-auto mb-3" v-for="i in 6" :key="i">
				<div class="animate-pulse flex space-x-4">
					<div class="rounded-lg bg-gradient-to-r from-purple-30 to-purple h-[20rem] w-full"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { VueSuggestion } from 'vue-suggestion';
import itemTemplate from './SearchItem.vue';
import SiteButton from '@/components/SiteButton.vue';
import SitePagination from '../SitePagination.vue';
import DogList from './DogList.vue';

export default {
	components: {
		VueSuggestion,
		SiteButton,
		SitePagination,
		DogList,
	},
	data() {
		return {
			isLoading: false,
			selectedBreed: {
				subBreeds: [],
			},
			selectedSubBreed: {},
			itemTemplate,
			page: 1,
			perPage: 10,
			currentPage: 1,
			hasMorePages: true,
			filteredBreeds: [],
			filteredDogs: [],
		};
	},
	computed: {
		dogs() {
			return this.$store.state.dogs;
		},
		total() {
			return this.filteredDogs.length;
		},
		totalPages() {
			return Math.floor(this.total / this.perPage);
		},
		paginatedDogs() {
			return this.filteredDogs.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
		},
		breeds() {
			return this.$store.state.breeds;
		},
	},
	methods: {
		breedSelected(item) {
			this.selectedBreed = item;
		},
		subBreedSelected(item) {
			this.selectedSubBreed = item;
		},
		setLabel(item) {
			return item.name;
		},
		inputChange(text) {
			this.filteredBreeds = this.breeds.filter((item) => item.name.includes(text.toLowerCase()));
		},
		handleBreedEnter() {
			if (this.selectedBreed?.subBreeds?.length === 0) {
				this.searchDogs();
			} else {
				this.$refs.subBreedInput.$el.focus();
			}
		},
		async searchDogs() {
			this.isLoading = true;
			this.currentPage = 1;
			try {
				// Checks if a subbreed was selected or not and fetches the appropriate value from cache
				const cachedDogs =
					JSON.parse(
						localStorage.getItem(
							this.selectedBreed?.subBreeds?.length === 0
								? `ed-${this.selectedBreed.name}`
								: `ed-${this.selectedSubBreed.name}`
						)
					) || [];

				console.log('cache', cachedDogs);

				if (cachedDogs?.length > 0) {
					this.setDogs(cachedDogs);
				} else {
					const res = await this.$store.dispatch(this.selectedSubBreed.name ? 'fetchBySubBreed' : 'fetchByBreed', {
						breed: this.selectedBreed?.name,
						subBreed: this.selectedSubBreed?.name,
					});

					this.setDogs(res, true);
				}
			} catch (error) {
				this.isLoading = false;
			} finally {
				this.isLoading = false;
			}
		},
		showMore(page) {
			this.page = page;
			this.currentPage = page;
		},
		setDogs(dogs, shouldCache = false) {
			this.filteredDogs = dogs;

			// Cache result
			if (shouldCache) {
				if (this.selectedBreed?.subBreeds?.length === 0) {
					localStorage.setItem(`ed-${this.selectedBreed.name}`, JSON.stringify(dogs));
				} else {
					localStorage.setItem(`ed-${this.selectedSubBreed.name}`, JSON.stringify(dogs));
				}
			}
		},
		formatBreeds(breeds) {
			return Object.keys(breeds).map((breed) => {
				return {
					name: breed,
					subBreeds: breeds[breed].map((subBreed) => ({ name: subBreed })),
				};
			});
		},
		async setupApp() {
			this.isLoading = true;
			try {
				const dogs = await this.$store.dispatch('fetchRandomDogs');
				// Fetch again because Dog API has a max of 50 and we need to display 100
				const next50Dogs = await this.$store.dispatch('fetchRandomDogs');

				const cachedBreeds = JSON.parse(localStorage.getItem('ed-breeds') || null) || [];

				if (cachedBreeds?.length === 0) {
					// Fetch options for breeds[]
					const breeds = await this.$store.dispatch('fetchBreeds');

					// Format breeds[] to appropriate model for VueSugesstion component
					const formattedBreeds = this.formatBreeds(breeds);

					this.filteredBreeds = formattedBreeds;

					this.$store.commit('SET_BREEDS', formattedBreeds);
				} else {
					this.$store.commit('SET_BREEDS', cachedBreeds);
				}

				this.$store.commit('SET_DOGS', [...dogs, ...next50Dogs]);

				this.setDogs(this.$store.state.dogs);
			} catch (error) {
				this.isLoading = false;
			} finally {
				this.isLoading = false;
			}
		},
	},
	mounted() {
		this.setupApp();
	},
};
</script>

<style lang="scss" scoped>
::v-deep .vue-suggestion {
	@apply relative w-full;
	.vs__input-group {
		.vs__input {
			@apply h-16 bg-purple px-5 w-full rounded-lg w-full;
			&::placeholder {
				color: rgba(0, 0, 255, 0.523);
			}
		}
	}
	.vs__list {
		@apply bg-white absolute w-full max-h-[20rem] overflow-y-scroll z-40;
	}
}
</style>
