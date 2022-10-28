<template>
  <div class="relative">
    <div class="bg-black">
      <div class="absolute z-0 w-screen h-screen flex items-center">
        <ScrollParallax :speed="0.25">
          <video webkit-playsinline playsinline muted autoplay loop>
            <source src="~/assets/videos/astar.mp4" type="video/mp4" />
          </video>
        </ScrollParallax>
      </div>
      <div class="space-gradient mix-blend-screen">
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
          class="fixed z-[2] portrait:h-screen landscape:w-screen object-cover"
          src="~/assets/images/common/space-stars.svg"
          alt=""
          width="1728"
          height="1728"
        />
        <HomeHero />
        <div class="welcome-bg -mt-44 pt-44 pb-32 sm:pb-64">
          <HomeWelcome />
        </div>
      </div>
    </div>

    <HomeGateway />

    <HomeBecomeAStar class="pt-32 sm:pt-64 pb-32 sm:pb-64" />

    <HomeRecommendedReading class="pb-24" />

    <div class="relative z-10">
      <img
        class="w-full"
        src="~/assets/images/common/cloud.svg"
        alt=""
        width="2000"
        height="464"
      />
      <div class="bg-white">
        <div class="sky-gradient">
          <div class="sky-gradient-inner">
            <HomeFeatures class="pt-12 pb-32 sm:pb-56" />
            <HomeBackers />
            <img
              class="w-full"
              src="~/assets/images/home/footer-sky.svg"
              alt=""
              width="1728"
              height="290"
            />
            <img
              class="w-full"
              src="~/assets/images/home/footer-landscape.svg"
              alt=""
              width="1728"
              height="220"
            />
          </div>
        </div>
        <div class="footer">
          <div class="footer-inner pt-12 sm:pt-28">
            <Footer page="home" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";

definePageMeta({
  layout: "home",
  pageTitle: "Home",
  slug: "",
  description:
    "Astar is a scalable decentralised blockchain for next big Web3 innovations.",
});
</script>

<style scoped lang="postcss">
.welcome-bg {
  background: linear-gradient(
    0deg,
    rgba(8, 16, 41, 1) 50%,
    rgba(8, 16, 41, 0) 100%
  );
}
.sky-gradient {
  background: linear-gradient(
    90deg,
    #ffeff8 2.37%,
    #f0e7ff 22.25%,
    #dcedff 43.43%,
    #def2ff 68%,
    #d7faff 85.32%
  );
}
.sky-gradient-inner {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}
.footer {
  background: linear-gradient(260deg, #3d41f8 0.16%, #58cef4 94.67%);
}
.footer-inner {
  background-image: url(~/assets/images/home/footer-reflect.svg);
  background-position: top center;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
