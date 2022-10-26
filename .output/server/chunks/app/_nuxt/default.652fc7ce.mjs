import { _ as _sfc_main$1 } from './Header.c693ac01.mjs';
import { B as useRoute, C as useHead, q as _imports_0$5, A as _sfc_main$2 } from '../server.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr } from 'vue/server-renderer';
import '@headlessui/vue';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'defu';
import '@vue/shared';
import 'vue3-carousel';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const meta = {
      title: "Astar Network - The Future of Smart Contracts for Multichain.",
      siteName: "Astar Network",
      url: "https://astar.network",
      ogImage: "https://astar.network/social-preview.png",
      twitter: "@AstarNetwork"
    };
    useHead({
      title: `${route.meta.pageTitle} | ${meta.title}`,
      charset: "utf-8",
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${meta.url}/${route.meta.slug}`
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ],
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        { name: "description", content: route.meta.description },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image"
        },
        { hid: "twitter:site", name: "twitter:site", content: meta.twitter },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: `${meta.url}/${route.meta.slug}`
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: route.meta.pageTitle
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: route.meta.description
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: meta.ogImage
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: meta.siteName
        },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: meta.url
        },
        {
          hid: "og:title",
          property: "og:title",
          content: `${route.meta.pageTitle} | ${meta.title}`
        },
        {
          hid: "og:description",
          property: "og:description",
          content: route.meta.description
        },
        {
          hid: "og:image",
          property: "og:image",
          content: meta.ogImage
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: meta.ogImage
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: meta.title
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$1;
      const _component_Footer = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<img class="w-full"${ssrRenderAttr("src", _imports_0$5)} alt=""><div class="bg-white">`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.652fc7ce.mjs.map
