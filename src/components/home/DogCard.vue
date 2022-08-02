<template>
	<SiteImage
		:alt="`A ${breed}`"
		:source="image"
		imgClass="h-[20rem] w-full bg-white object-cover bg-no-repeat bg-center bg-cover bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer transition ease-in-out hover:scale-105 duration-300"
	/>
</template>

<script>
import SiteImage from '@/components/SiteImage.vue';

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
};
</script>
