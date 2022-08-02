<template>
	<div>
		<SiteLogo @click="goHome" />
	</div>
</template>

<script>
import { routeEndpoints } from '@/router';
import SiteLogo from '@/components/SiteLogo.vue';

export default {
	components: {
		SiteLogo,
	},
	methods: {
		goHome() {
			this.$router.push({ name: routeEndpoints.HOME.name });
		},
	},
};
</script>
