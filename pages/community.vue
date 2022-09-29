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
      class="absolute z-[3] right-0 max-h-[40vh] lg:max-h-[80vh] -bottom-4 sm:bottom-4"
      src="../assets/images/community/hero.svg"
      alt=""
    />
    <Header />
    <Hero class="relative z-10" />
  </div>
  <Links class="pb-28 sm:pb-44" />
  <Wayfinding class="pb-28 sm:pb-64" />
  <AstarSpaceLab class="pb-32 sm:pb-64" />
  <Videos class="pb-32 sm:pb-64" />
  <News class="pb-24" />
</template>

<script setup lang="ts">
import Hero from "../components/community/Hero.vue";
import Links from "../components/community/Links.vue";
import Wayfinding from "../components/community/Wayfinding.vue";
import AstarSpaceLab from "../components/community/AstarSpaceLab.vue";
import Videos from "../components/community/Videos.vue";
import News from "../components/community/News.vue";

definePageMeta({
  pageTitle: "Community",
  slug: "community",
  description: "A star is born together with our awesome community.",
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
