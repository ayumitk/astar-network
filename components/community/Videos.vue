<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
    <h2 class="title text-center mb-12 sm:mb-16">
      <span>Featured Videos</span>
    </h2>

    <div class="mb-12 sm:mb-16">
      <a
        class="group sm:flex items-center"
        :href="`https://www.youtube.com/watch?v=${videos[0].id}`"
        target="_blank"
        rel="noopener"
      >
        <div class="sm:mr-5" data-aos="flip-left">
          <nuxt-img
            format="webp"
            quality="90"
            :src="`http://img.youtube.com/vi/${videos[0].id}/maxresdefault.jpg`"
            :alt="videos[0].title"
            class="w-100 rounded-3xl group-hover:brightness-125"
            width="1280"
            height="720"
          />
        </div>
        <div>
          <h3 class="font-medium mt-4 mb-2 text-lg sm:text-2xl">
            {{ videos[0].title }}
          </h3>
          <span
            class="text-space-cyan group-hover:text-space-cyan-lighter group-hover:underline flex items-center"
          >
            Watch video
            <IconArrowTopRightOnSquare class="w-5 h-5 stroke-2 ml-1" />
          </span>
        </div>
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      <template v-for="(video, index) in videos">
        <div v-if="index !== 0">
          <a
            class="group block"
            :href="`https://www.youtube.com/watch?v=${video.id}`"
            :class="index === 0 ? 'flex items-center' : ''"
            target="_blank"
            rel="noopener"
          >
            <div
              :class="index === 0 ? 'mr-5' : ''"
              data-aos="flip-left"
              :data-aos-delay="index * 100"
            >
              <nuxt-img
                format="webp"
                quality="90"
                :src="`http://img.youtube.com/vi/${video.id}/maxresdefault.jpg`"
                :alt="video.title"
                class="w-100 rounded-3xl group-hover:brightness-125"
                width="1280"
                height="720"
              />
            </div>
            <div>
              <h3
                class="font-medium mt-4 mb-2"
                :class="index === 0 ? 'text-2xl' : 'text-lg'"
              >
                {{ video.title }}
              </h3>
              <span
                class="text-space-cyan group-hover:text-space-cyan-lighter group-hover:underline flex items-center"
              >
                Watch video
                <IconArrowTopRightOnSquare class="w-5 h-5 stroke-2 ml-1" />
              </span>
            </div>
          </a>
        </div>
      </template>
    </div>

    <div class="text-center mt-12 sm:mt-20">
      <Button
        size="lg"
        href="https://www.youtube.com/c/AstarNetwork"
        target="_blank"
        rel="noopener"
      >
        Youtube
        <IconArrowTopRightOnSquare class="w-5 h-5 stroke-2 ml-1" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const videos = [
  {
    title: "getting_started: The Astar Portal - What is it?",
    id: "jyS6MYv9uYg",
  },
  {
    title: "A moment with Astar's CEO",
    id: "w2skYR6l9vQ",
  },
  {
    title: "Astar Network Promotion Video Made by Kevin, Astar Ambassador",
    id: "8RA90uyO-ZY",
  },
  {
    title: "Astar 2022 Vision & Strategy",
    id: "W0KbT0ntBnE",
  },
];
</script>

<style scoped lang="postcss">
/* ul li:nth-child(1) {
  grid-column: 1/4;
} */
</style>
