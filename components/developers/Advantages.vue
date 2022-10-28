<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
    <h2 class="title text-center mb-6 sm:mb-16">
      <span>Advantages of Astar</span>
    </h2>
    <ul class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-16">
      <li v-for="(item, index) in advantages">
        <img
          :src="useAsset('developers/' + item.image)"
          :alt="item.name"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          width="150"
          height="130"
        />
        <h3 class="font-bold text-lg sm:text-xl mt-4 mb-2 leading-tight">
          {{ item.name }}
        </h3>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const advantages = [
  {
    name: "Solidity-compatible",
    description: "Easily launch Ethereum dApps",
    image: "advantages-ethereum.svg",
  },
  {
    name: "Next Gen Wasm dApps",
    description: "Easily launch Polkadot native dApps",
    image: "advantages-wasm.svg",
  },
  {
    name: "Highly-Scalable",
    description: "Processes thousands of transactions.",
    image: "advantages-scalable.svg",
  },
  {
    name: "Secure",
    description: "Astar Network is secured by Polkadot Relaychain",
    image: "advantages-secure.svg",
  },
  {
    name: "Private & public XCM",
    description: "Interact with other blockchains with trustless bridges.",
    image: "advantages-xcm.svg",
  },
  {
    name: "Basic Income",
    description: "Earn token while making your projects.",
    image: "advantages-income.svg",
  },
];
</script>

<style scoped lang="scss"></style>
