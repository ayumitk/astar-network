<template>
  <Popover>
    <PopoverButton
      class="inline-flex items-center justify-center rounded-md p-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
    >
      <span class="sr-only">Open menu</span>
      <IconBars3 class="h-6 w-6" aria-hidden="true" />
    </PopoverButton>

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
          class="absolute inset-x-0 top-0 z-50 origin-top-right transform transition"
        >
          <div class="bg-space-gray-dark shadow-lg min-h-screen pb-96">
            <div
              class="flex items-center justify-between px-4 py-5 sm:px-6 sm:py-8"
            >
              <a href="/" class="block">
                <img
                  class="h-10 w-auto sm:h-14"
                  src="~/assets/images/common/logo.svg"
                  alt="Astar Network"
                  width="188"
                  height="60"
                />
              </a>
              <div class="-mr-2 sm:mr-0">
                <PopoverButton
                  class="inline-flex items-center justify-center rounded-md p-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
                >
                  <span class="sr-only">Close menu</span>
                  <IconXMark class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <nav class="">
              <ul class="border-b border-gray-600">
                <li>
                  <a
                    href="/developers"
                    class="text-white block border-t border-gray-600 px-6 py-5"
                    >Developers</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="text-white block border-t border-gray-600 px-6 py-5"
                    >Network</a
                  >
                  <ul class="px-6 py-4 text-sm">
                    <li v-for="item in network" class="mb-6">
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
                </li>
                <li>
                  <a
                    href="/community"
                    class="text-white block border-t border-gray-600 px-6 py-5"
                    >Community</a
                  >
                </li>
                <!-- <li>
                  <a
                    href="#"
                    class="text-white block border-t border-gray-600 px-6 py-5"
                    >Ecosystem</a
                  >
                </li> -->
              </ul>
              <div class="py-12 px-6">
                <Button
                  href="https://portal.astar.network/"
                  target="_blank"
                  rel="noopener"
                  size="lg"
                  class="w-full"
                >
                  Launch App
                  <IconArrowTopRightOnSquare class="w-5 h-5 ml-1 stroke-2" />
                </Button>
              </div>
            </nav>
          </div>
        </PopoverPanel>
      </transition>
    </teleport>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

interface Network {
  label: string;
  nav: Array<Nav>;
}

interface Nav {
  label: string;
  href: string;
}

interface Props {
  network: Array<Network>;
}

const props = defineProps<Props>();
</script>
