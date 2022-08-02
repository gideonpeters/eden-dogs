<template>
	<div>
		<svg @click="goHome" class="h-[5rem] w-[9rem] text-green cursor-pointer">
			<use href="@/assets/img/logo.svg#logo"></use>
		</svg>
	</div>
</template>

<script>
import { routeEndpoints } from '@/router';

export default {
	methods: {
		goHome() {
			this.$router.push({ name: routeEndpoints.HOME.name });
		},
	},
};
</script>
