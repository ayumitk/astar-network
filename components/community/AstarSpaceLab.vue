<template>
  <div class="px-4 sm:px-6 relative z-10 text-center">
    <div
      class="gradient-outlined-box lg:inline-flex items-center justify-center"
    >
      <div
        class="py-8 sm:py-12 px-6 sm:px-12 lg:pr-0 lg:pl-20 pr-8 lg:max-w-[500px] text-left"
      >
        <h2 class="font-bold text-2xl sm:text-3xl lg:text-4xl">
          <span>Astar Space Lab</span>
        </h2>
        <p>
          Support the Astar core team through community and marketing
          initiatives while accumulating rewards.
        </p>
        <Button
          href="https://astarnetwork.notion.site/Astar-SpaceLabs-bee19d9d13ab41ba8d113347ae56448f"
          class="mt-8"
          target="_blank"
          rel="noopener"
        >
          Learn more
          <ArrowTopRightOnSquareIcon
            class="w-5 h-5 inline-block stroke-2 ml-1"
          />
        </Button>
      </div>
      <div class="shrink-0">
        <img
          src="../../assets/images/community/space=lab.svg"
          alt=""
          class="rounded-b-3xl lg:rounded-r-3xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import Button from "../Button.vue";
</script>

<style scoped lang="postcss"></style>
