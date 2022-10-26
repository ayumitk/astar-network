<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
    <h2 class="title text-center mb-12">
      <span>Testimonials</span>
    </h2>
    <carousel :items-to-show="1.2">
      <slide v-for="item in testimonials" class="px-2 sm:px-8">
        <div
          class="bg-gradient w-full rounded-3xl text-white px-4 py-6 sm:px-12 sm:py-12"
        >
          <div class="relative">
            <!-- <img
              class="mx-auto h-10 sm:h-14"
              src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
              alt="Workcation"
            /> -->
            <blockquote class="pt-6 pb-4">
              <div class="mx-auto text-center sm:text-xl sm:leading-9">
                <p>{{ item.text }}</p>
              </div>
              <footer class="mt-8">
                <div class="md:flex md:items-center md:justify-center">
                  <div class="md:flex-shrink-0">
                    <img
                      class="mx-auto h-16 w-16 rounded-full"
                      :src="useAsset('developers/testimonials/' + item.image)"
                      alt=""
                    />
                  </div>
                  <div class="mt-3 md:mt-0 md:ml-4 md:flex md:items-center">
                    <div class="text-left leading-tight">
                      <div class="text-xl font-medium">{{ item.name }}</div>
                      <div class="text-base">{{ item.company }}</div>
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const testimonials = [
  {
    name: "Ben White",
    company: "Parity Technologies",
    text: "Astar is a layer1 blockchain build on Substrate. Through Polkadot’s shared security and XCMP, Astar's progress on WASM support can enable very unique use-cases to the Polkadot ecosystem.",
    image: "ben-white.jpg",
  },
  {
    name: "Judith Black",
    company: "Workcation",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.",
    image: "dummy.jpg",
  },
  {
    name: "Judith Black",
    company: "Workcation",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.",
    image: "dummy.jpg",
  },
  {
    name: "Judith Black",
    company: "Workcation",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis..",
    image: "dummy.jpg",
  },
];
</script>

<style lang="postcss">
.carousel__viewport {
  overflow: visible;
  @apply mb-6;
}
.carousel__prev,
.carousel__next {
  @apply bg-white shadow;
}
.carousel__prev svg,
.carousel__next svg {
  fill: theme("colors.space-gray.dark");
}
.carousel__pagination-button {
  @apply bg-space-pink-light;
}
.carousel__pagination-button--active {
  @apply bg-space-pink;
}
.bg-gradient {
  background: linear-gradient(
    120deg,
    #e6007a -5.88%,
    #703ac2 15.42%,
    #0070eb 40.77%,
    #0297fb 72.21%,
    #0ae2ff 95.53%
  );
}
</style>
