<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Popover class="relative">
    <div class="pointer-events-none absolute inset-0 z-30" aria-hidden="true" />
    <div class="relative z-20">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-8 md:space-x-10 lg:px-8"
      >
        <a href="/" class="flex">
          <span class="sr-only">Astar Network</span>
          <img
            class="h-8 w-auto sm:h-14"
            src="../assets/images/common/logo.svg"
            alt="Astar Network"
          />
        </a>
        <div class="-my-2 -mr-2 lg:hidden">
          <PopoverButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open menu</span>
            <!-- <Bars3Icon class="h-6 w-6" aria-hidden="true" /> -->
          </PopoverButton>
        </div>
        <div class="hidden lg:flex lg:items-center">
          <PopoverGroup as="nav" class="flex space-x-10">
            <a href="/developers" class="nav-item">Developers</a>

            <Popover v-slot="{ open }">
              <PopoverButton
                :class="[
                  open
                    ? 'text-space-cyan-light'
                    : 'text-white hover:text-space-cyan-light',
                  'group inline-flex items-center focus:outline-none focus:ring-0 focus:ring-offset-0 text-base font-mono transition',
                ]"
              >
                <span>Network</span>
                <ChevronDownIcon
                  :class="[
                    open ? 'text-space-cyan-light' : 'text-gray-200',
                    'ml-2 h-5 w-5 group-hover:text-space-cyan-light',
                  ]"
                  aria-hidden="true"
                />
              </PopoverButton>

              <teleport to="body">
                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 -translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-1"
                >
                  <PopoverPanel
                    class="absolute inset-x-0 z-50 hidden transform md:block top-28"
                  >
                    <div
                      class="bg-space-gray-dark bg-opacity-90 shadow-lg mx-auto grid max-w-5xl p-12 rounded-3xl"
                    >
                      <ul>
                        <li v-for="item in network">
                          <a
                            class="inline-block py-2 text-white hover:underline transition hover:text-space-cyan-lighter"
                            :href="item.href"
                            >{{ item.label }}</a
                          >
                        </li>
                      </ul>
                    </div>
                  </PopoverPanel>
                </transition>
              </teleport>
            </Popover>

            <a href="/community" class="nav-item">Community</a>
            <a href="#" class="nav-item">Ecosystem</a>
            <a href="#" class="nav-item">About</a>
          </PopoverGroup>
          <div class="md:ml-12">
            <Button
              variant="outlined"
              href="https://portal.astar.network/"
              target="_blank"
              rel="noopener"
            >
              Launch App
              <!-- <ArrowTopRightOnSquareIcon class="w-5 h-5 ml-1 stroke-2" /> -->
            </Button>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <transition
        enter-active-class="duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <PopoverPanel
          focus
          class="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden"
        >
          <div
            class="rounded-lg bg-space-gray-dark bg-opacity-95 shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="px-5 pt-5 pb-6 sm:pb-8">
              <div class="flex items-center justify-between">
                <div>
                  <img
                    class="h-8 w-auto"
                    src="../assets/images/common/logo.svg"
                    alt="Astar Network"
                  />
                </div>
                <div class="-mr-2">
                  <PopoverButton
                    class="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
                  >
                    <span class="sr-only">Close menu</span>
                    <!-- <XMarkIcon class="h-6 w-6" aria-hidden="true" /> -->
                  </PopoverButton>
                </div>
              </div>
            </div>
            <nav class="py-4 px-5">
              <ul class="">
                <li>
                  <a href="/developers" class="text-white py-4 inline-block"
                    >Developers</a
                  >
                </li>
                <li>
                  <a href="#" class="text-white py-4 inline-block">Network</a>
                  <ul class="pl-6">
                    <li v-for="item in network">
                      <a
                        class="inline-block py-2 text-sm text-gray-300"
                        :href="item.href"
                        >{{ item.label }}</a
                      >
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/community" class="text-white py-4 inline-block"
                    >Community</a
                  >
                </li>
                <li>
                  <a href="#" class="text-white py-4 inline-block">Ecosystem</a>
                </li>
                <li>
                  <a href="#" class="text-white py-4 inline-block">About</a>
                </li>
              </ul>
              <div class="py-6">
                <Button
                  href="https://portal.astar.network/"
                  target="_blank"
                  rel="noopener"
                  size="lg"
                  class="w-full"
                >
                  Launch App
                  <!-- <ArrowTopRightOnSquareIcon class="w-5 h-5 ml-1 stroke-2" /> -->
                </Button>
              </div>
            </nav>
          </div>
        </PopoverPanel>
      </transition>
    </teleport>
  </Popover>
</template>

<script setup>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   ArrowTopRightOnSquareIcon,
// } from "@heroicons/vue/24/outline";
// import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const network = [
  { label: "Nav1", href: "#" },
  { label: "Nav2", href: "#" },
  { label: "Nav3", href: "#" },
];
</script>

<style lang="postcss">
.nav-item {
  @apply text-base text-white hover:text-space-cyan-light font-mono transition;
}
</style>
