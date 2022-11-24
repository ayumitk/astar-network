<template>
  <div class="space-gradient relative">
    <nuxt-img
      format="webp"
      quality="90"
      class="absolute z-[1] mix-blend-overlay portrait:h-screen landscape:w-screen object-cover"
      src="/common/space-cloud.png"
      alt=""
      width="1728"
      height="1281"
    />
    <ScrollParallax :speed="0.2">
      <img
        class="absolute z-[3] w-screen h-screen object-scale-down portrait:hidden"
        src="~/assets/images/japan/hero-landscape.svg"
        alt="Astar Japan Lab"
        width="1460"
        height="808"
      />
    </ScrollParallax>
    <img
      class="fixed z-[2] portrait:h-screen landscape:w-screen object-cover"
      src="~/assets/images/common/space-stars.svg"
      alt=""
      width="1728"
      height="1728"
    />
    <JapanHero />
  </div>
  <JapanAbout class="py-24 sm:py-44" />
  <JapanNews class="pt-12 pb-36 lg:py-44" />
  <div class="relative z-10">
    <img
      class="w-full"
      src="~/assets/images/common/cloud.svg"
      alt=""
      width="2000"
      height="464"
    />
    <div class="bg-white text-gray-700">
      <div class="sky-gradient">
        <div class="sky-gradient-inner">
          <JapanMembers class="py-12" />
          <JapanUseCases class="pt-12 pb-24 lg:pt-44" />
          <img
            class="w-full"
            src="~/assets/images/japan/footer-landscape.svg"
            alt=""
            width="1728"
            height="220"
          />
        </div>
      </div>
      <div class="footer">
        <div class="pt-12 sm:pt-28 bg-black">
          <Footer page="home" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";

definePageMeta({
  layout: "home",
  pageTitle: "Astar Japan Lab",
  slug: "japan",
  description:
    "Astar Japan Lab was established to actively conduct research and development, gather knowledge, and exchange opinions on the development of services and business creation using the Astar Network in Japan, with the aim of further developing the Astar Network.",
});
</script>

<style scoped lang="postcss">
.space-gradient::before {
  @apply w-full h-full absolute content-[""] z-[0];
  background: linear-gradient(
    180deg,
    rgba(8, 16, 41, 0) 30%,
    rgba(8, 16, 41, 100) 100%
  );
}
</style>
