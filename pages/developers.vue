<template>
  <div class="space-gradient relative">
    <img
      class="absolute z-[1] mix-blend-overlay portrait:h-screen landscape:w-screen object-cover"
      src="~/assets/images/common/space-cloud.png"
      alt=""
    />
    <ScrollParallax :speed="0.2">
      <img
        class="absolute z-[2] right-0 max-h-[40vh] lg:max-h-[80vh]"
        src="~/assets/images/developers/hero.svg"
        alt=""
      />
    </ScrollParallax>
    <img
      class="fixed z-[3] mix-blend-screen portrait:h-screen landscape:w-screen object-cover"
      src="~/assets/images/common/space-stars.svg"
      alt=""
    />
    <DevelopersHero />
  </div>
  <DevelopersStart class="pb-20 sm:pb-64" />
  <DevelopersAdvantages class="pb-12" />
  <DevelopersMultichain class="pb-28 sm:pb-44" />
  <DevelopersToolkit class="pb-32 sm:pb-64" />
  <DevelopersTestimonials class="pb-28" />
</template>

<script setup lang="ts">
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";

definePageMeta({
  pageTitle: "Developers",
  slug: "developers",
  description:
    "Build Ethereum and native dApps on Astar and be the part of multichain innovation.",
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
