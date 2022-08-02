<template>
	<div v-lazyload class="image__wrapper flex w-full">
		<img class="image__item" :class="imgClass" :data-url="source" :alt="alt" />
	</div>
</template>

<script>
import LazyLoadDirective from '@/directives/LazyLoadDirective';

export default {
	directives: {
		lazyload: LazyLoadDirective,
	},
	props: {
		source: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			default: '',
		},
		imgClass: {
			type: String,
			default: '',
		},
	},
};
</script>
