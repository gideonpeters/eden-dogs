<template>
	<div class="mt-8">
		<div class="inline-block">
			<SiteButton class="bg-green" text="Go Back" @click="$router.go(-1)" />
		</div>
		<div class="bg-white mt-4">
			<div class="pt-6">
				<div v-if="isLoading" class="animate-pulse flex space-x-4 sm:px-6">
					<div class="flex-1 space-y-6 py-1">
						<div class="h-2 bg-slate-700 rounded"></div>
					</div>
				</div>
				<div v-else class="lg:col-span-2 lg:border-r lg:border-gray-200 sm:px-6">
					<h1 class="text-2xl capitalize font-extrabold tracking-tight text-gray-900 sm:text-3xl">
						{{ breed }}
					</h1>
				</div>

				<!-- Image gallery -->
				<div class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
					<div class="hidden aspect-w-3 aspect-h-4 h-[25rem] rounded-lg overflow-hidden lg:flex">
						<SiteImage
							v-if="!isLoading"
							:alt="`A ${breed}`"
							:source="mainImage"
							imgClass="w-full h-full object-center object-cover"
						/>
						<div v-else class="animate-pulse flex w-full h-full">
							<div class="bg-slate-700 rounded w-full h-full"></div>
						</div>
					</div>
					<div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
						<div class="aspect-w-3 aspect-h-2 h-[10rem] rounded-lg overflow-hidden">
							<SiteImage
								v-if="!isLoading"
								:alt="`A ${breed}`"
								:source="images[0]"
								imgClass="w-full h-full object-center object-cover"
							/>
							<div v-else class="animate-pulse flex w-full h-full">
								<div class="bg-slate-700 rounded w-full h-full"></div>
							</div>
						</div>
						<div class="aspect-w-3 aspect-h-2 h-[10rem] rounded-lg overflow-hidden">
							<SiteImage
								v-if="!isLoading"
								:alt="`A ${breed}`"
								:source="images[1]"
								imgClass="w-full h-full object-center object-cover"
							/>
							<div v-else class="animate-pulse flex w-full h-full">
								<div class="bg-slate-700 rounded w-full h-full"></div>
							</div>
						</div>
					</div>
					<div class="aspect-w-4 aspect-h-5 h-[25rem] sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4 lg:flex">
						<SiteImage
							v-if="!isLoading"
							:alt="`A ${breed}`"
							:source="images[2]"
							imgClass="w-full h-full object-center object-cover"
						/>
						<div v-else class="animate-pulse flex w-full h-full">
							<div class="bg-slate-700 rounded w-full h-full"></div>
						</div>
					</div>
				</div>

				<!-- Dog info -->
				<div
					class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
				>
					<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 class="text-2xl capitalize font-extrabold tracking-tight text-gray-900 sm:text-3xl">Description</h1>
					</div>
					<div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-3 lg:pr-8">
						<!-- Description and details -->
						<div>
							<h3 class="sr-only">Description</h3>

							<div v-if="!isLoading" class="space-y-6">
								<p class="text-base text-gray-900">{{ description }}</p>
							</div>
							<div v-else class="h-2 animate-pulse flex w-full">
								<div class="bg-slate-700 rounded w-full h-full"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SiteImage from '@/components/SiteImage.vue';
import SiteButton from '@/components/SiteButton.vue';

export default {
	name: 'DogView',
	components: { SiteImage, SiteButton },
	data() {
		return {
			mainImage: '',
			isLoading: false,
			images: ['', '', ''],
			breed: '',
			description:
				'The dog is a pet animal. A dog has sharp teeth so that it can eat flesh very easily, it has four legs, two ears, two eyes, a tail, a mouth, and a nose. It is a very clever animal and is very useful in catching thieves. It runs very fast, barks loudly and attacks the strangers.',
		};
	},
	methods: {
		async fetchBreedInfo() {
			this.isLoading = true;
			try {
				await this.$store.dispatch('fetchBreedInfo', {
					breed: this.breed,
				});
			} catch (error) {
				this.isLoading = false;
			} finally {
				this.isLoading = false;
			}
		},
		async fetchRandomBreeds() {
			this.isLoading = true;
			try {
				const res = await this.$store.dispatch('fetchRandomBreeds', {
					breed: this.breed,
					count: 3,
				});

				this.images = res;
			} catch (error) {
				this.isLoading = false;
			} finally {
				this.isLoading = false;
			}
		},
		pageSetup() {
			this.mainImage = this.$route.query?.img;
			this.breed = this.$route.params?.breed;
			this.fetchRandomBreeds();
		},
	},
	mounted() {
		this.pageSetup();
	},
};
</script>
