<template>
	<div>
		<div class="mt-12 mb-5 flex items-center bg-purple-30 px-2 py-2 rounded-lg">
			<div class="sm:w-full w-full sm:flex sm:items-center">
				<div class="w-full flex flex-col">
					<label for="hero-email" class="sr-only">Enter Dog Breed</label>
					<VueSuggestion
						class="w-full"
						placeholder="Enter Dog Breed"
						:items="items"
						v-model="item"
						:setLabel="setLabel"
						:minLen="0"
						:itemTemplate="itemTemplate"
						@onInputChange="inputChange"
						@onItemSelected="itemSelected"
					/>
				</div>
				<div class="w-full flex flex-col mx-5">
					<label for="hero-email" class="sr-only">Enter Sub Breed</label>
					<VueSuggestion
						class="w-full"
						placeholder="Enter Sub Breed"
						:items="items"
						v-model="item"
						:setLabel="setLabel"
						:minLen="0"
						:itemTemplate="itemTemplate"
						@onInputChange="inputChange"
						@onItemSelected="itemSelected"
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

		<DogList :dogs="dogs" />
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
			item: {},
			items: [
				{ id: 1, name: 'Golden Retriever' },
				{ id: 2, name: 'Cat' },
				{ id: 3, name: 'Squirrel' },
			],
			itemTemplate,
			page: 1,
			totalPages: 4,
			total: 40,
			perPage: 10,
			currentPage: 1,
			hasMorePages: true,
		};
	},
	computed: {
		dogs() {
			return this.$store.state.dogs;
		},
	},
	methods: {
		itemSelected(item) {
			this.item = item;
		},
		setLabel(item) {
			return item.name;
		},
		inputChange(text) {
			// your search method
			this.items = this.items.filter((item) => item.name.contains(text));
			// now `items` will be showed in the suggestion list
		},
		searchDogs() {
			this.isLoading = true;
			console.log('rahhh');
		},
		showMore(page) {
			this.page = page;
			this.currentPage = page;
		},
	},
	async mounted() {
		this.isLoading = true;
		const dogs = await this.$store.dispatch('fetchRandomDogs');
		this.$store.commit('SET_DOGS', dogs);
		console.log('prrr', dogs);
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
		}
	}
	.vs__list {
		@apply bg-white absolute w-full;
	}
}
</style>
