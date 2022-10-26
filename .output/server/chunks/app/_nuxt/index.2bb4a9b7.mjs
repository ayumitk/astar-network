import { i as _export_sfc, _ as _imports_1$1, a as _imports_2$3, q as _imports_0$5, r as _imports_4, s as _imports_5, t as _sfc_main$9, u as __nuxt_component_1, v as __nuxt_component_2, w as _sfc_main$6, x as _sfc_main$5, y as __nuxt_component_5, z as _sfc_main$3, A as _sfc_main$2 } from '../server.mjs';
import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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

const _imports_0 = "" + globalThis.__buildAssetsURL("astar.d14dc7dc.mp4");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeHero = _sfc_main$9;
      const _component_HomeWelcome = __nuxt_component_1;
      const _component_HomeGateway = __nuxt_component_2;
      const _component_HomeBecomeAStar = _sfc_main$6;
      const _component_HomeRecommendedReading = _sfc_main$5;
      const _component_HomeFeatures = __nuxt_component_5;
      const _component_HomeBackers = _sfc_main$3;
      const _component_Footer = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-07041119><div class="bg-black" data-v-07041119><div class="absolute z-0 w-screen h-screen flex items-center" data-v-07041119><video${ssrRenderAttr("poster", "")} webkit-playsinline playsinline muted autoplay loop data-v-07041119><source${ssrRenderAttr("src", _imports_0)} type="video/mp4" data-v-07041119></video></div><div class="space-gradient mix-blend-screen" data-v-07041119><img class="absolute z-[1] mix-blend-overlay"${ssrRenderAttr("src", _imports_1$1)} alt="" data-v-07041119><img class="absolute z-[2] mix-blend-screen"${ssrRenderAttr("src", _imports_2$3)} alt="" data-v-07041119>`);
      _push(ssrRenderComponent(_component_HomeHero, null, null, _parent));
      _push(`<div class="welcome-bg -mt-44 pt-44 pb-32 sm:pb-64" data-v-07041119>`);
      _push(ssrRenderComponent(_component_HomeWelcome, null, null, _parent));
      _push(`</div><div class="gateway-bg" data-v-07041119>`);
      _push(ssrRenderComponent(_component_HomeGateway, { class: "bg-space-gray-dark" }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_HomeBecomeAStar, { class: "pt-32 sm:pt-64 pb-32 sm:pb-64" }, null, _parent));
      _push(ssrRenderComponent(_component_HomeRecommendedReading, { class: "pb-24" }, null, _parent));
      _push(`<img class="w-full"${ssrRenderAttr("src", _imports_0$5)} alt="" data-v-07041119><div class="bg-white" data-v-07041119><div class="sky-gradient" data-v-07041119><div class="sky-gradient-inner" data-v-07041119>`);
      _push(ssrRenderComponent(_component_HomeFeatures, { class: "pt-12 pb-32 sm:pb-56" }, null, _parent));
      _push(ssrRenderComponent(_component_HomeBackers, null, null, _parent));
      _push(`<img class="w-full"${ssrRenderAttr("src", _imports_4)} alt="" data-v-07041119><img class="w-full"${ssrRenderAttr("src", _imports_5)} alt="" data-v-07041119></div></div><div class="footer" data-v-07041119><div class="footer-inner pt-12 sm:pt-28" data-v-07041119>`);
      _push(ssrRenderComponent(_component_Footer, { page: "home" }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-07041119"]]);

export { index as default };
//# sourceMappingURL=index.2bb4a9b7.mjs.map
