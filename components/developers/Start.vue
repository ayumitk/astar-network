<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
    <h2 class="title text-center mb-16 sm:mb-24">
      <span>Start Building on Astar</span>
    </h2>
    <ul
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 sm:gap-y-20"
    >
      <template v-for="(item, index) in building">
        <li
          class="hover:brightness-125 transition rounded-3xl mb-16 sm:mb-0"
          :class="
            index === 4
              ? `text-space-gray-dark ${item.color}`
              : `text-white ${item.color}`
          "
          data-aos="flip-left"
          :data-aos-delay="index * 100"
        >
          <a href="" class="block">
            <img
              class="mx-auto w-32 sm:w-auto mb-2 -mt-12"
              :src="useAsset('developers/' + item.image)"
              alt=""
            />
            <div class="px-4 sm:px-6 lg:px-7 pb-8 sm:pb-8">
              <h3 class="text-lg sm:text-xl font-bold leading-tight">
                {{ item.title }}
                <span class="whitespace-nowrap">-></span>
              </h3>
            </div>
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
const building = [
  {
    title: "Launch your Ethereum dApps",
    image: "building-ethereum.svg",
    href: "#",
    color: "bg-space-pink hover:bg-space-pink-lighter",
  },
  {
    title: "Launch your Wasm dApps",
    image: "building-wasm.svg",
    href: "#",
    color: "bg-space-purple hover:bg-space-purple-lighter",
  },
  {
    title: "Run a collator",
    image: "building-collator.svg",
    href: "#",
    color: "bg-space-blue hover:bg-space-blue-lighter",
  },
  {
    title: "Integrate an Exchange",
    image: "building-exchange.svg",
    href: "#",
    color: "bg-space-sky hover:bg-space-sky-lighter",
  },
  {
    title: "DApps Template",
    image: "building-template.svg",
    href: "#",
    color: "bg-space-cyan hover:bg-space-cyan-lighter",
  },
];
</script>

<style scoped lang="scss"></style>
