<template>
	<div id="app" class="relative py-3 px-10 bg-green-30 flex flex-col min-h-screen h-full overflow-x-hidden">
		<SiteHeader class="z-40" />

		<router-view class="z-40" />

		<svg class="absolute z-0 top-[-2rem] left-[-5rem] h-[30rem] w-[30rem] text-white">
			<use href="@/assets/img/blob-1.svg#blob-1"></use>
		</svg>
		<svg class="absolute z-0 top-[-2rem] right-[-5rem] h-[30rem] w-[30rem] text-white">
			<use href="@/assets/img/blob-3.svg#blob-3"></use>
		</svg>
		<svg class="absolute z-0 bottom-[-2rem] right-[-5rem] h-[30rem] w-[30rem] text-white">
			<use href="@/assets/img/blob-2.svg#blob-2"></use>
		</svg>
	</div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader.vue';

export default {
	components: {
		SiteHeader,
	},
};
</script>
