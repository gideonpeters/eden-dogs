<template>
	<SiteImage
		@click.native="goToView"
		:alt="`A ${breed}`"
		:source="image"
		imgClass="h-[20rem] w-full bg-white object-cover bg-no-repeat bg-center bg-cover bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer transition ease-in-out hover:scale-105 duration-300"
	/>
</template>

<script>
import SiteImage from '@/components/SiteImage.vue';
import { routeEndpoints } from '@/router';

export default {
	components: { SiteImage },
	props: {
		image: {
			type: String,
			required: true,
		},
		breed: {
			type: String,
			required: true,
		},
	},
	methods: {
		goToView() {
			this.$router.push({
				name: routeEndpoints.DOG_VIEW.name,
				params: { breed: this.breed },
				query: {
					img: this.image,
				},
			});
		},
	},
};
</script>
