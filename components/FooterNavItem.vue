<template>
  <a
    v-if="item.href.match(/https/)"
    :href="item.href"
    target="_blank"
    rel="noopener"
    class="text-tiny hover:underline transition"
    :class="
      page === 'home'
        ? 'text-gray-200 hover:text-gray-50'
        : 'text-gray-500 hover:text-space-gray-dark'
    "
  >
    {{ item.name }}
    <!-- <ArrowTopRightOnSquareIcon class="w-4 h-4 inline-block stroke-2" /> -->
  </a>
  <a
    v-else
    :href="item.href"
    class="text-tiny hover:underline transition"
    :class="
      page === 'home'
        ? 'text-gray-200 hover:text-gray-100'
        : 'text-gray-500 hover:text-space-gray-dark'
    "
  >
    {{ item.name }}
  </a>
</template>

<script setup lang="ts">
// import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

interface Props {
  item: {
    name: string;
    href: string;
  };
  page?: string;
}
const props = defineProps<Props>();
</script>
