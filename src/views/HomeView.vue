<template>
	<div class="mt-8">
		<HeroSection />
		<SearchCard />
	</div>
</template>

<script>
import HeroSection from '@/components/home/HeroSection.vue';
import SearchCard from '@/components/home/SearchCard.vue';

export default {
	components: {
		HeroSection,
		SearchCard,
	},
};
</script>
