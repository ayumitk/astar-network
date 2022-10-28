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
    <img
      class="absolute z-[2] right-0 max-h-[40vh] lg:max-h-[80vh] -bottom-4 lg:bottom-4"
      src="~/assets/images/community/hero.svg"
      alt="Community"
      width="1106"
      height="804"
    />
    <img
      class="fixed z-[3] portrait:h-screen landscape:w-screen object-cover"
      src="~/assets/images/common/space-stars.svg"
      alt=""
      width="1728"
      height="1728"
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
    rgba(8, 16, 41, 0) 30%,
    rgba(8, 16, 41, 100) 100%
  );
}
</style>
