<template>
	<button
		v-on="$listeners"
		class="flex items-center w-full rounded-md border border-transparent px-5 py-3 bg-purple-50 text-base font-medium text-white shadow hover:bg-purple-40 focus:outline-none focus:ring-2 focus:ring-green-10 focus:ring-offset-2 sm:px-10"
	>
		<div class="w-4 h-4 rounded-full animate-spin border border-solid border-white border-t-transparent mr-2" v-if="isLoading" />
		{{ text }}
	</button>
</template>

<script>
export default {
	props: {
		isLoading: {
			type: Boolean,
			default: false,
		},
		text: {
			type: String,
			default: '',
		},
	},
};
</script>
