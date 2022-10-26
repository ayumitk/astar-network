<template>
  <div class="space-gradient relative">
    <img
      class="absolute z-[1] mix-blend-overlay bottom-0"
      src="~/assets/images/common/space-cloud.png"
      alt=""
    />
    <img
      class="absolute z-[2] mix-blend-screen top-0"
      src="~/assets/images/common/space-stars.svg"
      alt=""
    />
    <img
      class="absolute z-[3] right-0 max-h-[40vh] lg:max-h-[80vh] -bottom-4 sm:bottom-4"
      src="~/assets/images/community/hero.svg"
      alt=""
    />
    <CommunityHero />
  </div>
  <CommunityLinks class="pb-28 sm:pb-44" />
  <CommunityWayfinding class="pb-28 sm:pb-64" />
  <CommunitySpaceLab class="pb-32 sm:pb-64" />
  <CommunityVideos class="pb-32 sm:pb-64" />
  <CommunityNews class="pb-24" />
</template>

<script setup lang="ts">
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
