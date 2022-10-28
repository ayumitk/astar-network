<template>
  <div class="sm:flex lg:items-end relative z-10">
    <div class="shrink-0 mb-8 sm:mb-0" data-aos="zoom-out-right">
      <img
        class="mx-auto max-w-[280px] sm:max-w-[350px] lg:max-w-full float-animation"
        src="~/assets/images/home/welcome-astronaut.svg"
        alt="Welcome to the leading multichain smart contracts platform"
        width="450"
        height="750"
      />
    </div>
    <div class="xl:flex px-4 sm:px-6 lg:mr-6">
      <div class="sm:mr-4 xl:mx-8 mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold leading-tight mb-6">
          Welcome to the leading multichain smart contracts platform
        </h2>
        <p class="text-xl">
          Astar Network is a blockchian built for developers and by developers.
          Our innovative developer basic income and multivirtual machine allow
          developers to make scalable and secured applications for DeFi, NFTs,
          Web3 and more.
        </p>
      </div>
      <dl class="shrink-0">
        <div
          class="flex flex-col mb-12 xl:mb-16"
          data-aos="zoom-out-left"
          data-aos-delay="200"
        >
          <dt class="order-2 mt-2 text-3xl lg:text-4xl font-bold">
            <span>DApps</span>
          </dt>
          <dd class="order-1">
            <img
              class="max-w-[300px] lg:max-w-full"
              src="~/assets/images/home/welcome-dapps.svg"
              alt="50+ DApps"
              width="403"
              height="133"
            />
          </dd>
        </div>
        <div
          class="flex flex-col"
          data-aos="zoom-out-left"
          data-aos-delay="300"
        >
          <dt class="order-2 mt-2 text-2xl lg:text-3xl font-bold">
            <span>Community Members</span>
          </dt>
          <dd class="order-1">
            <img
              class="max-w-[300px] lg:max-w-full"
              src="~/assets/images/home/welcome-community-members.svg"
              alt="100K Community Members"
              width="505"
              height="105"
            />
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="postcss">
dt span {
  background: linear-gradient(
    120deg,
    #e6007a -5.88%,
    #703ac2 15.42%,
    #0070eb 40.77%,
    #0297fb 72.21%,
    #0ae2ff 95.53%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
