<template>
  <div
    class="text-center h-[calc(100vh-120px)] flex items-center justify-center z-10 relative"
  >
    <div class="max-w-7xl px-4 sm:px-6">
      <h1
        class="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] drop-shadow tracking-tight"
      >
        The Future of Smart Contracts for Multichain.
      </h1>
      <p class="sm:text-xl mt-6 sm:mt-10 mb-8 sm:mb-14">
        Astar is a scalable decentralised blockchain for next big Web3
        innovations.
      </p>
      <div class="sm:flex justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          color="secondary"
          variant="outlined"
          size="lg"
          href="https://docs.astar.network/"
          target="_blank"
          rel="noopener"
          class="w-[280px] sm:w-auto"
        >
          Documentation
          <ArrowTopRightOnSquareIcon class="w-6 h-6 ml-1 stroke-2" />
        </Button>
        <Button
          variant="outlined"
          size="lg"
          href="https://portal.astar.network/"
          target="_blank"
          rel="noopener"
          class="w-[280px] sm:w-auto"
        >
          Launch App
          <ArrowTopRightOnSquareIcon class="w-6 h-6 ml-1 stroke-2" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import Button from "../Button.vue";
</script>
