import { getCurrentInstance, inject, computed, defineComponent, provide, h, Suspense, Transition, reactive, mergeProps, useSSRContext, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, Fragment as Fragment$1, renderList, createTextVNode, defineAsyncComponent, isRef, ref, resolveComponent, watchEffect, markRaw, shallowRef, createApp, toRef, onErrorCaptured } from 'vue';
import { $fetch } from 'ohmyfetch';
import { joinURL, hasProtocol, isEqual, parseURL } from 'ufo';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { createError as createError$1, sendRedirect } from 'h3';
import defu, { defuFn } from 'defu';
import { isFunction } from '@vue/shared';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderSlot, ssrRenderVNode, ssrRenderSuspense } from 'vue/server-renderer';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { a as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
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

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$3 = defineNuxtLink({ componentName: "NuxtLink" });
const inlineConfig = {};
defuFn(inlineConfig);
function useHead(meta2) {
  const resolvedMeta = isFunction(meta2) ? computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document) => {
  const el = document.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "renderPriority" || key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagDeduper = (tag) => {
  if (!["meta", "base", "script", "link"].includes(tag.tag)) {
    return false;
  }
  const { props, tag: tagName } = tag;
  if (tagName === "base") {
    return true;
  }
  if (tagName === "link" && props.rel === "canonical") {
    return { propValue: "canonical" };
  }
  if (props.charset) {
    return { propKey: "charset" };
  }
  const name = ["key", "id", "name", "property", "http-equiv"];
  for (const n of name) {
    let value = void 0;
    if (typeof props.getAttribute === "function" && props.hasAttribute(n)) {
      value = props.getAttribute(n);
    } else {
      value = props[n];
    }
    if (value !== void 0) {
      return { propValue: n };
    }
  }
  return false;
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: { key: "default", ...obj[key] } });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: unref(item) });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document = window.document, type, tags) => {
  var _a, _b;
  const head = document.head;
  const body = document.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document),
      body: (_a2 = tag.props.body) != null ? _a2 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute(
    "content",
    "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length)
  );
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const titleTemplate = allHeadObjs.map((i) => unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(unref(objs));
        tags.forEach((tag) => {
          const dedupe = getTagDeduper(tag);
          if (dedupe) {
            let index = -1;
            for (let i = 0; i < deduped.length; i++) {
              const prev = deduped[i];
              if (prev.tag !== tag.tag) {
                continue;
              }
              if (dedupe === true) {
                index = i;
              } else if (dedupe.propValue && unref(prev.props[dedupe.propValue]) === unref(tag.props[dedupe.propValue])) {
                index = i;
              } else if (dedupe.propKey && prev.props[dedupe.propKey] && tag.props[dedupe.propKey]) {
                index = i;
              }
              if (index !== -1) {
                break;
              }
            }
            if (index !== -1) {
              deduped.splice(index, 1);
            }
          }
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(
              titleTemplate,
              tag.props.children
            );
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags.sort(sortTags)) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document.title = title;
      }
      setAttrs(document.documentElement, htmlAttrs);
      setAttrs(document.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  if (tag.props.renderPriority) {
    delete tag.props.renderPriority;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var sortTags = (aTag, bTag) => {
  const tagWeight = (tag) => {
    if (tag.props.renderPriority) {
      return tag.props.renderPriority;
    }
    switch (tag.tag) {
      case "base":
        return -1;
      case "meta":
        if (tag.props.charset) {
          return -2;
        }
        if (tag.props["http-equiv"] === "content-security-policy") {
          return 0;
        }
        return 10;
      default:
        return 10;
    }
  };
  return tagWeight(aTag) - tagWeight(bTag);
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags.sort(sortTags)) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs({
        ...htmlAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      });
    },
    get bodyAttrs() {
      return stringifyAttrs({
        ...bodyAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      });
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    watchEffect(() => {
      head.updateDOM();
    });
  });
  nuxtApp._useHead = (_meta) => {
    const meta2 = ref(_meta);
    const headObj = computed(() => {
      const overrides = { meta: [] };
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => {
      const meta2 = renderHeadToString(head);
      return {
        ...meta2,
        bodyScripts: meta2.bodyTags
      };
    };
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    fetchpriority: String,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const NoScript = defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
const Link = defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((props) => {
    const meta2 = { ...props };
    if (meta2.httpEquiv) {
      meta2["http-equiv"] = meta2.httpEquiv;
      delete meta2.httpEquiv;
    }
    return {
      meta: [meta2]
    };
  })
});
const Style = defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  NoScript,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const appHead = { "meta": [], "link": [], "style": [], "script": [], "noscript": [], "charset": "utf-8", "viewport": "width=device-width, initial-scale=1" };
const appLayoutTransition = { "name": "layout", "mode": "out-in" };
const appPageTransition = { "name": "page", "mode": "out-in" };
const appKeepalive = false;
const metaMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2 = defineNuxtPlugin((nuxtApp) => {
  useHead(markRaw({ title: "", ...appHead }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = inject(isNestedKey, false);
    provide(isNestedKey, true);
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const transitionProps = (_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition;
          return _wrapIf(
            Transition,
            transitionProps,
            wrapInKeepAlive(
              (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive,
              isNested && nuxtApp.isHydrating ? h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) : h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) })
            )
          ).default();
        }
      });
    };
  }
});
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$v = {};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[60vh] sm:min-h-[80vh] flex items-center justify-start" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full"><div class="lg:w-1/2"><h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow"> Community </h1><p class="text-lg sm:text-xl lg:text-2xl"> A star is born together with our awesome community. </p></div></div></div>`);
}
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/community/Hero.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["ssrRender", _sfc_ssrRender$d]]);
const _sfc_main$u = {};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg>`);
}
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/ArrowTopRightOnSquare.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __nuxt_component_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["ssrRender", _sfc_ssrRender$c]]);
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "Links",
  __ssrInlineRender: true,
  setup(__props) {
    const links = [
      {
        label: "Learn in depth",
        to: "Go to Medium",
        href: "https://medium.com/astar-network",
        color: "bg-space-pink hover:bg-space-pink-lighter"
      },
      {
        label: "Watch our featured videos",
        to: "Go to YouTube",
        href: "https://www.youtube.com/c/AstarNetwork",
        color: "bg-space-blue hover:bg-space-blue-lighter"
      },
      {
        label: "Chat with us directly",
        to: "Go to Discord",
        href: "https://discord.gg/Z3nC9U4",
        color: "bg-space-cyan hover:bg-space-cyan-lighter"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative z-10 sm:-mt-28" }, _attrs))}><!--[-->`);
      ssrRenderList(links, (item, index) => {
        _push(`<li class="${ssrRenderClass([item.color, "rounded-3xl text-center shadow-xl"])}"><a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([index === 2 ? "text-space-gray-dark" : "text-white", "py-12 px-6 h-full flex items-center justify-center"])}"><div><span class="block text-2xl font-bold leading-tight">${ssrInterpolate(item.label)}</span><span class="${ssrRenderClass([index === 2 ? "border-space-gray-dark" : "border-white", "mt-4 border rounded-full py-1 flex justify-center items-center"])}">${ssrInterpolate(item.to)} `);
        _push(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" }, null, _parent));
        _push(`</span></div></a></li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/community/Links.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = {};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M21.533 6.858c.015.213.015.426.015.64 0 6.502-4.949 13.994-13.995 13.994A13.9 13.9 0 0 1 0 19.284c.396.046.777.061 1.188.061 2.3 0 4.416-.776 6.106-2.101a4.928 4.928 0 0 1-4.599-3.412c.305.046.61.077.93.077a5.2 5.2 0 0 0 1.294-.168A4.92 4.92 0 0 1 .975 8.914v-.061a4.954 4.954 0 0 0 2.223.624 4.915 4.915 0 0 1-2.193-4.096c0-.914.244-1.752.67-2.483a13.981 13.981 0 0 0 10.142 5.148 5.555 5.555 0 0 1-.122-1.127A4.917 4.917 0 0 1 16.615 2c1.415 0 2.695.594 3.593 1.553a9.684 9.684 0 0 0 3.122-1.188 4.906 4.906 0 0 1-2.163 2.711A9.86 9.86 0 0 0 24 4.315a10.572 10.572 0 0 1-2.467 2.543Z" fill="currentColor"></path></svg>`);
}
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Twitter.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["ssrRender", _sfc_ssrRender$b]]);
const _sfc_main$r = {};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><g clip-path="url(#a)"><path d="M20.348 4.544a.062.062 0 0 0-.03-.028A19.8 19.8 0 0 0 15.431 3a.074.074 0 0 0-.079.037c-.223.406-.426.823-.608 1.25a18.28 18.28 0 0 0-5.487 0 12.634 12.634 0 0 0-.617-1.25.077.077 0 0 0-.079-.037c-1.687.291-3.33.8-4.885 1.515a.07.07 0 0 0-.032.027C.533 9.19-.32 13.723.099 18.198a.082.082 0 0 0 .031.056 19.905 19.905 0 0 0 5.993 3.028.078.078 0 0 0 .084-.027c.463-.63.873-1.297 1.226-1.994a.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.075.075 0 0 1 .078-.01c3.927 1.792 8.18 1.792 12.06 0a.075.075 0 0 1 .08.009c.12.099.245.198.372.292a.076.076 0 0 1 .03.066.078.078 0 0 1-.037.062c-.598.349-1.224.647-1.873.89a.078.078 0 0 0-.044.045.077.077 0 0 0 .004.062c.359.694.768 1.36 1.225 1.993a.076.076 0 0 0 .084.028 19.838 19.838 0 0 0 6.002-3.028.077.077 0 0 0 .032-.055c.5-5.175-.838-9.67-3.549-13.655ZM8.02 15.473c-1.182 0-2.157-1.086-2.157-2.418 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.332-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.332-.946 2.418-2.157 2.418Z" fill="currentColor"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>`);
}
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Discord.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["ssrRender", _sfc_ssrRender$a]]);
const _sfc_main$q = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><g clip-path="url(#a)"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.562 8.161c-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.226-.46-1.9-.902-1.057-.693-1.653-1.124-2.679-1.8-1.184-.78-.416-1.209.259-1.91.177-.184 3.247-2.977 3.306-3.23.008-.032.015-.15-.055-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.478.329-.912.49-1.3.48-.43-.008-1.253-.241-1.866-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.1-.002.322.023.465.14.096.082.157.198.171.324.024.157.031.315.02.473Z" fill="currentColor"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>`);
}
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Telegram.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __nuxt_component_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["ssrRender", _sfc_ssrRender$9]]);
const _sfc_main$p = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M6.769 4.785C3.03 4.785 0 7.836 0 11.6c0 3.764 3.03 6.815 6.769 6.815 3.738 0 6.768-3.051 6.768-6.815 0-3.764-3.03-6.815-6.768-6.815Zm10.81.4c-1.87 0-3.385 2.872-3.385 6.415s1.515 6.416 3.384 6.416c1.87 0 3.385-2.873 3.385-6.416 0-3.544-1.515-6.416-3.385-6.416Zm5.23.667c-.657 0-1.19 2.574-1.19 5.748 0 3.174.533 5.748 1.19 5.748.658 0 1.191-2.574 1.191-5.748 0-3.174-.533-5.748-1.19-5.748Z" fill="currentColor"></path></svg>`);
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Medium.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$o = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><g clip-path="url(#a)"><path d="M8.027 18.842c0 .097-.11.174-.251.174-.16.015-.271-.063-.271-.174 0-.097.111-.174.251-.174.146-.015.271.063.271.174Zm-1.504-.218c-.034.097.062.208.208.237.125.049.27 0 .3-.096.029-.097-.063-.209-.208-.252-.126-.034-.267.014-.3.111Zm2.138-.082c-.14.034-.237.126-.222.237.014.097.14.16.285.126.14-.034.237-.126.223-.223-.015-.092-.145-.155-.286-.14ZM11.845 0C5.134 0 0 5.095 0 11.806c0 5.367 3.377 9.959 8.202 11.575.619.11.837-.271.837-.586 0-.3-.015-1.955-.015-2.97 0 0-3.387.725-4.098-1.443 0 0-.552-1.408-1.345-1.77 0 0-1.108-.76.077-.746 0 0 1.205.097 1.868 1.248 1.06 1.868 2.835 1.331 3.527 1.012.112-.774.426-1.312.774-1.63-2.704-.3-5.433-.693-5.433-5.348 0-1.33.367-1.998 1.141-2.85-.125-.314-.537-1.61.126-3.285C6.673 4.698 9 6.319 9 6.319a11.369 11.369 0 0 1 3.039-.41c1.03 0 2.07.14 3.038.41 0 0 2.328-1.625 3.34-1.306.662 1.679.25 2.97.125 3.285.774.857 1.248 1.525 1.248 2.85 0 4.67-2.85 5.042-5.554 5.347.445.382.822 1.108.822 2.245 0 1.631-.014 3.649-.014 4.046 0 .314.222.696.837.585C20.719 21.765 24 17.173 24 11.807 24 5.095 18.556 0 11.845 0ZM4.703 16.689c-.063.048-.048.16.034.251.078.078.189.112.252.049.063-.049.048-.16-.034-.252-.078-.077-.189-.111-.252-.048Zm-.522-.392c-.034.063.014.14.11.188.078.049.175.034.209-.033.034-.063-.015-.14-.111-.19-.097-.028-.174-.014-.208.035Zm1.567 1.722c-.077.063-.048.208.063.3.112.112.252.126.315.049.063-.063.034-.208-.063-.3-.107-.112-.252-.126-.315-.049Zm-.551-.71c-.078.047-.078.173 0 .284.077.112.208.16.27.112.078-.063.078-.189 0-.3-.067-.111-.193-.16-.27-.097Z" fill="currentColor"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>`);
}
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Github.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const __nuxt_component_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$n = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M23.498 6.64a3.016 3.016 0 0 0-2.121-2.135C19.505 4 12 4 12 4s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.64C0 8.524 0 12.454 0 12.454s0 3.93.502 5.815a2.97 2.97 0 0 0 2.121 2.101c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a2.97 2.97 0 0 0 2.122-2.101C24 16.385 24 12.455 24 12.455s0-3.93-.502-5.815ZM9.546 16.023V8.886l6.273 3.569-6.273 3.568Z" fill="currentColor"></path></svg>`);
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Youtube.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const __nuxt_component_5$2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$m = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    class: "w-6 h-6"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"></path></svg>`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Comments.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "Wayfinding",
  __ssrInlineRender: true,
  setup(__props) {
    const Twitter = __nuxt_component_0$1;
    const Discord = __nuxt_component_1$1;
    const Telegram = __nuxt_component_2$3;
    const Medium = __nuxt_component_3$1;
    const Github = __nuxt_component_4$1;
    const Youtube = __nuxt_component_5$2;
    const Comments = __nuxt_component_6;
    const social = [
      {
        name: "Twitter",
        href: "https://twitter.com/astarNetwork",
        icon: Twitter,
        stats: "85,032",
        unit: "followers",
        type: "Announcements",
        color: "text-[#1DA1F2]"
      },
      {
        name: "Discord",
        href: "https://discord.gg/Z3nC9U4",
        icon: Discord,
        stats: "85,032",
        unit: "members",
        type: "Engineering",
        color: "text-[#5865F2]"
      },
      {
        name: "Telegram",
        href: "https://t.me/PlasmOfficial",
        icon: Telegram,
        stats: "85,032",
        unit: "members",
        type: "Announcements",
        color: "text-[#0088CC]"
      },
      {
        name: "Medium",
        href: "https://medium.com/astar-network",
        icon: Medium,
        stats: "85,032",
        unit: "followers",
        type: "Announcements",
        color: "text-gray-200"
      },
      {
        name: "GitHub",
        href: "https://github.com/AstarNetwork",
        icon: Github,
        stats: "85,032",
        unit: "stars",
        type: "Engineering",
        color: "text-[#FAFAFA]"
      },
      {
        name: "YouTube",
        href: "https://www.youtube.com/c/AstarNetwork",
        icon: Youtube,
        stats: "85,032",
        unit: "subscribes",
        type: "Announcements",
        color: "text-[#e64747]"
      },
      {
        name: "Forum",
        href: "https://forum.astar.network/",
        icon: Comments,
        stats: "85,032",
        unit: "posts",
        type: "Announcements",
        color: "text-gray-200"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto px-4 sm:px-6 relative z-10" }, _attrs))} data-v-7f49a1a6><h2 class="title text-center mb-8 sm:mb-16" data-v-7f49a1a6><span data-v-7f49a1a6>Wayfinding</span></h2><ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8" data-v-7f49a1a6><!--[-->`);
      ssrRenderList(social, (item) => {
        _push(`<li data-v-7f49a1a6><a${ssrRenderAttr("href", item.href)} target="_blank" rel="noopener" class="bg-space-gray block rounded-3xl text-center py-6 sm:py-8 px-2 sm:px-4 hover:bg-space-gray-lighter transition" data-v-7f49a1a6>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), {
          class: ["h-10 sm:h-12 w-10 sm:w-12 mx-auto my-4", item.color],
          "aria-hidden": "true"
        }, null), _parent);
        _push(`<span class="font-mono text-xs border border-gray-500 rounded-lg py-1 px-3" data-v-7f49a1a6>${ssrInterpolate(item.type)}</span><h3 class="font-medium text-xl mt-2" data-v-7f49a1a6>${ssrInterpolate(item.name)}</h3><div class="stats leading-snug" data-v-7f49a1a6><span class="font-bold text-xl mr-1.5" data-v-7f49a1a6>${ssrInterpolate(item.stats)}</span><small class="block" data-v-7f49a1a6>${ssrInterpolate(item.unit)}</small></div></a></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/community/Wayfinding.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __nuxt_component_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-7f49a1a6"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    color: {
      type: String,
      default: "primary"
    },
    variant: {
      type: String,
      default: "contained"
    },
    size: {
      type: String,
      default: "md"
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => ({
      btn: true,
      primary: props.color === "primary",
      secondary: props.color === "secondary",
      [`${props.size || "md"}`]: true,
      contained: props.variant === "contained",
      outlined: props.variant === "outlined"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({ class: unref(classes) }, _attrs))}><span>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`Button`);
      }, _push, _parent);
      _push(`</span></a>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Button.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __vite_glob_0_11 = "" + globalThis.__buildAssetsURL("space_lab.c3ba4ed8.svg");
const _sfc_main$j = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  const _component_Button = _sfc_main$k;
  const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 sm:px-6 relative z-10 text-center" }, _attrs))}><div class="gradient-outlined-box lg:inline-flex items-center justify-center"><div class="py-8 sm:py-12 px-6 sm:px-12 lg:pr-0 lg:pl-20 pr-8 lg:max-w-[500px] text-left"><h2 class="font-bold text-2xl sm:text-3xl lg:text-4xl"><span>Astar Space Lab</span></h2><p> Support the Astar core team through community and marketing initiatives while accumulating rewards. </p>`);
  _push(ssrRenderComponent(_component_Button, {
    href: "https://astarnetwork.notion.site/Astar-SpaceLabs-bee19d9d13ab41ba8d113347ae56448f",
    class: "mt-8",
    target: "_blank",
    rel: "noopener"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
        _push2(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" }, null, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" Learn more "),
          createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="shrink-0"><img${ssrRenderAttr("src", __vite_glob_0_11)} alt="" class="rounded-b-3xl lg:rounded-r-3xl"></div></div></div>`);
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/community/SpaceLab.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Videos",
  __ssrInlineRender: true,
  setup(__props) {
    const videos = [
      {
        title: "getting_started: The Astar Portal - What is it?",
        id: "jyS6MYv9uYg"
      },
      {
        title: "A moment with Astar's CEO",
        id: "w2skYR6l9vQ"
      },
      {
        title: "Astar Network Promotion Video Made by Kevin, Astar Ambassador",
        id: "8RA90uyO-ZY"
      },
      {
        title: "Astar 2022 Vision & Strategy",
        id: "W0KbT0ntBnE"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      const _component_Button = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10" }, _attrs))} data-v-fcb202e4><h2 class="title text-center mb-12 sm:mb-16" data-v-fcb202e4><span data-v-fcb202e4>Featured Videos</span></h2><div class="mb-12 sm:mb-16" data-v-fcb202e4><a class="group sm:flex items-center"${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${videos[0].id}`)} target="_blank" rel="noopener" data-v-fcb202e4><div class="sm:mr-5" data-v-fcb202e4><img${ssrRenderAttr("src", `http://img.youtube.com/vi/${videos[0].id}/maxresdefault.jpg`)}${ssrRenderAttr("alt", videos[0].title)} class="w-100 rounded-3xl group-hover:brightness-125" data-v-fcb202e4></div><div data-v-fcb202e4><h3 class="font-medium mt-4 mb-2 text-lg sm:text-2xl" data-v-fcb202e4>${ssrInterpolate(videos[0].title)}</h3><span class="text-space-cyan group-hover:text-space-cyan-lighter group-hover:underline flex items-center" data-v-fcb202e4> Watch video `);
      _push(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" }, null, _parent));
      _push(`</span></div></a></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12" data-v-fcb202e4><!--[-->`);
      ssrRenderList(videos, (video, index) => {
        _push(`<!--[-->`);
        if (index !== 0) {
          _push(`<div data-v-fcb202e4><a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${video.id}`)} class="${ssrRenderClass([index === 0 ? "flex items-center" : "", "group block"])}" target="_blank" rel="noopener" data-v-fcb202e4><div class="${ssrRenderClass(index === 0 ? "mr-5" : "")}" data-v-fcb202e4><img${ssrRenderAttr("src", `http://img.youtube.com/vi/${video.id}/maxresdefault.jpg`)}${ssrRenderAttr("alt", video.title)} class="w-100 rounded-3xl group-hover:brightness-125" data-v-fcb202e4></div><div data-v-fcb202e4><h3 class="${ssrRenderClass([index === 0 ? "text-2xl" : "text-lg", "font-medium mt-4 mb-2"])}" data-v-fcb202e4>${ssrInterpolate(video.title)}</h3><span class="text-space-cyan group-hover:text-space-cyan-lighter group-hover:underline flex items-center" data-v-fcb202e4> Watch video `);
          _push(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" }, null, _parent));
          _push(`</span></div></a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><div class="text-center mt-12 sm:mt-20" data-v-fcb202e4>`);
      _push(ssrRenderComponent(_component_Button, {
        size: "lg",
        href: "https://www.youtube.com/c/AstarNetwork",
        target: "_blank",
        rel: "noopener"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Youtube `);
            _push2(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Youtube "),
              createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/community/Videos.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-fcb202e4"]]);
const _imports_0$5 = "" + globalThis.__buildAssetsURL("cloud.252babcc.svg");
const _imports_0$4 = "" + globalThis.__buildAssetsURL("logo.d1ea41ba.svg");
const _imports_1$1 = "" + globalThis.__buildAssetsURL("space-cloud.46a86b4a.png");
const _imports_2$3 = "" + globalThis.__buildAssetsURL("space-stars.28f2f15f.svg");
const _imports_2$2 = "" + globalThis.__buildAssetsURL("hero.a0991ba5.svg");
const __vite_glob_0_5 = "" + globalThis.__buildAssetsURL("2528cc181ee2.328b0af0.png");
const __vite_glob_0_6 = "" + globalThis.__buildAssetsURL("4e905e93cd7e.f736e70f.png");
const __vite_glob_0_7 = "" + globalThis.__buildAssetsURL("50c0ed9f07a6.9c8beff9.png");
const __vite_glob_0_8 = "" + globalThis.__buildAssetsURL("5b49919187fc.45b443b8.png");
const __vite_glob_0_9 = "" + globalThis.__buildAssetsURL("90d7cd82d14b.28faa4ba.png");
const __vite_glob_0_10 = "" + globalThis.__buildAssetsURL("d402085bef2b.0f3e9bb9.png");
const __vite_glob_0_12 = "" + globalThis.__buildAssetsURL("advantages-ethereum.6dc8c9fb.svg");
const __vite_glob_0_13 = "" + globalThis.__buildAssetsURL("advantages-income.9f4a872c.svg");
const __vite_glob_0_14 = "" + globalThis.__buildAssetsURL("advantages-scalable.f93867ce.svg");
const __vite_glob_0_15 = "" + globalThis.__buildAssetsURL("advantages-secure.8831c2a5.svg");
const __vite_glob_0_16 = "" + globalThis.__buildAssetsURL("advantages-wasm.2cfa19ac.svg");
const __vite_glob_0_17 = "" + globalThis.__buildAssetsURL("advantages-xcm.394358c9.svg");
const __vite_glob_0_18 = "" + globalThis.__buildAssetsURL("building-collator.1e4e7be2.svg");
const __vite_glob_0_19 = "" + globalThis.__buildAssetsURL("building-ethereum.90261988.svg");
const __vite_glob_0_20 = "" + globalThis.__buildAssetsURL("building-exchange.45ef4ec1.svg");
const __vite_glob_0_21 = "" + globalThis.__buildAssetsURL("building-template.44ef1e6b.svg");
const __vite_glob_0_22 = "" + globalThis.__buildAssetsURL("building-wasm.e9676a5c.svg");
const _imports_2$1 = "" + globalThis.__buildAssetsURL("hero.b8e1d229.svg");
const __vite_glob_0_24 = "" + globalThis.__buildAssetsURL("alchemy.007bbe24.svg");
const __vite_glob_0_25 = "" + globalThis.__buildAssetsURL("blockdaemon.3482c8ce.svg");
const __vite_glob_0_26 = "" + globalThis.__buildAssetsURL("bwarelabs.e30159e7.svg");
const __vite_glob_0_27 = "" + globalThis.__buildAssetsURL("metamask.f1ffd999.svg");
const __vite_glob_0_28 = "" + globalThis.__buildAssetsURL("onfinality.ee9153a5.svg");
const __vite_glob_0_29 = "" + globalThis.__buildAssetsURL("polkadot.9e22bfc6.svg");
const __vite_glob_0_30 = "" + globalThis.__buildAssetsURL("swanky.82a02db4.png");
const __vite_glob_0_31 = "" + globalThis.__buildAssetsURL("talisman.f4d0daf1.svg");
const _imports_0$3 = "" + globalThis.__buildAssetsURL("multichain-bg.42b9a52f.svg");
const __vite_glob_0_33 = "" + globalThis.__buildAssetsURL("multichain-dao.ec8127de.svg");
const __vite_glob_0_34 = "" + globalThis.__buildAssetsURL("multichain-defi.55b0b461.svg");
const __vite_glob_0_35 = "" + globalThis.__buildAssetsURL("multichain-nft.46c2c213.svg");
const __vite_glob_0_36 = "" + globalThis.__buildAssetsURL("multichain-providers.b24ecdca.svg");
const _imports_0$2 = "" + globalThis.__buildAssetsURL("toolkit-bg.d6e3e574.svg");
const __vite_glob_0_38 = "" + globalThis.__buildAssetsURL("become-collator.4ba88df8.svg");
const __vite_glob_0_39 = "" + globalThis.__buildAssetsURL("become-developer.6d0d0a86.svg");
const __vite_glob_0_40 = "" + globalThis.__buildAssetsURL("become-staker.b71d1f17.svg");
const __vite_glob_0_41 = "" + globalThis.__buildAssetsURL("become-users.c55012b7.svg");
const __vite_glob_0_42 = "" + globalThis.__buildAssetsURL("features-basic-income.20658af9.svg");
const __vite_glob_0_43 = "" + globalThis.__buildAssetsURL("features-multichain.1601f84e.svg");
const __vite_glob_0_44 = "" + globalThis.__buildAssetsURL("features-web2-web3.3543e3e4.svg");
const _imports_5 = "" + globalThis.__buildAssetsURL("footer-landscape.e7d3ddee.svg");
const __vite_glob_0_46 = "" + globalThis.__buildAssetsURL("footer-reflect.72bd4e26.svg");
const _imports_4 = "" + globalThis.__buildAssetsURL("footer-sky.c676c8b2.svg");
const _imports_0$1 = "" + globalThis.__buildAssetsURL("gateway.053bdc10.svg");
const __vite_glob_0_49 = "" + globalThis.__buildAssetsURL("alchemy-ventures.35e7edc7.svg");
const __vite_glob_0_50 = "" + globalThis.__buildAssetsURL("almaeda-research.ba8f1bec.png");
const __vite_glob_0_51 = "" + globalThis.__buildAssetsURL("altonomy.4208d3af.svg");
const __vite_glob_0_52 = "" + globalThis.__buildAssetsURL("au21capital.4f471521.png");
const __vite_glob_0_53 = "" + globalThis.__buildAssetsURL("binance-labs.e5c3f0fe.png");
const __vite_glob_0_54 = "data:image/png;base64,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";
const __vite_glob_0_55 = "" + globalThis.__buildAssetsURL("cryptocom-capital.16ec4b00.png");
const __vite_glob_0_56 = "" + globalThis.__buildAssetsURL("dfg.fad57cfa.png");
const __vite_glob_0_57 = "" + globalThis.__buildAssetsURL("digital-strategies.76118108.png");
const __vite_glob_0_58 = "" + globalThis.__buildAssetsURL("fenbushi-capital.8c865981.png");
const __vite_glob_0_59 = "" + globalThis.__buildAssetsURL("gsr.3d3dca56.svg");
const __vite_glob_0_60 = "" + globalThis.__buildAssetsURL("gumi-cryptos.4e395a45.png");
const __vite_glob_0_61 = "" + globalThis.__buildAssetsURL("hashkey-capital.566e8fe1.svg");
const __vite_glob_0_62 = "" + globalThis.__buildAssetsURL("huobi-ventures.456b78c6.png");
const __vite_glob_0_63 = "" + globalThis.__buildAssetsURL("hypersphere.5197c96a.png");
const __vite_glob_0_64 = "" + globalThis.__buildAssetsURL("iosg-ventres.5ec054fa.png");
const __vite_glob_0_65 = "" + globalThis.__buildAssetsURL("kr1.053c181a.png");
const __vite_glob_0_66 = "" + globalThis.__buildAssetsURL("longhash-ventures.604a8d70.png");
const __vite_glob_0_67 = "" + globalThis.__buildAssetsURL("okex-blockdream-ventures.ce529d79.png");
const __vite_glob_0_68 = "" + globalThis.__buildAssetsURL("paka.af7a4f5b.png");
const __vite_glob_0_69 = "" + globalThis.__buildAssetsURL("polychain-capital.09e6ddde.png");
const __vite_glob_0_70 = "" + globalThis.__buildAssetsURL("rok-capital.926db19c.png");
const __vite_glob_0_71 = "" + globalThis.__buildAssetsURL("scytale-ventures.78947485.png");
const __vite_glob_0_72 = "" + globalThis.__buildAssetsURL("snz.352211cf.png");
const __vite_glob_0_73 = "" + globalThis.__buildAssetsURL("sub0capital.d79c127a.png");
const __vite_glob_0_74 = "" + globalThis.__buildAssetsURL("trg-capital.8ca5854f.png");
const __vite_glob_0_75 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWMAAAA1CAYAAACUYoq/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuNSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDktMjZUMjA6MTk6MTEtMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTA5LTI2VDIyOjM1OjU2LTA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA5LTI2VDIyOjM1OjU2LTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplYjMyMzliOC1lNmI3LTRjYTUtYTM3Ni0xZjQ0NWRlNWVmMmIiIHhtcE1NOkRvY3VtZW50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";
const __vite_glob_0_76 = "" + globalThis.__buildAssetsURL("warburg-serres.5bba9656.png");
const __vite_glob_0_77 = "" + globalThis.__buildAssetsURL("reading-astar.81805980.svg");
const __vite_glob_0_78 = "" + globalThis.__buildAssetsURL("reading-ecosystem.adcf99c9.svg");
const __vite_glob_0_79 = "" + globalThis.__buildAssetsURL("reading-token.c08327fc.svg");
const _imports_0 = "" + globalThis.__buildAssetsURL("welcome-astronaut.7a7e480a.svg");
const _imports_2 = "" + globalThis.__buildAssetsURL("welcome-community-members.de48ad91.svg");
const _imports_1 = "" + globalThis.__buildAssetsURL("welcome-dapps.d08f4d68.svg");
const useAsset = (path) => {
  const assets = /* @__PURE__ */ Object.assign({ "/assets/images/common/cloud.svg": _imports_0$5, "/assets/images/common/logo.svg": _imports_0$4, "/assets/images/common/space-cloud.png": _imports_1$1, "/assets/images/common/space-stars.svg": _imports_2$3, "/assets/images/community/hero.svg": _imports_2$2, "/assets/images/community/medium/2528cc181ee2.png": __vite_glob_0_5, "/assets/images/community/medium/4e905e93cd7e.png": __vite_glob_0_6, "/assets/images/community/medium/50c0ed9f07a6.png": __vite_glob_0_7, "/assets/images/community/medium/5b49919187fc.png": __vite_glob_0_8, "/assets/images/community/medium/90d7cd82d14b.png": __vite_glob_0_9, "/assets/images/community/medium/d402085bef2b.png": __vite_glob_0_10, "/assets/images/community/space=lab.svg": __vite_glob_0_11, "/assets/images/developers/advantages-ethereum.svg": __vite_glob_0_12, "/assets/images/developers/advantages-income.svg": __vite_glob_0_13, "/assets/images/developers/advantages-scalable.svg": __vite_glob_0_14, "/assets/images/developers/advantages-secure.svg": __vite_glob_0_15, "/assets/images/developers/advantages-wasm.svg": __vite_glob_0_16, "/assets/images/developers/advantages-xcm.svg": __vite_glob_0_17, "/assets/images/developers/building-collator.svg": __vite_glob_0_18, "/assets/images/developers/building-ethereum.svg": __vite_glob_0_19, "/assets/images/developers/building-exchange.svg": __vite_glob_0_20, "/assets/images/developers/building-template.svg": __vite_glob_0_21, "/assets/images/developers/building-wasm.svg": __vite_glob_0_22, "/assets/images/developers/hero.svg": _imports_2$1, "/assets/images/developers/logos/alchemy.svg": __vite_glob_0_24, "/assets/images/developers/logos/blockdaemon.svg": __vite_glob_0_25, "/assets/images/developers/logos/bwarelabs.svg": __vite_glob_0_26, "/assets/images/developers/logos/metamask.svg": __vite_glob_0_27, "/assets/images/developers/logos/onfinality.svg": __vite_glob_0_28, "/assets/images/developers/logos/polkadot.svg": __vite_glob_0_29, "/assets/images/developers/logos/swanky.png": __vite_glob_0_30, "/assets/images/developers/logos/talisman.svg": __vite_glob_0_31, "/assets/images/developers/multichain-bg.svg": _imports_0$3, "/assets/images/developers/multichain-dao.svg": __vite_glob_0_33, "/assets/images/developers/multichain-defi.svg": __vite_glob_0_34, "/assets/images/developers/multichain-nft.svg": __vite_glob_0_35, "/assets/images/developers/multichain-providers.svg": __vite_glob_0_36, "/assets/images/developers/toolkit-bg.svg": _imports_0$2, "/assets/images/home/become-collator.svg": __vite_glob_0_38, "/assets/images/home/become-developer.svg": __vite_glob_0_39, "/assets/images/home/become-staker.svg": __vite_glob_0_40, "/assets/images/home/become-users.svg": __vite_glob_0_41, "/assets/images/home/features-basic-income.svg": __vite_glob_0_42, "/assets/images/home/features-multichain.svg": __vite_glob_0_43, "/assets/images/home/features-web2-web3.svg": __vite_glob_0_44, "/assets/images/home/footer-landscape.svg": _imports_5, "/assets/images/home/footer-reflect.svg": __vite_glob_0_46, "/assets/images/home/footer-sky.svg": _imports_4, "/assets/images/home/gateway.svg": _imports_0$1, "/assets/images/home/logos/alchemy-ventures.svg": __vite_glob_0_49, "/assets/images/home/logos/almaeda-research.png": __vite_glob_0_50, "/assets/images/home/logos/altonomy.svg": __vite_glob_0_51, "/assets/images/home/logos/au21capital.png": __vite_glob_0_52, "/assets/images/home/logos/binance-labs.png": __vite_glob_0_53, "/assets/images/home/logos/coinbase-ventures.png": __vite_glob_0_54, "/assets/images/home/logos/cryptocom-capital.png": __vite_glob_0_55, "/assets/images/home/logos/dfg.png": __vite_glob_0_56, "/assets/images/home/logos/digital-strategies.png": __vite_glob_0_57, "/assets/images/home/logos/fenbushi-capital.png": __vite_glob_0_58, "/assets/images/home/logos/gsr.svg": __vite_glob_0_59, "/assets/images/home/logos/gumi-cryptos.png": __vite_glob_0_60, "/assets/images/home/logos/hashkey-capital.svg": __vite_glob_0_61, "/assets/images/home/logos/huobi-ventures.png": __vite_glob_0_62, "/assets/images/home/logos/hypersphere.png": __vite_glob_0_63, "/assets/images/home/logos/iosg-ventres.png": __vite_glob_0_64, "/assets/images/home/logos/kr1.png": __vite_glob_0_65, "/assets/images/home/logos/longhash-ventures.png": __vite_glob_0_66, "/assets/images/home/logos/okex-blockdream-ventures.png": __vite_glob_0_67, "/assets/images/home/logos/paka.png": __vite_glob_0_68, "/assets/images/home/logos/polychain-capital.png": __vite_glob_0_69, "/assets/images/home/logos/rok-capital.png": __vite_glob_0_70, "/assets/images/home/logos/scytale-ventures.png": __vite_glob_0_71, "/assets/images/home/logos/snz.png": __vite_glob_0_72, "/assets/images/home/logos/sub0capital.png": __vite_glob_0_73, "/assets/images/home/logos/trg-capital.png": __vite_glob_0_74, "/assets/images/home/logos/vessel.png": __vite_glob_0_75, "/assets/images/home/logos/warburg-serres.png": __vite_glob_0_76, "/assets/images/home/reading-astar.svg": __vite_glob_0_77, "/assets/images/home/reading-ecosystem.svg": __vite_glob_0_78, "/assets/images/home/reading-token.svg": __vite_glob_0_79, "/assets/images/home/welcome-astronaut.svg": _imports_0, "/assets/images/home/welcome-community-members.svg": _imports_2, "/assets/images/home/welcome-dapps.svg": _imports_1 });
  return assets["/assets/images/" + path];
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "News",
  __ssrInlineRender: true,
  setup(__props) {
    const news = [
      {
        publishedDate: "Jan 15 2022",
        title: "Astar roadmap 2022 \u2014 Astar & Shiden Network",
        description: "As promised during our latest community AMA, we want to give you an overview of the roadmap for the Astar ecosystem. Most of you already know that the Astar ecosystem contains two main networks: Shiden connected as a parachain on Kusama and Astar connected as a parachain on Polkadot.",
        href: "https://medium.com/astar-network/astar-roadmap-2022-5b49919187fc",
        id: "5b49919187fc"
      },
      {
        publishedDate: "Sep 13 2022",
        title: "Binance.US lists the Astar Native Asset (ASTR)",
        description: "We\u2019re thrilled to share that the Astar token (ASTR) will be the first asset from Polkadot (not including DOT) to list on Binance.US, a leader in providing secure and reliable access to crypto assets in the United States. Americans now have the freedom to purchase, trade, or hold the most popular blockchain asset in Japan (according to a survey by Japan Blockchain Association).",
        href: "https://medium.com/astar-network/binance-us-lists-the-astar-native-asset-astr-2528cc181ee2",
        id: "2528cc181ee2"
      },
      {
        publishedDate: "Sep 12 2022",
        title: "Building a Multichain Network with XVM",
        description: "We are constructing a multichain network that not only allows developers to build smart contracts in either Solidity or ink!, but encourages developers to build across and between EVM and WASM. The first step was to bootstrap Astar Network by creating an ecosystem of dApps built with already successful smart contracts found on other chains, yet we do not believe this is the entire solution for the long-term success of Astar or Polkadot.",
        href: "https://medium.com/astar-network/building-a-multichain-network-with-xvm-4e905e93cd7e",
        id: "4e905e93cd7e"
      },
      {
        publishedDate: "Sep 8 2022",
        title: "New HRMP Channels Have Opened Between Moonbeam and Astar Network",
        description: "Throughout the history of blockchains, interoperability and multi-chain applications are considered the holy grails of Web 3.0. With the Polkadot ecosystem of parachains and cross-consensus messaging (XCM), not only do we have multi-chain assets, but we can also leverage functional interoperability. At Astar Network, we believe that this is the key to creating the next generation of innovative dApps and further progressing Web3.0.",
        href: "https://medium.com/astar-network/new-hrmp-channels-have-opened-between-moonbeam-and-astar-network-90d7cd82d14b",
        id: "90d7cd82d14b"
      },
      {
        publishedDate: "Jul 20 2022",
        title: "Swanky: The All-in-One WASM Tool",
        description: "Developers need tools that help write, compile, deploy, and test smart contracts. Currently, the Astar allows developers to use traditional EVM tooling, such as: Hardhat or Truffle. The cypherpunk community created a large library of tutorials, documentation, and templates that are available to Solidity developers.",
        href: "https://medium.com/astar-network/swanky-the-all-in-one-wasm-tool-50c0ed9f07a6",
        id: "50c0ed9f07a6"
      },
      {
        publishedDate: "Apr 13 2022",
        title: "#Build2Earn: Benefits of dApp Staking and How to dApp Stake on Astar",
        description: "Today, we are excited to announce the launch of dApp staking on Astar! As mentioned in the previous article, for great dApps to be built, developers need to build them. For developers to build great dApps, they need financial incentives. That\u2019s where dApp staking comes in.",
        href: "https://medium.com/astar-network/build2earn-benefits-of-dapp-staking-and-how-to-dapp-stake-on-astar-d402085bef2b",
        id: "d402085bef2b"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      const _component_Button = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10" }, _attrs))} data-v-70ea4a6a><h2 class="title text-center mb-12 sm:mb-16" data-v-70ea4a6a><span data-v-70ea4a6a>News</span></h2><ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 sm:gap-y-20" data-v-70ea4a6a><!--[-->`);
      ssrRenderList(news, (item) => {
        _push(`<li data-v-70ea4a6a><a${ssrRenderAttr("href", item.href)} target="_blank" rel="noopener" class="block group" data-v-70ea4a6a><div class="mb-4" data-v-70ea4a6a><img${ssrRenderAttr("src", unref(useAsset)("community/medium/" + item.id + ".png"))}${ssrRenderAttr("alt", item.title)} class="h-52 w-full object-cover rounded-3xl group-hover:brightness-125" data-v-70ea4a6a></div><span class="text-gray-400 text-sm" data-v-70ea4a6a>${ssrInterpolate(item.publishedDate)}</span><h3 class="text-lg font-medium mb-2" data-v-70ea4a6a>${ssrInterpolate(item.title)}</h3><p class="text-gray-400 mb-2 text-sm" data-v-70ea4a6a>${ssrInterpolate(item.description)}</p><span class="text-space-cyan group-hover:text-space-cyan-lighter group-hover:underline flex items-center" data-v-70ea4a6a> Read article `);
        _push(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" }, null, _parent));
        _push(`</span></a></li>`);
      });
      _push(`<!--]--></ul><div class="text-center mt-12 sm:mt-20" data-v-70ea4a6a>`);
      _push(ssrRenderComponent(_component_Button, {
        size: "lg",
        href: "https://medium.com/astar-network",
        target: "_blank",
        rel: "noopener"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Medium `);
            _push2(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Medium "),
              createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/community/News.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __nuxt_component_5$1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-70ea4a6a"]]);
const meta$2 = {
  pageTitle: "Community",
  slug: "community",
  description: "A star is born together with our awesome community."
};
const _sfc_main$g = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    class: "w-6 h-6"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Documentation.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    const Github = __nuxt_component_4$1;
    const Discord = __nuxt_component_1$1;
    const Docs = __nuxt_component_2$1;
    const hero = [
      { name: "GitHub", href: "#", icon: Github },
      { name: "Docs", href: "#", icon: Docs },
      { name: "Discord", href: "#", icon: Discord }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$k;
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[60vh] sm:min-h-[80vh] flex items-center justify-start" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full"><div class="lg:w-1/2"><h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow"> Developers </h1><p class="text-lg sm:text-xl lg:text-2xl"> Build Ethereum and native dApps on Astar and be the part of multichain innovation. </p><ul class="flex justify-center sm:justify-start mt-12 space-x-2"><!--[-->`);
      ssrRenderList(hero, (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_Button, {
          color: "secondary",
          variant: "contained",
          href: item.href,
          target: "_blank",
          rel: "noopener"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), {
                class: "h-8 w-8 sm:mr-2 my-2",
                "aria-hidden": "true"
              }, null), _parent2, _scopeId);
              _push2(`<div class="hidden sm:inline-block"${_scopeId}>${ssrInterpolate(item.name)}</div>`);
              _push2(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1 hidden sm:inline-block" }, null, _parent2, _scopeId));
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                  class: "h-8 w-8 sm:mr-2 my-2",
                  "aria-hidden": "true"
                })),
                createVNode("div", { class: "hidden sm:inline-block" }, toDisplayString(item.name), 1),
                createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 ml-1 hidden sm:inline-block" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/developers/Hero.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Start",
  __ssrInlineRender: true,
  setup(__props) {
    const building = [
      {
        title: "Launch your Ethereum dApps",
        image: "building-ethereum.svg",
        href: "#",
        color: "bg-space-pink hover:bg-space-pink-lighter"
      },
      {
        title: "Launch your Wasm dApps",
        image: "building-wasm.svg",
        href: "#",
        color: "bg-space-purple hover:bg-space-purple-lighter"
      },
      {
        title: "Run a collator",
        image: "building-collator.svg",
        href: "#",
        color: "bg-space-blue hover:bg-space-blue-lighter"
      },
      {
        title: "Integrate an Exchange",
        image: "building-exchange.svg",
        href: "#",
        color: "bg-space-sky hover:bg-space-sky-lighter"
      },
      {
        title: "DApps Template",
        image: "building-template.svg",
        href: "#",
        color: "bg-space-cyan hover:bg-space-cyan-lighter"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10" }, _attrs))}><h2 class="title text-center mb-16 sm:mb-24"><span>Start Building on Astar</span></h2><ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 sm:gap-y-20"><!--[-->`);
      ssrRenderList(building, (item, index) => {
        _push(`<li class="${ssrRenderClass([item.color, "mb-16 sm:mb-0 rounded-3xl"])}"><a href="" class="${ssrRenderClass([index === 4 ? "text-space-gray-dark" : "text-white", "block hover:brightness-125 transition"])}"><div class="-mt-12 mb-2"><img class="mx-auto w-32 sm:w-auto"${ssrRenderAttr("src", unref(useAsset)("developers/" + item.image))} alt=""></div><div class="px-4 sm:px-6 lg:px-7 pb-8 sm:pb-12"><h3 class="text-lg sm:text-xl font-bold leading-tight">${ssrInterpolate(item.title)} <span class="whitespace-nowrap">-&gt;</span></h3></div></a></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/developers/Start.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Advantages",
  __ssrInlineRender: true,
  setup(__props) {
    const advantages = [
      {
        name: "Solidity-compatible",
        description: "Easily launch Ethereum dApps",
        image: "advantages-ethereum.svg"
      },
      {
        name: "Next Gen Wasm dApps",
        description: "Easily launch Polkadot native dApps",
        image: "advantages-wasm.svg"
      },
      {
        name: "Highly-Scalable",
        description: "Processes thousands of transactions.",
        image: "advantages-scalable.svg"
      },
      {
        name: "Secure",
        description: "Astar Network is secured by Polkadot Relaychain",
        image: "advantages-secure.svg"
      },
      {
        name: "Private & public XCM",
        description: "Interact with other blockchains with trustless bridges.",
        image: "advantages-xcm.svg"
      },
      {
        name: "Basic Income",
        description: "Earn token while making your projects.",
        image: "advantages-income.svg"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto px-4 sm:px-6 relative z-10" }, _attrs))}><h2 class="title text-center mb-6 sm:mb-16"><span>Advantages of Astar</span></h2><ul class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-16"><!--[-->`);
      ssrRenderList(advantages, (item) => {
        _push(`<li><img${ssrRenderAttr("src", unref(useAsset)("developers/" + item.image))} alt=""><h3 class="font-bold text-lg sm:text-xl mt-4 mb-2 leading-tight">${ssrInterpolate(item.name)}</h3><p>${ssrInterpolate(item.description)}</p></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/developers/Advantages.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Multichain",
  __ssrInlineRender: true,
  setup(__props) {
    const future = [
      {
        name: "DeFi",
        description: "Set to operate a next-gen decentralized exchange, swapping digital assets from across the Interchain, with very low fees and instant transaction confirmation.",
        image: "multichain-defi.svg"
      },
      {
        name: "NFT",
        description: "With the upcoming Interchain Security feature, ATOM will soon be securing many chains, in exchange for additional staking rewards.",
        image: "multichain-nft.svg"
      },
      {
        name: "Leading Infra Providers",
        description: "A core mission of the Hub \u2013 to connect chains by establishing IBC connections with compatible chains and operating decentralized bridges with chains like Ethereum and Bitcoin.",
        image: "multichain-providers.svg"
      },
      {
        name: "DAO",
        description: "Located at the crossroads of the Interchain, the Hub is extremely secure, the best place to hold digital assets and manage accounts across many chains.",
        image: "multichain-dao.svg"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-10" }, _attrs))}><img class="absolute z-[4] h-80 lg:h-auto"${ssrRenderAttr("src", _imports_0$3)} alt=""><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:flex items-center relative z-10 pt-80"><div class="mb-12 lg:mb-0"><h2 class="title mb-4 text-center lg:text-left"><span>Multichain Future</span></h2><p class="text-center lg:text-left"> We believe that interoperability is the key. Astar is the blockchain that leads the future of web3. </p></div><ul class="grid gap-12 lg:ml-28"><!--[-->`);
      ssrRenderList(future, (item) => {
        _push(`<li class="flex"><div class="mr-8 shrink-0"><img${ssrRenderAttr("src", unref(useAsset)("developers/" + item.image))}${ssrRenderAttr("alt", item.name)}></div><div><h3 class="font-bold text-xl mb-1">${ssrInterpolate(item.name)}</h3><p>${ssrInterpolate(item.description)}</p></div></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/developers/Multichain.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Toolkit",
  __ssrInlineRender: true,
  setup(__props) {
    const logos = [
      { name: "Swanky", image: "swanky.png" },
      { name: "Alchemy", image: "alchemy.svg" },
      { name: "BwareLabs", image: "bwarelabs.svg" },
      { name: "Blockdeamon", image: "blockdaemon.svg" },
      { name: "OnFinality", image: "onfinality.svg" },
      { name: "Talisman", image: "talisman.svg" },
      { name: "Metamask", image: "metamask.svg" },
      { name: "Polkadot.js", image: "polkadot.svg" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><img class="absolute right-4 z-[4] h-48 lg:h-auto"${ssrRenderAttr("src", _imports_0$2)} alt=""><div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-40"><h2 class="title text-center mb-8 sm:mb-12"><span>Reach into <br>Astar Developer Toolkit</span></h2><p class="text-center mb-12 sm:mb-28"> All your favorite tools and integrations work natively with Astar.<br><a href="https://portal.astar.network/#/astar/dapp-staking/discover" target="_blank" rel="noopener" class="text-space-cyan transition hover:text-space-cyan-light hover:underline"> Explore all Projects Building on Astar -&gt; </a></p><div class="px-4 sm:px-6"><div class="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-20 sm:grid-cols-4 lg:grid-cols-5"><!--[-->`);
      ssrRenderList(logos, (item) => {
        _push(`<div class="flex items-center justify-center"><img class="h-12 w-32 lg:w-48 object-contain"${ssrRenderAttr("src", unref(useAsset)("developers/logos/" + item.image))}${ssrRenderAttr("alt", item.name)}></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/developers/Toolkit.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Testimonials",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6" }, _attrs))}><h2 class="title text-center mb-12"><span>Testimonials</span></h2>`);
      _push(ssrRenderComponent(unref(Carousel), { "items-to-show": 1.2 }, {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Pagination), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Navigation)),
              createVNode(unref(Pagination))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(5, (slide) => {
              _push2(ssrRenderComponent(unref(Slide), {
                key: slide,
                class: "px-2 sm:px-8"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="bg-gradient w-full rounded-3xl text-white px-4 py-6 sm:px-12 sm:py-12"${_scopeId2}><div class="relative"${_scopeId2}><img class="mx-auto h-10 sm:h-14" src="https://tailwindui.com/img/logos/workcation-logo-white.svg" alt="Workcation"${_scopeId2}><blockquote class="mt-6 sm:mt-10"${_scopeId2}><div class="mx-auto text-center sm:text-xl sm:leading-9"${_scopeId2}><p${_scopeId2}> \u201CLorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.\u201D </p></div><footer class="mt-8"${_scopeId2}><div class="md:flex md:items-center md:justify-center"${_scopeId2}><div class="md:flex-shrink-0"${_scopeId2}><img class="mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt=""${_scopeId2}></div><div class="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center"${_scopeId2}><div class="text-base font-medium"${_scopeId2}>Judith Black</div><svg class="mx-1 hidden h-5 w-5 md:block" fill="currentColor" viewBox="0 0 20 20"${_scopeId2}><path d="M11 0h3L9 20H6l5-20z"${_scopeId2}></path></svg><div class="text-base"${_scopeId2}>CEO, Workcation</div></div></div></footer></blockquote></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "bg-gradient w-full rounded-3xl text-white px-4 py-6 sm:px-12 sm:py-12" }, [
                        createVNode("div", { class: "relative" }, [
                          createVNode("img", {
                            class: "mx-auto h-10 sm:h-14",
                            src: "https://tailwindui.com/img/logos/workcation-logo-white.svg",
                            alt: "Workcation"
                          }),
                          createVNode("blockquote", { class: "mt-6 sm:mt-10" }, [
                            createVNode("div", { class: "mx-auto text-center sm:text-xl sm:leading-9" }, [
                              createVNode("p", null, " \u201CLorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.\u201D ")
                            ]),
                            createVNode("footer", { class: "mt-8" }, [
                              createVNode("div", { class: "md:flex md:items-center md:justify-center" }, [
                                createVNode("div", { class: "md:flex-shrink-0" }, [
                                  createVNode("img", {
                                    class: "mx-auto h-10 w-10 rounded-full",
                                    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                    alt: ""
                                  })
                                ]),
                                createVNode("div", { class: "mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center" }, [
                                  createVNode("div", { class: "text-base font-medium" }, "Judith Black"),
                                  (openBlock(), createBlock("svg", {
                                    class: "mx-1 hidden h-5 w-5 md:block",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20"
                                  }, [
                                    createVNode("path", { d: "M11 0h3L9 20H6l5-20z" })
                                  ])),
                                  createVNode("div", { class: "text-base" }, "CEO, Workcation")
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment$1, null, renderList(5, (slide) => {
                return createVNode(unref(Slide), {
                  key: slide,
                  class: "px-2 sm:px-8"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "bg-gradient w-full rounded-3xl text-white px-4 py-6 sm:px-12 sm:py-12" }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode("img", {
                          class: "mx-auto h-10 sm:h-14",
                          src: "https://tailwindui.com/img/logos/workcation-logo-white.svg",
                          alt: "Workcation"
                        }),
                        createVNode("blockquote", { class: "mt-6 sm:mt-10" }, [
                          createVNode("div", { class: "mx-auto text-center sm:text-xl sm:leading-9" }, [
                            createVNode("p", null, " \u201CLorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.\u201D ")
                          ]),
                          createVNode("footer", { class: "mt-8" }, [
                            createVNode("div", { class: "md:flex md:items-center md:justify-center" }, [
                              createVNode("div", { class: "md:flex-shrink-0" }, [
                                createVNode("img", {
                                  class: "mx-auto h-10 w-10 rounded-full",
                                  src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                  alt: ""
                                })
                              ]),
                              createVNode("div", { class: "mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center" }, [
                                createVNode("div", { class: "text-base font-medium" }, "Judith Black"),
                                (openBlock(), createBlock("svg", {
                                  class: "mx-1 hidden h-5 w-5 md:block",
                                  fill: "currentColor",
                                  viewBox: "0 0 20 20"
                                }, [
                                  createVNode("path", { d: "M11 0h3L9 20H6l5-20z" })
                                ])),
                                createVNode("div", { class: "text-base" }, "CEO, Workcation")
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/developers/Testimonials.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const meta$1 = {
  pageTitle: "Developers",
  slug: "developers",
  description: "Build Ethereum and native dApps on Astar and be the part of multichain innovation."
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center h-screen flex items-center justify-center z-10 relative" }, _attrs))}><div class="max-w-7xl px-4 sm:px-6 pt-12"><h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] drop-shadow tracking-tight"> The Future of Smart Contracts for Multichain. </h1><p class="sm:text-xl mt-6 sm:mt-10 mb-8 sm:mb-14"> Astar is a scalable decentralised blockchain for next big Web3 innovations. </p><div class="sm:flex justify-center space-y-4 sm:space-y-0 sm:space-x-4">`);
      _push(ssrRenderComponent(_sfc_main$k, {
        color: "secondary",
        variant: "outlined",
        size: "lg",
        href: "https://docs.astar.network/",
        target: "_blank",
        rel: "noopener",
        class: "w-[280px] sm:w-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Documentation `);
            _push2(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-6 h-6 ml-1 stroke-2" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Documentation "),
              createVNode(_component_IconArrowTopRightOnSquare, { class: "w-6 h-6 ml-1 stroke-2" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$k, {
        variant: "outlined",
        size: "lg",
        href: "https://portal.astar.network/",
        target: "_blank",
        rel: "noopener",
        class: "w-[280px] sm:w-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Launch App `);
            _push2(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-6 h-6 ml-1 stroke-2" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Launch App "),
              createVNode(_component_IconArrowTopRightOnSquare, { class: "w-6 h-6 ml-1 stroke-2" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/Hero.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "sm:flex items-end relative z-10" }, _attrs))} data-v-ae61e120><div class="shrink-0 mb-8 sm:mb-0" data-v-ae61e120><img class="mx-auto max-w-[280px] sm:max-w-[350px] lg:max-w-full"${ssrRenderAttr("src", _imports_0)} alt="" data-v-ae61e120></div><div class="xl:flex px-4 sm:px-6 lg:mr-6" data-v-ae61e120><div class="sm:mr-4 xl:mx-8 mb-12" data-v-ae61e120><h2 class="text-3xl lg:text-4xl font-bold leading-tight mb-6" data-v-ae61e120> Welcome to the leading multichain smart contracts platform </h2><p class="text-xl" data-v-ae61e120> Astar is a blockchian built for developers and by developers. Our innovative developer basic income and multivirtual virtual machine allow developers to make a scalable application for DeFi, NFTs, Web3 and more. </p></div><dl class="shrink-0" data-v-ae61e120><div class="flex flex-col mb-12 xl:mb-16" data-v-ae61e120><dt class="order-2 mt-2 text-3xl lg:text-4xl font-bold" data-v-ae61e120><span data-v-ae61e120>DApps</span></dt><dd class="order-1" data-v-ae61e120><img class="max-w-[300px] lg:max-w-full"${ssrRenderAttr("src", _imports_1)} alt="" data-v-ae61e120></dd></div><div class="flex flex-col" data-v-ae61e120><dt class="order-2 mt-2 text-2xl lg:text-3xl font-bold" data-v-ae61e120><span data-v-ae61e120>Community Members</span></dt><dd class="order-1" data-v-ae61e120><img class="max-w-[300px] lg:max-w-full"${ssrRenderAttr("src", _imports_2)} alt="" data-v-ae61e120></dd></div></dl></div></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/Welcome.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-ae61e120"]]);
const _sfc_main$7 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10" }, _attrs))}><h2 class="text-center font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight title"><span>The Gateway <br>in the multichain era</span></h2><div><img${ssrRenderAttr("src", _imports_0$1)} alt=""></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/Gateway.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "BecomeAStar",
  __ssrInlineRender: true,
  setup(__props) {
    const developers = [
      {
        name: "Developer",
        image: "become-developer.svg",
        description: "Create a dApp or infrastructure to realise web3",
        href: "#",
        color: "text-space-pink hover:text-space-pink-lighter"
      },
      {
        name: "Collator",
        image: "become-collator.svg",
        description: "Run a node and support the network",
        href: "#",
        color: "text-space-sky hover:text-space-sky-lighter"
      },
      {
        name: "Staker",
        image: "become-staker.svg",
        description: "Organize data by signaling on subgraphs",
        href: "#",
        color: "text-space-cyan hover:text-space-cyan-lighter"
      },
      {
        name: "Users",
        image: "become-users.svg",
        description: "Use ASTR and be a part of web3 movement",
        href: "#",
        color: "text-space-teal hover:text-space-teal-lighter"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6" }, _attrs))}><h2 class="text-center mb-20"><small class="block text-lg sm:text-3xl font-medium"> Join the fast growing ecosystem </small><span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight title"><span>Become A STAR Today!</span></span></h2><ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-8"><!--[-->`);
      ssrRenderList(developers, (item) => {
        _push(`<li><div class="mb-4"><img class="mx-auto"${ssrRenderAttr("src", unref(useAsset)("home/" + item.image))} alt=""></div><h3 class="${ssrRenderClass([item.color, "text-2xl font-bold text-center sm:text-left"])}">${ssrInterpolate(item.name)}</h3><p class="my-2">${ssrInterpolate(item.description)}</p><a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([item.color, "hover:underline transition"])}">Learn more -&gt;</a></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/BecomeAStar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "RecommendedReading",
  __ssrInlineRender: true,
  setup(__props) {
    const reading = [
      {
        title: "Welcome to Astar",
        description: "Read the vision of Aster and lean about powerful blockchain technology that makes it possible.",
        href: "#",
        image: "reading-astar.svg"
      },
      {
        title: "Discover the ASTR token",
        description: "Read Astar's original features and innovative features that unlock web3.",
        href: "#",
        image: "reading-token.svg"
      },
      {
        title: "Explore the ecosystem",
        description: "Learn more about Astar ecosystem and where we are heading to realise web3.",
        href: "#",
        image: "reading-ecosystem.svg"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      const _component_Button = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6" }, _attrs))}><h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-center title"><span>Recommended Reading</span></h2><p class="sm:text-xl text-center mt-4"> Learn more about where and how a-star was born. </p><ul class="grid sm:grid-cols-3 gap-x-4 lg:gap-x-8 mt-12 sm:mt-28"><!--[-->`);
      ssrRenderList(reading, (item) => {
        _push(`<li class="rounded-3xl mb-16 sm:mb-0 bg-space-gray"><div class="-mx-5 -mt-12 -mb-4"><img${ssrRenderAttr("src", unref(useAsset)("home/" + item.image))}${ssrRenderAttr("alt", item.title)}></div><div class="px-6 lg:px-7 pb-12"><h3 class="text-xl lg:text-2xl font-bold leading-tight">${ssrInterpolate(item.title)}</h3><p class="my-3">${ssrInterpolate(item.description)}</p><a${ssrRenderAttr("href", item.href)} class="text-space-cyan hover:text-space-cyan-lighter hover:underline transition">Learn more -&gt;</a></div></li>`);
      });
      _push(`<!--]--></ul><div class="gradient-outlined-box max-w-5xl mx-auto mt-12 lg:mt-24 sm:flex justify-center items-center p-8 lg:p-12 rounded-3xl sm:space-x-4 lg:space-x-6"><div class="mb-4 sm:mb-0"><h3 class="font-bold text-2xl">Receive newsletter</h3><p> Unsubscribe at any time. <a href="https://docs.google.com/document/d/1jEbhRfh292TahRMRdeN4z-8MYNU27dCS_vVopV6xQgk/edit?usp=sharing" target="_blank" rel="noopener" class="text-space-cyan hover:text-space-cyan-lighter hover:underline transition whitespace-nowrap"> Privacy policy `);
      _push(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 stroke-2 inline-block" }, null, _parent));
      _push(`</a></p></div><form class="sm:flex"><label for="email-address" class="sr-only">Email address</label><input id="email-address" name="email" type="email" autocomplete="email" required class="mb-2 sm:mb-0 w-full rounded-xl border-gray-300 px-5 py-3 placeholder-gray-500 focus:border-space-sky focus:ring-space-sky sm:max-w-xs mr-2" placeholder="Enter your email">`);
      _push(ssrRenderComponent(_component_Button, { class: "w-full sm:w-auto" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Subscribe`);
          } else {
            return [
              createTextVNode("Subscribe")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/RecommendedReading.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Features",
  __ssrInlineRender: true,
  setup(__props) {
    const features = [
      {
        title: "Multichain Smart Contracts",
        description: "Astar runs in concert with Ethereum, Polkadot, Cosmos, and more, allowing for the free flow of assets and communication between networks for the betterment of all.",
        href: "#",
        image: "features-multichain.svg"
      },
      {
        title: "Basic Income For Developers",
        description: `We invented the "Build2Earn" concept where we distribute ASTR tokens based on the developers' contribution. By making smart contracts, you are rewarded through our innovation we can "dApp Staking".`,
        href: "#",
        image: "features-basic-income.svg"
      },
      {
        title: "Web2 + Web3",
        description: "Astar supports both web2 and web3 developers. Through our multivirtual virtual machine solution, developers can deploy smart contracts both on Ethereum Virtual Machine and WebAssembly.",
        href: "#",
        image: "features-web2-web3.svg"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-gray-600 max-w-7xl mx-auto lg:text-lg space-y-16 sm:space-y-32 px-4 sm:px-6" }, _attrs))} data-v-c48fcdaa><!--[-->`);
      ssrRenderList(features, (item, index) => {
        _push(`<div class="sm:flex" data-v-c48fcdaa><div class="${ssrRenderClass([index % 2 === 0 && "sm:order-2", "shrink-0 mb-6 sm:mb-0"])}" data-v-c48fcdaa><img${ssrRenderAttr("src", unref(useAsset)("home/" + item.image))}${ssrRenderAttr("alt", item.title)} class="mx-auto" data-v-c48fcdaa></div><div class="${ssrRenderClass(index % 2 === 0 && "sm:order-1")}" data-v-c48fcdaa><h2 data-v-c48fcdaa><span data-v-c48fcdaa>${ssrInterpolate(item.title)}</span></h2><p data-v-c48fcdaa>${ssrInterpolate(item.description)}</p><a${ssrRenderAttr("href", item.href)} data-v-c48fcdaa>Learn more -&gt;</a></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/Features.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c48fcdaa"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Backers",
  __ssrInlineRender: true,
  setup(__props) {
    const logos = [
      {
        name: "Binance Labs",
        image: "binance-labs.png"
      },
      {
        name: "Coinbase Ventures",
        image: "coinbase-ventures.png"
      },
      {
        name: "Polychain Capital",
        image: "polychain-capital.png"
      },
      {
        name: "Crypto.com Capital",
        image: "cryptocom-capital.png"
      },
      {
        name: "Fenbushi Capital",
        image: "fenbushi-capital.png"
      },
      {
        name: "Hypersphere",
        image: "hypersphere.png"
      },
      {
        name: "Hashkey Capital",
        image: "hashkey-capital.svg"
      },
      {
        name: "Huobi Ventures",
        image: "huobi-ventures.png"
      },
      {
        name: "Almaeda Research",
        image: "almaeda-research.png"
      },
      {
        name: "Alchemy Ventures",
        image: "alchemy-ventures.svg"
      },
      {
        name: "DFG",
        image: "dfg.png"
      },
      {
        name: "KR1",
        image: "kr1.png"
      },
      {
        name: "Okex Blockdream Ventures",
        image: "okex-blockdream-ventures.png"
      },
      {
        name: "Longhash Ventures",
        image: "longhash-ventures.png"
      },
      {
        name: "gumi Cryptos",
        image: "gumi-cryptos.png"
      },
      {
        name: "Sub0 capital",
        image: "sub0capital.png"
      },
      {
        name: "Digital Strategies",
        image: "digital-strategies.png"
      },
      {
        name: "Altonomy",
        image: "altonomy.svg"
      },
      {
        name: "AU21 Capital",
        image: "au21capital.png"
      },
      {
        name: "TRG Capital",
        image: "trg-capital.png"
      },
      {
        name: "PAKA",
        image: "paka.png"
      },
      {
        name: "SNZ",
        image: "snz.png"
      },
      {
        name: "IOSG Ventres",
        image: "iosg-ventres.png"
      },
      {
        name: "GSR",
        image: "gsr.svg"
      },
      {
        name: "Rok Capital",
        image: "rok-capital.png"
      },
      {
        name: "Scytale Ventures",
        image: "scytale-ventures.png"
      },
      {
        name: "Vessel",
        image: "vessel.png"
      },
      {
        name: "Warburg Serres",
        image: "warburg-serres.png"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-7xl px-4 sm:px-6" }, _attrs))}><h2 class="text-center text-space-gray-dark text-3xl lg:text-4xl font-bold mb-20"> Backed By </h2><div class="px-4 sm:px-6"><div class="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-20 sm:grid-cols-4 lg:grid-cols-5"><!--[-->`);
      ssrRenderList(logos, (item) => {
        _push(`<div class="flex items-center justify-center"><img class="h-12 w-32 lg:w-48 object-contain"${ssrRenderAttr("src", unref(useAsset)("home/logos/" + item.image))}${ssrRenderAttr("alt", item.name)}></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/Backers.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  props: {
    page: null
  },
  setup(__props) {
    const Twitter = __nuxt_component_0$1;
    const Discord = __nuxt_component_1$1;
    const Telegram = __nuxt_component_2$3;
    const Medium = __nuxt_component_3$1;
    const Github = __nuxt_component_4$1;
    const Youtube = __nuxt_component_5$2;
    const nav = [
      {
        name: "Build",
        nav: [
          { name: "Docs", href: "https://docs.astar.network/" },
          { name: "GitHub", href: "https://github.com/AstarNetwork" },
          { name: "Discord", href: "https://discord.gg/Z3nC9U4" }
        ]
      },
      {
        name: "Apply",
        nav: [
          {
            name: "Astar Space Lab",
            href: "https://astarnetwork.notion.site/Astar-SpaceLabs-bee19d9d13ab41ba8d113347ae56448f"
          },
          { name: "Careers", href: "https://angel.co/company/astar-network" },
          {
            name: "Astar Growth Program",
            href: "https://github.com/AstarNetwork/growth-program"
          },
          {
            name: "Bug Bounty Program",
            href: "https://immunefi.com/bounty/astarnetwork"
          }
        ]
      },
      {
        name: "Learn",
        nav: [
          { name: "Blog", href: "https://medium.com/astar-network" },
          { name: "Videos", href: "https://www.youtube.com/c/AstarNetwork" },
          { name: "Forum", href: "https://forum.astar.network/" }
        ]
      },
      {
        name: "Other",
        nav: [
          {
            name: "Privacy Policy",
            href: "https://docs.google.com/document/d/1jEbhRfh292TahRMRdeN4z-8MYNU27dCS_vVopV6xQgk/edit?usp=sharing"
          },
          {
            name: "Terms of Use",
            href: "https://docs.google.com/document/d/1gxM0PEzFq7nW5VB11pMcDUaaKxfMz3BjTDtmEem_oo4/edit?usp=sharing"
          }
        ]
      }
    ];
    const social = [
      {
        name: "Twitter",
        href: "https://twitter.com/astarNetwork",
        icon: Twitter
      },
      {
        name: "Discord",
        href: "https://discord.gg/Z3nC9U4",
        icon: Discord
      },
      {
        name: "Telegram",
        href: "https://t.me/PlasmOfficial",
        icon: Telegram
      },
      {
        name: "Medium",
        href: "https://medium.com/astar-network",
        icon: Medium
      },
      {
        name: "GitHub",
        href: "https://github.com/AstarNetwork",
        icon: Github
      },
      {
        name: "YouTube",
        href: "https://www.youtube.com/c/AstarNetwork",
        icon: Youtube
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: ["mx-auto max-w-6xl pb-12 px-4 sm:px-6 lg:pb-16 relative z-10", __props.page === "home" ? "text-white" : "text-gray-500"]
      }, _attrs))}><div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
      ssrRenderList(nav, (category) => {
        _push(`<div><h3 class="${ssrRenderClass([__props.page === "home" ? "text-white" : "text-space-gray-dark", "font-medium uppercase"])}">${ssrInterpolate(category.name)}</h3><ul role="list" class="mt-4 space-y-4"><!--[-->`);
        ssrRenderList(category.nav, (item) => {
          _push(`<li class="leading-snug"><a${ssrRenderAttr("href", item.href)} target="_blank" rel="noopener" class="${ssrRenderClass([
            __props.page === "home" ? "text-gray-200 hover:text-gray-50" : "text-gray-500 hover:text-space-gray-dark",
            "text-tiny hover:underline transition"
          ])}">${ssrInterpolate(item.name)} `);
          _push(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-4 h-4 inline-block stroke-2" }, null, _parent));
          _push(`</a></li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div><div class="${ssrRenderClass([__props.page === "home" ? "text-white" : "border-gray-200", "mt-16 border-t pt-8 lg:flex items-center justify-between"])}"><div class="flex space-x-6 order-2 justify-center"><!--[-->`);
      ssrRenderList(social, (item) => {
        _push(`<a target="_blank" rel="noopener"${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([
          __props.page === "home" ? "text-gray-200 hover:text-gray-50" : "text-gray-400 hover:text-gray-500",
          "transition"
        ])}"><span class="sr-only">${ssrInterpolate(item.name)}</span>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), {
          class: "h-6 w-6",
          "aria-hidden": "true"
        }, null), _parent);
        _push(`</a>`);
      });
      _push(`<!--]--></div><p class="${ssrRenderClass([__props.page === "home" ? "text-gray-200" : "text-gray-400", "mt-8 order-1 text-sm lg:mt-0 text-center"])}"> \xA9 2022 Astar Portal - The Future of Smart Contracts for Multichain. All Rights Reserved. </p></div></footer>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const meta = {
  layout: "home",
  pageTitle: "Home",
  slug: "",
  description: "Astar is a scalable decentralised blockchain for next big Web3 innovations."
};
const _routes = [
  {
    name: "community",
    path: "/community",
    file: "/Users/ayumi/Projects/AstarNetwork/HP/github/pages/community.vue",
    children: [],
    meta: meta$2,
    alias: (meta$2 == null ? void 0 : meta$2.alias) || [],
    component: () => import('./_nuxt/community.e58aa2d1.mjs').then((m) => m.default || m)
  },
  {
    name: "developers",
    path: "/developers",
    file: "/Users/ayumi/Projects/AstarNetwork/HP/github/pages/developers.vue",
    children: [],
    meta: meta$1,
    alias: (meta$1 == null ? void 0 : meta$1.alias) || [],
    component: () => import('./_nuxt/developers.c5b25fd3.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    file: "/Users/ayumi/Projects/AstarNetwork/HP/github/pages/index.vue",
    children: [],
    meta,
    alias: (meta == null ? void 0 : meta.alias) || [],
    component: () => import('./_nuxt/index.2bb4a9b7.mjs').then((m) => m.default || m)
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const globalMiddleware = [];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b, _c, _d;
  let __temp, __restore;
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b = (_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) != null ? _b : createMemoryHistory(routerBase);
  const routes = (_d = (_c = routerOptions.routes) == null ? void 0 : _c.call(routerOptions, _routes)) != null ? _d : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a2, _b2, _c2, _d2;
    if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a2, _b2;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a2 = initialLayout.value) != null ? _a2 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.event.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.5711ad21.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = resolveComponent("App");
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const layouts = {
  default: defineAsyncComponent(() => import('./_nuxt/default.652fc7ce.mjs').then((m) => m.default || m)),
  home: defineAsyncComponent(() => import('./_nuxt/home.7074ce9b.mjs').then((m) => m.default || m))
};
const __nuxt_component_0 = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a, _b, _c;
      const layout = (_b = (_a = isRef(props.name) ? props.name.value : props.name) != null ? _a : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout && layout in layouts;
      const transitionProps = (_c = route.meta.layoutTransition) != null ? _c : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => {
          return _wrapIf(layouts[layout], hasLayout, context.slots).default();
        }
      }).default();
    };
  }
});
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = resolveComponent("NuxtPage");
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main$1);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _sfc_main$2 as A, useRoute as B, useHead as C, _imports_0$4 as D, __nuxt_component_3$2 as E, _sfc_main$k as F, __nuxt_component_0$3 as G, _imports_1$1 as _, _imports_2$3 as a, _imports_2$2 as b, __nuxt_component_0$2 as c, _sfc_main$t as d, entry$1 as default, __nuxt_component_2$2 as e, __nuxt_component_3 as f, __nuxt_component_4 as g, __nuxt_component_5$1 as h, _export_sfc as i, _imports_2$1 as j, _sfc_main$f as k, _sfc_main$e as l, _sfc_main$d as m, _sfc_main$c as n, _sfc_main$b as o, _sfc_main$a as p, _imports_0$5 as q, _imports_4 as r, _imports_5 as s, _sfc_main$9 as t, __nuxt_component_1 as u, __nuxt_component_2 as v, _sfc_main$6 as w, _sfc_main$5 as x, __nuxt_component_5 as y, _sfc_main$3 as z };
//# sourceMappingURL=server.mjs.map
