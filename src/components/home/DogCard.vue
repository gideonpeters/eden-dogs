<template>
	<div
		class="h-[20rem] w-full bg-white bg-no-repeat bg-center bg-cover bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer transition ease-in-out hover:scale-105 duration-300"
		:style="{ backgroundImage: `url(${image})` }"
	/>
</template>

<script>
export default {
	props: {
		image: {
			type: String,
			required: true,
		},
	},
};
</script>
