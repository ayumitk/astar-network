<template>
  <ul
    class="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative z-10 sm:-mt-28"
  >
    <li
      v-for="(item, index) in links"
      :class="item.color"
      class="rounded-3xl text-center shadow-xl"
    >
      <a
        :href="item.href"
        class="py-12 px-6 h-full flex items-center justify-center"
        :class="index === 2 ? 'text-space-gray-dark' : 'text-white'"
      >
        <div>
          <span class="block text-2xl font-bold leading-tight">{{
            item.label
          }}</span>
          <span
            class="block mt-4 border rounded-full py-1"
            :class="index === 2 ? 'border-space-gray-dark' : 'border-white'"
          >
            {{ item.to }}
            <ArrowTopRightOnSquareIcon class="w-5 h-5 inline-block stroke-2" />
          </span>
        </div>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

const links = [
  {
    label: "Learn in depth",
    to: "Go to Medium",
    href: "https://medium.com/astar-network",
    color: "bg-space-pink hover:bg-space-pink-lighter",
  },
  {
    label: "Watch our featured videos",
    to: "Go to YouTube",
    href: "https://www.youtube.com/c/AstarNetwork",
    color: "bg-space-blue hover:bg-space-blue-lighter",
  },
  {
    label: "Chat with us directly",
    to: "Go to Discord",
    href: "https://discord.gg/Z3nC9U4",
    color: "bg-space-cyan hover:bg-space-cyan-lighter",
  },
];
</script>
