<template>
	<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 place-items-center">
		<DogCard v-for="(dog, ix) in dogs" :key="ix" :image="dog" class="self-center" />
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
