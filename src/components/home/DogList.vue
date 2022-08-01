<template>
	<div class="grid grid-cols-4 gap-4 mt-4">
		<DogCard v-for="(dog, ix) in dogs" :key="ix" :image="dog" />
	</div>
</template>

<script>
import DogCard from '@/components/home/DogCard.vue';

export default {
	props: {
		dogs: {
			type: Array,
			default: () => [],
		},
	},
	components: {
		DogCard,
	},
};
</script>
