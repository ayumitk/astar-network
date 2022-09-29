<template>
  <div class="space-gradient relative min-h-[60vh] sm:min-h-[80vh]">
    <img
      class="absolute z-[1] mix-blend-overlay bottom-0"
      src="../assets/images/common/space-cloud.png"
      alt=""
    />
    <img
      class="absolute z-[2] mix-blend-screen"
      src="../assets/images/common/space-stars.svg"
      alt=""
    />
    <img
      class="absolute z-[3] right-0 max-h-[40vh] lg:max-h-[80vh]"
      src="../assets/images/developers/hero.svg"
      alt=""
    />
    <Header />
    <Hero class="pb-24 sm:pb-64" />
  </div>
  <StartBuilding class="pb-20 sm:pb-64" />
  <Advantages class="pb-12" />
  <MultichainFuture class="pb-28 sm:pb-44" />
  <DeveloperToolkit class="pb-32 sm:pb-64" />
  <Testimonials class="pb-28" />
</template>

<script setup lang="ts">
import Hero from "../components/developers/Hero.vue";
import StartBuilding from "../components/developers/StartBuilding.vue";
import Advantages from "../components/developers/Advantages.vue";
import MultichainFuture from "../components/developers/MultichainFuture.vue";
import DeveloperToolkit from "../components/developers/DeveloperToolkit.vue";
import Testimonials from "../components/developers/Testimonials.vue";

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
    rgba(8, 16, 41, 0) 50%,
    rgba(8, 16, 41, 100) 100%
  );
}
</style>
