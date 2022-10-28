<template>
  <div class="overflow-hidden">
    <Header />
    <slot />
    <div class="relative z-10">
      <img
        class="w-full"
        src="~/assets/images/common/cloud.svg"
        alt=""
        width="2000"
        height="464"
      />
      <div class="bg-white">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const meta = {
  title: "Astar Network - The Future of Smart Contracts for Multichain.",
  siteName: "Astar Network",
  url: "https://astar.network",
  ogImage: "https://astar.network/social-preview.png",
  twitter: "@AstarNetwork",
};

useHead({
  title: `${route.meta.pageTitle} | ${meta.title}`,
  charset: "utf-8",
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: `${meta.url}/${route.meta.slug}`,
    },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ],
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { name: "description", content: route.meta.description },
    // Twitter
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    { hid: "twitter:site", name: "twitter:site", content: meta.twitter },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: `${meta.url}/${route.meta.slug}`,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: route.meta.pageTitle,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: route.meta.description,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: meta.ogImage,
    },

    // Open Graph
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: meta.siteName,
    },
    { hid: "og:type", property: "og:type", content: "website" },
    {
      hid: "og:url",
      property: "og:url",
      content: meta.url,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: `${route.meta.pageTitle} | ${meta.title}`,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: route.meta.description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: meta.ogImage,
    },
    {
      hid: "og:image:secure_url",
      property: "og:image:secure_url",
      content: meta.ogImage,
    },
    {
      hid: "og:image:alt",
      property: "og:image:alt",
      content: meta.title,
    },
  ],
});
</script>
