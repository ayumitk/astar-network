<template>
  <div>
    <div class="relative bg-black">
      <div class="absolute z-0 w-screen h-screen flex items-center">
        <video poster="" webkit-playsinline playsinline muted autoplay loop>
          <source src="../assets/videos/astar.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="space-gradient mix-blend-screen">
        <img
          class="absolute z-[1] mix-blend-overlay"
          src="../assets/images/common/space-cloud.png"
          alt=""
        />
        <img
          class="absolute z-[2] mix-blend-screen"
          src="../assets/images/common/space-stars.svg"
          alt=""
        />
        <Header />
        <Hero />
        <div class="welcome-bg -mt-44 pt-44 pb-32 sm:pb-64">
          <Welcome />
        </div>
        <div class="gateway-bg">
          <Gateway class="bg-space-gray-dark" />
        </div>
      </div>
    </div>

    <BecomeAStar class="pt-32 sm:pt-64 pb-32 sm:pb-64" />

    <RecommendedReading class="pb-24" />
    <img class="w-full" src="../assets/images/common/cloud.svg" alt="" />
    <div class="bg-white">
      <div class="sky-gradient">
        <div class="sky-gradient-inner">
          <Features class="pt-12 pb-32 sm:pb-56" />
          <Backers />
          <img
            class="w-full"
            src="../assets/images/home/footer-sky.svg"
            alt=""
          />
          <img
            class="w-full"
            src="../assets/images/home/footer-landscape.svg"
            alt=""
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
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Hero from "../components/home/Hero.vue";
import Welcome from "../components/home/Welcome.vue";
import Gateway from "../components/home/Gateway.vue";
import BecomeAStar from "../components/home/BecomeAStar.vue";
import RecommendedReading from "../components/home/RecommendedReading.vue";
import Features from "../components/home/Features.vue";
import Backers from "../components/home/Backers.vue";

definePageMeta({
  // layout: "home",
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
.gateway-bg {
  @apply bg-space-gray-dark;
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
  background-image: url(../assets/images/home/footer-reflect.svg);
  background-position: top center;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
