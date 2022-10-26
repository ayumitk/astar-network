import { i as _export_sfc, _ as _imports_1$1, a as _imports_2$3, j as _imports_2$1, k as _sfc_main$f, l as _sfc_main$e, m as _sfc_main$d, n as _sfc_main$c, o as _sfc_main$b, p as _sfc_main$a } from '../server.mjs';
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
  __name: "developers",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DevelopersHero = _sfc_main$f;
      const _component_DevelopersStart = _sfc_main$e;
      const _component_DevelopersAdvantages = _sfc_main$d;
      const _component_DevelopersMultichain = _sfc_main$c;
      const _component_DevelopersToolkit = _sfc_main$b;
      const _component_DevelopersTestimonials = _sfc_main$a;
      _push(`<!--[--><div class="space-gradient relative" data-v-1f8fdf99><img class="absolute z-[1] mix-blend-overlay bottom-0"${ssrRenderAttr("src", _imports_1$1)} alt="" data-v-1f8fdf99><img class="absolute z-[2] mix-blend-screen"${ssrRenderAttr("src", _imports_2$3)} alt="" data-v-1f8fdf99><img class="absolute z-[3] right-0 max-h-[40vh] lg:max-h-[80vh]"${ssrRenderAttr("src", _imports_2$1)} alt="" data-v-1f8fdf99>`);
      _push(ssrRenderComponent(_component_DevelopersHero, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_DevelopersStart, { class: "pb-20 sm:pb-64" }, null, _parent));
      _push(ssrRenderComponent(_component_DevelopersAdvantages, { class: "pb-12" }, null, _parent));
      _push(ssrRenderComponent(_component_DevelopersMultichain, { class: "pb-28 sm:pb-44" }, null, _parent));
      _push(ssrRenderComponent(_component_DevelopersToolkit, { class: "pb-32 sm:pb-64" }, null, _parent));
      _push(ssrRenderComponent(_component_DevelopersTestimonials, { class: "pb-28" }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/developers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const developers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f8fdf99"]]);

export { developers as default };
//# sourceMappingURL=developers.c5b25fd3.mjs.map
