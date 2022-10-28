<template>
  <div
    class="text-gray-600 max-w-7xl mx-auto lg:text-lg space-y-16 sm:space-y-32 px-4 sm:px-6"
  >
    <div v-for="(item, index) in features" class="sm:flex">
      <div
        data-aos="fade-up"
        class="shrink-0 mb-6 sm:mb-0"
        :class="index % 2 === 0 && 'sm:order-2'"
      >
        <img
          :src="useAsset('home/' + item.image)"
          :alt="item.title"
          class="mx-auto"
          width="614"
          height="382"
        />
      </div>
      <div :class="index % 2 === 0 && 'sm:order-1'">
        <h2>
          <span>{{ item.title }}</span>
        </h2>
        <p>{{ item.description }}</p>
        <a
          :href="item.href"
          target="_blank"
          rel="noopener"
          class="flex items-center"
        >
          Learn more<span class="sr-only"> about {{ item.title }}</span>
          <IconArrowTopRightOnSquare class="w-5 h-5 stroke-2 ml-1" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: "Multichain Smart Contracts",
    description:
      "Astar runs in concert with Ethereum, Polkadot, Cosmos, and more, allowing for the free flow of assets and communication between networks for the betterment of all.",
    href: "https://www.youtube.com/watch?v=bJgMm4SUSJQ&t=134s",
    image: "features-multichain.svg",
  },
  {
    title: "Basic Income For Developers",
    description: `We invented the "Build2Earn" concept where we distribute ASTR tokens based on the developers' contribution. By making smart contracts, you are rewarded through our innovation we call "dApp Staking".`,
    href: "https://docs.astar.network/docs/dapp-staking/",
    image: "features-basic-income.svg",
  },
  {
    title: "Web2 + Web3",
    description:
      "Astar supports both web2 and web3 developers. Through our multivirtual machine solution, developers can deploy smart contracts both on Ethereum Virtual Machine and WebAssembly.",
    href: "https://docs.astar.network/docs/wasm/",
    image: "features-web2-web3.svg",
  },
];
</script>

<style scoped lang="postcss">
h2 {
  @apply leading-[1.1] text-3xl lg:text-4xl font-bold;
}
h2 span {
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
p {
  @apply my-4 sm:my-6;
}
a {
  @apply text-space-blue hover:underline hover:text-space-blue-lighter transition;
}
img {
  @apply max-w-[350px] lg:max-w-full;
}
</style>
