<template>
	<div id="app" class="relative py-3 px-32 bg-green-10 flex flex-col min-h-screen h-full overflow-x-hidden overflow-y-hidden">
		<SiteHeader class="z-40" />

		<slot />

		<svg class="absolute z-0 top-[-2rem] left-[-5rem] h-[30rem] w-[30rem] text-purple">
			<use href="@/assets/img/blob-1.svg#blob-1"></use>
		</svg>
		<svg class="absolute z-0 top-[-2rem] right-[3rem] h-[30rem] w-[30rem] text-purple">
			<use href="@/assets/img/blob-3.svg#blob-3"></use>
		</svg>
		<svg class="absolute z-0 bottom-[-2rem] right-[3rem] h-[30rem] w-[30rem] text-purple">
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
