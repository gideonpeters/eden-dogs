<template>
	<SiteLayout>
		<router-view class="z-40" />
	</SiteLayout>
</template>

<script>
import SiteLayout from '@/components/layouts/SiteLayout.vue';

export default {
	components: {
		SiteLayout,
	},
};
</script>
