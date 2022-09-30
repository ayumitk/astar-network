<template>
  <footer
    class="mx-auto max-w-6xl pb-12 px-4 sm:px-6 lg:pb-16 relative z-10"
    :class="page === 'home' ? 'text-white' : 'text-gray-500'"
  >
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <div>
        <h3
          class="font-medium"
          :class="page === 'home' ? 'text-white' : 'text-space-gray-dark'"
        >
          Developers
        </h3>
        <ul role="list" class="mt-4 space-y-4">
          <li
            v-for="item in navigation.developers"
            :key="item.name"
            class="leading-snug"
          >
            <FooterNavItem :item="item" :page="page" />
          </li>
        </ul>
      </div>

      <div class="mt-12 md:mt-0">
        <h3
          class="font-medium"
          :class="page === 'home' ? 'text-white' : 'text-space-gray-dark'"
        >
          Network
        </h3>
        <ul role="list" class="mt-4 space-y-4">
          <li
            v-for="item in navigation.network"
            :key="item.name"
            class="leading-snug"
          >
            <a
              :href="item.href"
              class="hover:underline transition"
              :class="
                page === 'home'
                  ? 'text-gray-200 hover:text-gray-50'
                  : 'text-gray-500 hover:text-space-gray-dark'
              "
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3
          class="font-medium"
          :class="page === 'home' ? 'text-white' : 'text-space-gray-dark'"
        >
          Community
        </h3>
        <ul role="list" class="mt-4 space-y-4">
          <li
            v-for="item in navigation.community"
            :key="item.name"
            class="leading-snug"
          >
            <FooterNavItem :item="item" :page="page" />
          </li>
        </ul>
      </div>

      <div class="mt-12 md:mt-0">
        <h3
          class="font-medium"
          :class="page === 'home' ? 'text-white' : 'text-space-gray-dark'"
        >
          Company
        </h3>
        <ul role="list" class="mt-4 space-y-4">
          <li
            v-for="item in navigation.company"
            :key="item.name"
            class="leading-snug"
          >
            <FooterNavItem :item="item" :page="page" />
          </li>
        </ul>
      </div>

      <div class="mt-12 md:mt-0">
        <h3
          class="font-medium"
          :class="page === 'home' ? 'text-white' : 'text-space-gray-dark'"
        >
          Collaboration
        </h3>
        <ul role="list" class="mt-4 space-y-4">
          <li
            v-for="item in navigation.collaboration"
            :key="item.name"
            class="leading-snug"
          >
            <FooterNavItem :item="item" :page="page" />
          </li>
        </ul>
      </div>
    </div>

    <div
      class="mt-16 border-t pt-8 lg:flex items-center justify-between"
      :class="page === 'home' ? 'text-white' : 'border-gray-200'"
    >
      <div class="flex space-x-6 order-2 justify-center">
        <a
          v-for="item in navigation.social"
          target="_blank"
          rel="noopener"
          :key="item.name"
          :href="item.href"
          class="transition"
          :class="
            page === 'home'
              ? 'text-gray-200 hover:text-gray-50'
              : 'text-gray-400 hover:text-gray-500'
          "
        >
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <p
        class="mt-8 order-1 text-sm lg:mt-0 text-center"
        :class="page === 'home' ? 'text-gray-200' : 'text-gray-400'"
      >
        &copy; 2022 Astar Portal - The Future of Smart Contracts for Multichain.
        All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const Twitter = resolveComponent("IconTwitter");
const Discord = resolveComponent("IconDiscord");
const Telegram = resolveComponent("IconTelegram");
const Medium = resolveComponent("IconMedium");
const Github = resolveComponent("IconGithub");
const Youtube = resolveComponent("IconYoutube");

interface Props {
  page?: string;
}
const props = defineProps<Props>();

const navigation = {
  developers: [
    { name: "Getting Started", href: "/developers" },
    { name: "GitHub", href: "https://github.com/AstarNetwork" },
    { name: "Documentation", href: "https://docs.astar.network/" },
    { name: "Discord", href: "https://discord.gg/Z3nC9U4" },
  ],
  network: [
    { name: "nav", href: "#" },
    { name: "nav", href: "#" },
    { name: "nav", href: "#" },
    { name: "nav", href: "#" },
  ],
  community: [
    { name: "Astar Community", href: "/community" },
    {
      name: "Astar Space Lab",
      href: "https://astarnetwork.notion.site/Astar-SpaceLabs-bee19d9d13ab41ba8d113347ae56448f",
    },
    { name: "Blog", href: "https://medium.com/astar-network" },
    { name: "Videos", href: "https://www.youtube.com/c/AstarNetwork" },
    { name: "Chat with us", href: "https://discord.gg/Z3nC9U4" },
  ],
  company: [
    { name: "About", href: "https://stake.co.jp/en/" },
    { name: "Careers", href: "https://angel.co/company/astar-network" },
    {
      name: "Privacy Policy",
      href: "https://docs.google.com/document/d/1jEbhRfh292TahRMRdeN4z-8MYNU27dCS_vVopV6xQgk/edit?usp=sharing",
    },
    {
      name: "Terms of Use",
      href: "https://docs.google.com/document/d/1gxM0PEzFq7nW5VB11pMcDUaaKxfMz3BjTDtmEem_oo4/edit?usp=sharing",
    },
  ],
  collaboration: [
    {
      name: "Substrate Builders Program",
      href: "https://www.substrate.io/builders-program/",
    },
    {
      name: "Web3 foundation Grants Program",
      href: "https://web3.foundation/grants/",
    },
    {
      name: "Astar Growth Program",
      href: "https://github.com/AstarNetwork/growth-program",
    },
    {
      name: "Bug Bounty Program",
      href: "https://immunefi.com/bounty/astarnetwork",
    },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/astarNetwork",
      icon: Twitter,
    },
    {
      name: "Discord",
      href: "https://discord.gg/Z3nC9U4",
      icon: Discord,
    },
    {
      name: "Telegram",
      href: "https://t.me/PlasmOfficial",
      icon: Telegram,
    },
    {
      name: "Medium",
      href: "https://medium.com/astar-network",
      icon: Medium,
    },
    {
      name: "GitHub",
      href: "https://github.com/AstarNetwork",
      icon: Github,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/c/AstarNetwork",
      icon: Youtube,
    },
  ],
};
</script>

<style scoped lang="postcss"></style>
