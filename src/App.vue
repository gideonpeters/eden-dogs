<template>
	<SiteLayout>
		<router-view class="z-20 overflow-y-scroll" />
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
