<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
    <h2 class="text-center mb-20">
      <small class="block text-lg sm:text-3xl font-medium">
        Join the fast growing ecosystem
      </small>
      <span
        class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight title"
      >
        <span>Become A STAR Today!</span>
      </span>
    </h2>
    <ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-8">
      <li v-for="(item, index) in developers">
        <div class="mb-4">
          <img
            class="mx-auto"
            :src="useAsset('home/' + item.image)"
            :alt="item.name"
            data-aos="fade-up"
            :data-aos-delay="index * 200"
            width="240"
            height="210"
          />
        </div>
        <h3
          class="text-2xl font-bold text-center sm:text-left"
          :class="item.color"
        >
          {{ item.name }}
        </h3>
        <p class="my-2">{{ item.description }}</p>
        <a
          :href="item.href"
          target="_blank"
          rel="noopener"
          :class="item.color"
          class="hover:underline transition flex items-center"
        >
          Learn more<span class="sr-only"> about {{ item.name }}</span>
          <IconArrowTopRightOnSquare class="w-5 h-5 stroke-2 ml-1" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const developers = [
  {
    name: "Developer",
    image: "become-developer.svg",
    description: "Create a dApp or infrastructure to realise web3",
    href: "https://docs.astar.network/docs/quickstart/",
    color: "text-space-pink hover:text-space-pink-lighter",
  },
  {
    name: "Collator",
    image: "become-collator.svg",
    description: "Run a node and support the network",
    href: "https://docs.astar.network/docs/nodes/",
    color: "text-space-sky hover:text-space-sky-lighter",
  },
  {
    name: "Staker",
    image: "become-staker.svg",
    description: "Stake ASTR and earn ASTR",
    href: "https://portal.astar.network/#/astar/dapp-staking/discover",
    color: "text-space-cyan hover:text-space-cyan-lighter",
  },
  {
    name: "Users",
    image: "become-users.svg",
    description: "Use ASTR and be a part of web3 movement",
    href: "https://portal.astar.network/#/astar/assets",
    color: "text-space-teal hover:text-space-teal-lighter",
  },
];
</script>

<style scoped lang="postcss"></style>
