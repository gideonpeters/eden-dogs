<template>
	<div>
		<div class="mt-12 flex items-center bg-purple-30 px-2 py-2 rounded-lg">
			<form action="#" class="sm:max-w-lg sm:w-full w-full sm:flex sm:items-center">
				<div class="min-w-0 w-full bg-green">
					<label for="hero-email" class="sr-only">Enter Dog Breed</label>
					<VueSuggestion
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
					<button
						type="submit"
						class="block w-full rounded-md border border-transparent px-5 py-3 bg-purple-50 text-base font-medium text-white shadow hover:bg-purple-40 focus:outline-none focus:ring-2 focus:ring-green-10 focus:ring-offset-2 sm:px-10"
					>
						Search
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { VueSuggestion } from 'vue-suggestion';
import itemTemplate from './SearchItem.vue';

export default {
	components: {
		VueSuggestion,
	},
	data() {
		return {
			item: {},
			items: [
				{ id: 1, name: 'Golden Retriever' },
				{ id: 2, name: 'Cat' },
				{ id: 3, name: 'Squirrel' },
			],
			itemTemplate,
		};
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
	},
};
</script>

<style lang="scss" scoped>
::v-deep .vue-suggestion {
	@apply relative;
	.vs__input-group {
		.vs__input {
			@apply h-16 bg-purple px-5 w-full rounded-lg;
		}
	}
	.vs__list {
		@apply bg-white absolute w-full;
	}
}
</style>
