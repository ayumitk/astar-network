<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
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
      <li v-for="item in developers">
        <div class="mb-4">
          <img class="mx-auto" :src="useAsset('home/' + item.image)" alt="" />
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
          :class="item.color"
          class="hover:underline transition"
          >Learn more -></a
        >
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
    href: "#",
    color: "text-space-pink hover:text-space-pink-lighter",
  },
  {
    name: "Collator",
    image: "become-collator.svg",
    description: "Run a node and support the network",
    href: "#",
    color: "text-space-sky hover:text-space-sky-lighter",
  },
  {
    name: "Staker",
    image: "become-staker.svg",
    description: "Organize data by signaling on subgraphs",
    href: "#",
    color: "text-space-cyan hover:text-space-cyan-lighter",
  },
  {
    name: "Users",
    image: "become-users.svg",
    description: "Use ASTR and be a part of web3 movement",
    href: "#",
    color: "text-space-teal hover:text-space-teal-lighter",
  },
];
</script>

<style scoped lang="postcss"></style>
