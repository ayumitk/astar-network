<template>
  <div class="bg-gradient-to-b from-white to-[#D0E9F0] relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 class="title text-center mb-12 sm:mb-16"><span>Use Cases</span></h2>
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 sm:gap-y-20"
      >
        <li v-for="(item, index) in news">
          <a
            :href="item.href"
            target="_blank"
            rel="noopener"
            class="block group"
          >
            <div
              class="mb-4"
              data-aos="flip-left"
              :data-aos-delay="index * 100"
            >
              <nuxt-img
                format="webp"
                quality="90"
                width="760"
                class="h-52 w-full object-cover rounded-3xl group-hover:brightness-125"
                :src="`/use-cases/${item.image}`"
                :alt="item.title"
              />
            </div>
            <p
              class="font-medium mb-2 transition group-hover:underline group-hover:text-blue-600"
            >
              {{ item.title }}
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const news = [
  {
    title:
      "AstarFarm, a GameFi on Astar Network, will collaborate with Hakuhodo and Calbee to raffle off actual products to game players!",
    image: "astarfarm.png",
    href: "",
  },
  {
    title: 'Shiden NFT was distributed at "MILIYAH NFT Club".',
    image: "miliyah.png",
    href: "",
  },
  {
    title: '"Left-Handed Ellen" NFT sales case study using Astar',
    image: "ellen.png",
    href: "",
  },
  {
    title:
      "Distributed Shiden Network's NFT by Sound at a live music concert venue.",
    image: "revolt.png",
    href: "",
  },
  {
    title: "Astar Network advertised in Nikkei Newspaper and distributed NFT",
    image: "nikkei.png",
    href: "",
  },
  {
    title:
      "Shiden Network's NFT was distributed in real time via audio on RKB.",
    image: "rkb.png",
    href: "",
  },
];
</script>

<style scoped lang="postcss"></style>
