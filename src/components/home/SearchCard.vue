<template>
	<div>
		<div class="mt-12 mb-5 flex items-center bg-purple-30 px-2 py-2 rounded-lg">
			<div class="sm:w-full w-full sm:flex sm:items-center">
				<div class="w-full flex flex-col">
					<label for="hero-email" class="sr-only">Enter Dog Breed</label>
					<VueSuggestion
						class="w-full"
						:disabled="isLoading"
						:inputOptions="{ placeholder: 'Enter Dog Breed' }"
						:items="filteredBreeds"
						v-model="selectedBreed"
						:setLabel="setLabel"
						:minLen="1"
						:itemTemplate="itemTemplate"
						@changed="inputChange"
						@selected="breedSelected"
					/>
				</div>
				<div class="w-full flex flex-col mx-5" v-if="selectedBreed.subBreeds.length > 0">
					<label for="hero-email" class="sr-only">Enter Sub Breed</label>
					<VueSuggestion
						class="w-full"
						:disabled="isLoading"
						:inputOptions="{ placeholder: 'Enter Dog Sub Breed' }"
						:items="selectedBreed.subBreeds"
						v-model="selectedSubBreed"
						:setLabel="setLabel"
						:minLen="0"
						:itemTemplate="itemTemplate"
						@selected="subBreedSelected"
					/>
				</div>
				<div class="mt-4 sm:mt-0 sm:ml-3">
					<SiteButton text="Search" :isLoading="isLoading" @click="searchDogs" />
				</div>
			</div>
		</div>

		<SitePagination
			:totalPages="totalPages"
			:total="total"
			:perPage="perPage"
			:currentPage="currentPage"
			:hasMorePages="hasMorePages"
			@pagechanged="showMore"
		/>

		<DogList :dogs="paginatedDogs" />
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
			console.log('input', text);
			this.filteredBreeds = this.breeds.filter((item) => item.name.includes(text));
		},
		async searchDogs() {
			this.isLoading = true;
			this.currentPage = 1;
			try {
				const res = await this.$store.dispatch(this.selectedSubBreed.name ? 'fetchBySubBreed' : 'fetchByBreed', {
					breed: this.selectedBreed?.name,
					subBreed: this.selectedSubBreed?.name,
				});

				console.log('umberrrr', res);

				this.setDogs(res);
			} catch (error) {
				//
			} finally {
				this.isLoading = false;
			}
		},
		showMore(page) {
			this.page = page;
			this.currentPage = page;
		},
		setDogs(dogs) {
			this.filteredDogs = dogs;
			console.log('settt', this.filteredDogs);
		},
	},
	async mounted() {
		this.isLoading = true;
		const dogs = await this.$store.dispatch('fetchRandomDogs');
		const breeds = await this.$store.dispatch('fetchBreeds');
		// console.log('breds', breeds);
		const formattedBreeds = Object.keys(breeds).map((breed) => {
			return {
				name: breed,
				subBreeds: breeds[breed].map((subBreed) => ({ name: subBreed })),
			};
		});
		console.log('filttt', formattedBreeds);
		this.filteredBreeds = formattedBreeds;

		this.$store.commit('SET_DOGS', dogs);
		this.$store.commit('SET_BREEDS', formattedBreeds);
		// console.log('prrr', dogs);
		this.setDogs(this.$store.state.dogs);
		this.isLoading = false;
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
