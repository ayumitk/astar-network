<template>
  <div class="relative">
    <div class="pointer-events-none absolute inset-0 z-30" aria-hidden="true" />

    <Popover v-slot="{ open }">
      <div
        :class="[
          open ? 'bg-space-gray-dark shadow-lg bg-opacity-95' : '',
          'transition absolute z-40 w-full',
        ]"
      >
        <div
          class="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-8 md:space-x-10 lg:px-8"
        >
          <a href="/" class="flex">
            <span class="sr-only">Astar Network</span>
            <img
              class="h-10 w-auto sm:h-14"
              src="~/assets/images/common/logo.svg"
              alt="Astar Network"
              width="188"
              height="60"
            />
          </a>

          <div class="-my-2 -mr-2 lg:hidden">
            <MobileNav :network="network" />
          </div>

          <div class="hidden lg:flex lg:items-center">
            <nav class="flex space-x-10">
              <a href="/developers" class="nav-item">Developers</a>

              <PopoverButton
                :class="[
                  open
                    ? 'text-space-cyan-light'
                    : 'text-white hover:text-space-cyan-light',
                  'group inline-flex items-center focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium transition',
                ]"
              >
                <span>Network</span>
                <IconChevronDown
                  :class="[
                    open ? 'text-space-cyan-light' : 'text-gray-200',
                    'ml-2 h-5 w-5 group-hover:text-space-cyan-light',
                  ]"
                  aria-hidden="true"
                />
              </PopoverButton>

              <a href="/community" class="nav-item">Community</a>
              <!-- <a href="#" class="nav-item">Ecosystem</a> -->
              <!-- <a href="#" class="nav-item">About</a> -->
            </nav>
            <div class="md:ml-12">
              <Button
                variant="outlined"
                href="https://portal.astar.network/"
                target="_blank"
                rel="noopener"
              >
                Launch App
                <IconArrowTopRightOnSquare class="w-5 h-5 ml-1 stroke-2" />
              </Button>
            </div>
          </div>
        </div>
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <PopoverPanel class="border-t border-gray-600 hidden lg:block">
            <div
              class="mx-auto grid max-w-7xl pt-10 pb-24 rounded-3xl px-4 sm:px-6"
            >
              <ul class="grid grid-cols-1 sm:grid-cols-3 gap-12">
                <li v-for="item in network">
                  <span
                    class="uppercase block border-b border-gray-600 text-gray-400 pb-1 mb-3"
                    >{{ item.label }}</span
                  >
                  <ul>
                    <li v-for="nav in item.nav">
                      <a
                        class="inline-block py-2 text-white hover:underline transition hover:text-space-cyan-lighter"
                        :href="nav.href"
                        target="_blank"
                        rel="noopener"
                      >
                        {{ nav.label }}
                        <IconArrowTopRightOnSquare
                          class="w-4 h-4 inline-block stroke-2"
                        />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </PopoverPanel>
        </transition>
      </div>
    </Popover>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

const network = [
  {
    label: "Explorer",
    nav: [
      { label: "Subscan", href: "https://astar.subscan.io/" },
      { label: "Blockscout", href: "https://blockscout.com/astar/" },
    ],
  },
  {
    label: "Status",
    nav: [
      {
        label: "DApp Staking",
        href: "https://portal.astar.network/#/astar/dapp-staking/discover",
      },
      { label: "DeFi TVL", href: "https://defillama.com/chain/Astar" },
      {
        label: "Applications",
        href: "https://dappradar.com/rankings/protocol/astar",
      },
    ],
  },
  {
    label: "Infrastructure",
    nav: [
      { label: "Alchemy", href: "https://www.alchemy.com/astar" },
      {
        label: "Blockdeamon",
        href: "https://blockdaemon.com/protocols/astar/",
      },
      {
        label: "Bware Labs",
        href: "https://blastapi.io/",
      },
      {
        label: "OnFinality",
        href: "https://www.onfinality.io/marketplace/astar",
      },
    ],
  },
];
</script>

<style lang="postcss">
.nav-item {
  @apply text-white hover:text-space-cyan-light font-medium transition;
}
</style>
