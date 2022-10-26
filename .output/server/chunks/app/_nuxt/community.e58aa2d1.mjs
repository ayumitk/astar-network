import { i as _export_sfc, _ as _imports_1$1, a as _imports_2$3, b as _imports_2$2, c as __nuxt_component_0$2, d as _sfc_main$t, e as __nuxt_component_2$2, f as __nuxt_component_3, g as __nuxt_component_4, h as __nuxt_component_5$1 } from '../server.mjs';
import { useSSRContext, defineComponent } from 'vue';
import { ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "community",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommunityHero = __nuxt_component_0$2;
      const _component_CommunityLinks = _sfc_main$t;
      const _component_CommunityWayfinding = __nuxt_component_2$2;
      const _component_CommunitySpaceLab = __nuxt_component_3;
      const _component_CommunityVideos = __nuxt_component_4;
      const _component_CommunityNews = __nuxt_component_5$1;
      _push(`<!--[--><div class="space-gradient relative" data-v-5c428dee><img class="absolute z-[1] mix-blend-overlay bottom-0"${ssrRenderAttr("src", _imports_1$1)} alt="" data-v-5c428dee><img class="absolute z-[2] mix-blend-screen"${ssrRenderAttr("src", _imports_2$3)} alt="" data-v-5c428dee><img class="absolute z-[3] right-0 max-h-[40vh] lg:max-h-[80vh] -bottom-4 sm:bottom-4"${ssrRenderAttr("src", _imports_2$2)} alt="" data-v-5c428dee>`);
      _push(ssrRenderComponent(_component_CommunityHero, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CommunityLinks, { class: "pb-28 sm:pb-44" }, null, _parent));
      _push(ssrRenderComponent(_component_CommunityWayfinding, { class: "pb-28 sm:pb-64" }, null, _parent));
      _push(ssrRenderComponent(_component_CommunitySpaceLab, { class: "pb-32 sm:pb-64" }, null, _parent));
      _push(ssrRenderComponent(_component_CommunityVideos, { class: "pb-32 sm:pb-64" }, null, _parent));
      _push(ssrRenderComponent(_component_CommunityNews, { class: "pb-24" }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/community.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const community = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c428dee"]]);

export { community as default };
//# sourceMappingURL=community.e58aa2d1.mjs.map
