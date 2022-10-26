<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 class="title text-center mb-12">
      <span>Testimonials</span>
    </h2>
    <carousel :items-to-show="1.2">
      <slide v-for="slide in 5" :key="slide" class="px-2 sm:px-8">
        <div
          class="bg-gradient w-full rounded-3xl text-white px-4 py-6 sm:px-12 sm:py-12"
        >
          <div class="relative">
            <img
              class="mx-auto h-10 sm:h-14"
              src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
              alt="Workcation"
            />
            <blockquote class="mt-6 sm:mt-10">
              <div class="mx-auto text-center sm:text-xl sm:leading-9">
                <p>
                  &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Nemo expedita voluptas culpa sapiente alias molestiae.
                  Numquam corrupti in laborum sed rerum et corporis.&rdquo;
                </p>
              </div>
              <footer class="mt-8">
                <div class="md:flex md:items-center md:justify-center">
                  <div class="md:flex-shrink-0">
                    <img
                      class="mx-auto h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div
                    class="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center"
                  >
                    <div class="text-base font-medium">Judith Black</div>

                    <svg
                      class="mx-1 hidden h-5 w-5 md:block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>

                    <div class="text-base">CEO, Workcation</div>
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
