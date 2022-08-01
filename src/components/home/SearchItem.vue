<template>
	<div class="px-4 py-5 cursor-pointer">
		<!-- <b>#{{ item.id }}</b> -->
		<span>{{ item.name }}</span>
	</div>
</template>

<script>
export default {
	props: {
		item: { type: Object, required: true },
	},
};
</script>
