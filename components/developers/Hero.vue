<template>
  <div class="hero-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-24 relative z-10">
      <div class="lg:w-1/2">
        <h1
          class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow"
        >
          Developers
        </h1>
        <p class="text-lg sm:text-xl lg:text-2xl">
          Build Ethereum and native dApps on Astar and be the part of multichain
          innovation.
        </p>
        <ul class="flex justify-center mt-12 space-x-2">
          <li v-for="item in hero">
            <Button
              color="secondary"
              variant="contained"
              :href="item.href"
              target="_blank"
              rel="noopener"
            >
              <component
                :is="item.icon"
                class="h-8 w-8 sm:mr-2 my-2"
                aria-hidden="true"
              />
              <div class="hidden sm:inline">{{ item.name }}</div>
              <!-- <ArrowTopRightOnSquareIcon
                class="w-5 h-5 stroke-2 ml-1 hidden sm:inline"
              /> -->
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import Github from "../icons/Github.vue";
import Documentation from "../icons/Documentation.vue";
import Discord from "../icons/Discord.vue";

const hero = [
  { name: "GitHub", href: "#", icon: Github },
  { name: "Documentation", href: "#", icon: Documentation },
  { name: "Discord", href: "#", icon: Discord },
];
</script>

<style scoped lang="postcss"></style>
