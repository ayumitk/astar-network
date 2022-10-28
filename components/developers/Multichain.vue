<template>
  <div class="relative z-10">
    <div data-aos="zoom-out-right" class="absolute z-[4]">
      <img
        class="max-h-80 sm:max-h-full lg:h-auto"
        src="~/assets/images/developers/multichain-bg.svg"
        alt="Multichain Future"
        width="814"
        height="498"
      />
    </div>
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:flex items-center relative z-10 pt-80"
    >
      <div class="mb-12 lg:mb-0">
        <h2 class="title mb-4 text-center lg:text-left">
          <span>Multichain Future</span>
        </h2>
        <p class="text-center lg:text-left">
          We believe that interoperability is the key. Astar is the blockchain
          that leads the future of web3.
        </p>
      </div>
      <ul class="grid gap-12 lg:ml-28">
        <li v-for="item in future" class="flex">
          <div class="mr-8 shrink-0">
            <img
              :src="useAsset('developers/' + item.image)"
              :alt="item.name"
              width="60"
              height="60"
            />
          </div>
          <div>
            <h3 class="font-bold text-xl mb-1">{{ item.name }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const future = [
  {
    name: "DeFi",
    description:
      "Set to operate a next-gen decentralized exchange, swapping digital assets from across the Interchain, with very low fees and instant transaction confirmation.",
    image: "multichain-defi.svg",
  },
  {
    name: "NFT",
    description:
      "With the upcoming Interchain Security feature, ATOM will soon be securing many chains, in exchange for additional staking rewards.",
    image: "multichain-nft.svg",
  },
  {
    name: "Leading Infra Providers",
    description:
      "A core mission of the Hub – to connect chains by establishing IBC connections with compatible chains and operating decentralized bridges with chains like Ethereum and Bitcoin.",
    image: "multichain-providers.svg",
  },
  {
    name: "DAO",
    description:
      "Located at the crossroads of the Interchain, the Hub is extremely secure, the best place to hold digital assets and manage accounts across many chains.",
    image: "multichain-dao.svg",
  },
];
</script>

<style scoped lang="scss"></style>
