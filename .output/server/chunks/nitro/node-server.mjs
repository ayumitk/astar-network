globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash, joinURL } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.req.url?.startsWith("/__nuxt_error");
  let html = !isErrorPage ? await $fetch(withQuery("/__nuxt_error", errorObject)).catch(() => null) : null;
  if (!html) {
    const { template } = await import('../error-500.mjs');
    html = template(errorObject);
  }
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3Qo4hpfwVw6AowPrKWeVP89pUuA\"",
    "mtime": "2022-10-26T01:34:10.226Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-Et7xISaisk9MSJ07l5SSMCpzk+s\"",
    "mtime": "2022-10-26T01:34:10.225Z",
    "size": 15086,
    "path": "../public/favicon.ico"
  },
  "/social-preview.png": {
    "type": "image/png",
    "etag": "\"957fa-jhXeV4So/vDYiheKLqK3peaBQ0c\"",
    "mtime": "2022-10-26T01:34:10.223Z",
    "size": 612346,
    "path": "../public/social-preview.png"
  },
  "/_nuxt/2528cc181ee2.328b0af0.png": {
    "type": "image/png",
    "etag": "\"5b050-J9rGEifRrW7h5wBfmJ6Sk9xITOQ\"",
    "mtime": "2022-10-26T01:34:10.220Z",
    "size": 372816,
    "path": "../public/_nuxt/2528cc181ee2.328b0af0.png"
  },
  "/_nuxt/4e905e93cd7e.f736e70f.png": {
    "type": "image/png",
    "etag": "\"5d7c0-HnH3zqOeo5dMc2NzmQsKaATaNzw\"",
    "mtime": "2022-10-26T01:34:10.219Z",
    "size": 382912,
    "path": "../public/_nuxt/4e905e93cd7e.f736e70f.png"
  },
  "/_nuxt/50c0ed9f07a6.9c8beff9.png": {
    "type": "image/png",
    "etag": "\"76f00-QSoJXpW1Kb/D3l/G5uNIF3iNwWo\"",
    "mtime": "2022-10-26T01:34:10.218Z",
    "size": 487168,
    "path": "../public/_nuxt/50c0ed9f07a6.9c8beff9.png"
  },
  "/_nuxt/5b49919187fc.45b443b8.png": {
    "type": "image/png",
    "etag": "\"123ca-1cDNtnUog1YSvNmJoD0eSnoi7u4\"",
    "mtime": "2022-10-26T01:34:10.218Z",
    "size": 74698,
    "path": "../public/_nuxt/5b49919187fc.45b443b8.png"
  },
  "/_nuxt/90d7cd82d14b.28faa4ba.png": {
    "type": "image/png",
    "etag": "\"b2f4a-Vg+M/YB23bnL4cNwzJFsmo3vvzs\"",
    "mtime": "2022-10-26T01:34:10.218Z",
    "size": 733002,
    "path": "../public/_nuxt/90d7cd82d14b.28faa4ba.png"
  },
  "/_nuxt/Footer.vue_vue_type_script_setup_true_lang.69f09417.js": {
    "type": "application/javascript",
    "etag": "\"cd3-iSLuSa0WKmm8HjwexFm++P+4IHo\"",
    "mtime": "2022-10-26T01:34:10.217Z",
    "size": 3283,
    "path": "../public/_nuxt/Footer.vue_vue_type_script_setup_true_lang.69f09417.js"
  },
  "/_nuxt/Header.89200d5f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c5-KXMMSgKISUwJbZfjrEdDHw9jxic\"",
    "mtime": "2022-10-26T01:34:10.217Z",
    "size": 709,
    "path": "../public/_nuxt/Header.89200d5f.css"
  },
  "/_nuxt/Header.ff7fbd3b.js": {
    "type": "application/javascript",
    "etag": "\"5af9-uNvxjIObG+8KeVRsM7Xa92kwJbM\"",
    "mtime": "2022-10-26T01:34:10.216Z",
    "size": 23289,
    "path": "../public/_nuxt/Header.ff7fbd3b.js"
  },
  "/_nuxt/Youtube.ef875729.js": {
    "type": "application/javascript",
    "etag": "\"b74-GFkTBOsgR/jxLjcrdHRyw0VtPR4\"",
    "mtime": "2022-10-26T01:34:10.216Z",
    "size": 2932,
    "path": "../public/_nuxt/Youtube.ef875729.js"
  },
  "/_nuxt/advantages-ethereum.6dc8c9fb.svg": {
    "type": "image/svg+xml",
    "etag": "\"82e-EmZ5IMuyT8AukGZD6uyEHGBFwFU\"",
    "mtime": "2022-10-26T01:34:10.216Z",
    "size": 2094,
    "path": "../public/_nuxt/advantages-ethereum.6dc8c9fb.svg"
  },
  "/_nuxt/advantages-income.9f4a872c.svg": {
    "type": "image/svg+xml",
    "etag": "\"a839-S8S0CtNqOwgkWqmkeJ3/SSNLXJI\"",
    "mtime": "2022-10-26T01:34:10.216Z",
    "size": 43065,
    "path": "../public/_nuxt/advantages-income.9f4a872c.svg"
  },
  "/_nuxt/advantages-scalable.f93867ce.svg": {
    "type": "image/svg+xml",
    "etag": "\"cb7-B6M+ACHFgWQQGqf81keiFdooYP8\"",
    "mtime": "2022-10-26T01:34:10.216Z",
    "size": 3255,
    "path": "../public/_nuxt/advantages-scalable.f93867ce.svg"
  },
  "/_nuxt/advantages-secure.8831c2a5.svg": {
    "type": "image/svg+xml",
    "etag": "\"273c-L+lpQN2oPCZEThj7P3i93UP8nFY\"",
    "mtime": "2022-10-26T01:34:10.216Z",
    "size": 10044,
    "path": "../public/_nuxt/advantages-secure.8831c2a5.svg"
  },
  "/_nuxt/advantages-wasm.2cfa19ac.svg": {
    "type": "image/svg+xml",
    "etag": "\"959-qN5/d8s+63S2iUH45YPxPI8mUf4\"",
    "mtime": "2022-10-26T01:34:10.216Z",
    "size": 2393,
    "path": "../public/_nuxt/advantages-wasm.2cfa19ac.svg"
  },
  "/_nuxt/advantages-xcm.394358c9.svg": {
    "type": "image/svg+xml",
    "etag": "\"15565-ZacX8TdU4KKXcsdEetPtRcZhRik\"",
    "mtime": "2022-10-26T01:34:10.215Z",
    "size": 87397,
    "path": "../public/_nuxt/advantages-xcm.394358c9.svg"
  },
  "/_nuxt/alchemy-ventures.35e7edc7.svg": {
    "type": "image/svg+xml",
    "etag": "\"3a2e1-SfWraLL+H4yfDwdnXBMIzgsGcw4\"",
    "mtime": "2022-10-26T01:34:10.215Z",
    "size": 238305,
    "path": "../public/_nuxt/alchemy-ventures.35e7edc7.svg"
  },
  "/_nuxt/alchemy.007bbe24.svg": {
    "type": "image/svg+xml",
    "etag": "\"28d1-vhSSrLrK/vi6yq/R+HXDcOfd1ZI\"",
    "mtime": "2022-10-26T01:34:10.215Z",
    "size": 10449,
    "path": "../public/_nuxt/alchemy.007bbe24.svg"
  },
  "/_nuxt/almaeda-research.ba8f1bec.png": {
    "type": "image/png",
    "etag": "\"a108-ZBVXSrvtaxqqDl5/sNmvNgGr5Fg\"",
    "mtime": "2022-10-26T01:34:10.215Z",
    "size": 41224,
    "path": "../public/_nuxt/almaeda-research.ba8f1bec.png"
  },
  "/_nuxt/altonomy.4208d3af.svg": {
    "type": "image/svg+xml",
    "etag": "\"d55-v6wQeQeJBknJjTQBElJyouSPjy0\"",
    "mtime": "2022-10-26T01:34:10.214Z",
    "size": 3413,
    "path": "../public/_nuxt/altonomy.4208d3af.svg"
  },
  "/_nuxt/astar.d14dc7dc.mp4": {
    "type": "video/mp4",
    "etag": "\"3f7fcc-b7MJmFanfNM28Ijtdft0JG2rEXM\"",
    "mtime": "2022-10-26T01:34:10.214Z",
    "size": 4161484,
    "path": "../public/_nuxt/astar.d14dc7dc.mp4"
  },
  "/_nuxt/au21capital.4f471521.png": {
    "type": "image/png",
    "etag": "\"31a7-qt6NMqPie75W5masKvwkb0lgyo4\"",
    "mtime": "2022-10-26T01:34:10.210Z",
    "size": 12711,
    "path": "../public/_nuxt/au21capital.4f471521.png"
  },
  "/_nuxt/become-collator.4ba88df8.svg": {
    "type": "image/svg+xml",
    "etag": "\"8a51-ts0Z2tE/v9Zv7rRvAKiagnxeJJ8\"",
    "mtime": "2022-10-26T01:34:10.210Z",
    "size": 35409,
    "path": "../public/_nuxt/become-collator.4ba88df8.svg"
  },
  "/_nuxt/become-developer.6d0d0a86.svg": {
    "type": "image/svg+xml",
    "etag": "\"17a57-TQXypfrszkMk0wZ4nuEewQqY2ZY\"",
    "mtime": "2022-10-26T01:34:10.210Z",
    "size": 96855,
    "path": "../public/_nuxt/become-developer.6d0d0a86.svg"
  },
  "/_nuxt/become-staker.b71d1f17.svg": {
    "type": "image/svg+xml",
    "etag": "\"19fb8-4U9t4dtOjWbySolvKNo+T8b6ufc\"",
    "mtime": "2022-10-26T01:34:10.210Z",
    "size": 106424,
    "path": "../public/_nuxt/become-staker.b71d1f17.svg"
  },
  "/_nuxt/become-users.c55012b7.svg": {
    "type": "image/svg+xml",
    "etag": "\"b770-doawaUxU7dseqFT6w6TnE93lz90\"",
    "mtime": "2022-10-26T01:34:10.210Z",
    "size": 46960,
    "path": "../public/_nuxt/become-users.c55012b7.svg"
  },
  "/_nuxt/binance-labs.e5c3f0fe.png": {
    "type": "image/png",
    "etag": "\"2441-AcKpO9Dop8+/OCn1naDAGOR3ko0\"",
    "mtime": "2022-10-26T01:34:10.209Z",
    "size": 9281,
    "path": "../public/_nuxt/binance-labs.e5c3f0fe.png"
  },
  "/_nuxt/blockdaemon.3482c8ce.svg": {
    "type": "image/svg+xml",
    "etag": "\"ecf-JVf/eTbC+M9EeBaIzgI/Cw0aNEw\"",
    "mtime": "2022-10-26T01:34:10.209Z",
    "size": 3791,
    "path": "../public/_nuxt/blockdaemon.3482c8ce.svg"
  },
  "/_nuxt/building-collator.1e4e7be2.svg": {
    "type": "image/svg+xml",
    "etag": "\"5493-Gcu6v2E9QhH3W+hAfyq1Iz5IiNs\"",
    "mtime": "2022-10-26T01:34:10.209Z",
    "size": 21651,
    "path": "../public/_nuxt/building-collator.1e4e7be2.svg"
  },
  "/_nuxt/building-ethereum.90261988.svg": {
    "type": "image/svg+xml",
    "etag": "\"814-f+YeViCrdYUckX3f6grEKMPwA0s\"",
    "mtime": "2022-10-26T01:34:10.209Z",
    "size": 2068,
    "path": "../public/_nuxt/building-ethereum.90261988.svg"
  },
  "/_nuxt/building-exchange.45ef4ec1.svg": {
    "type": "image/svg+xml",
    "etag": "\"1841-AXxrhAJU+DNtA6jTU0KT6aLfxqM\"",
    "mtime": "2022-10-26T01:34:10.209Z",
    "size": 6209,
    "path": "../public/_nuxt/building-exchange.45ef4ec1.svg"
  },
  "/_nuxt/building-template.44ef1e6b.svg": {
    "type": "image/svg+xml",
    "etag": "\"bb96-dUkSQE5j3+qZYkY50hzVSPrhNu0\"",
    "mtime": "2022-10-26T01:34:10.209Z",
    "size": 48022,
    "path": "../public/_nuxt/building-template.44ef1e6b.svg"
  },
  "/_nuxt/building-wasm.e9676a5c.svg": {
    "type": "image/svg+xml",
    "etag": "\"8ba-s2/8nyAsM3XTEP8oYuqJCWvhPXQ\"",
    "mtime": "2022-10-26T01:34:10.207Z",
    "size": 2234,
    "path": "../public/_nuxt/building-wasm.e9676a5c.svg"
  },
  "/_nuxt/bwarelabs.e30159e7.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e9a-P4j0K1/9grxzvaS4BD/Eox5Tb7Q\"",
    "mtime": "2022-10-26T01:34:10.206Z",
    "size": 7834,
    "path": "../public/_nuxt/bwarelabs.e30159e7.svg"
  },
  "/_nuxt/cloud.252babcc.svg": {
    "type": "image/svg+xml",
    "etag": "\"334d-C2oVHDZHByAcq5vuTWqSZ5Ikeng\"",
    "mtime": "2022-10-26T01:34:10.206Z",
    "size": 13133,
    "path": "../public/_nuxt/cloud.252babcc.svg"
  },
  "/_nuxt/cloud.5b32edfd.js": {
    "type": "application/javascript",
    "etag": "\"d73-7INZAmT0/ouqRmMWbweqMgWjAJI\"",
    "mtime": "2022-10-26T01:34:10.206Z",
    "size": 3443,
    "path": "../public/_nuxt/cloud.5b32edfd.js"
  },
  "/_nuxt/community.699b893d.js": {
    "type": "application/javascript",
    "etag": "\"3514-a1B/IrliMG5oResk3hEjD0SuNGw\"",
    "mtime": "2022-10-26T01:34:10.206Z",
    "size": 13588,
    "path": "../public/_nuxt/community.699b893d.js"
  },
  "/_nuxt/community.ea1a68a4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c5-cchK7YZ6BY0ZwK7uQWHyUWpFE3w\"",
    "mtime": "2022-10-26T01:34:10.206Z",
    "size": 197,
    "path": "../public/_nuxt/community.ea1a68a4.css"
  },
  "/_nuxt/cryptocom-capital.16ec4b00.png": {
    "type": "image/png",
    "etag": "\"5295-f18oXPjGOucF2/b16oqHxiHM1YM\"",
    "mtime": "2022-10-26T01:34:10.206Z",
    "size": 21141,
    "path": "../public/_nuxt/cryptocom-capital.16ec4b00.png"
  },
  "/_nuxt/d402085bef2b.0f3e9bb9.png": {
    "type": "image/png",
    "etag": "\"c5e2d-3iqm//gy7J4vmmV8GOzvy9BVWjU\"",
    "mtime": "2022-10-26T01:34:10.205Z",
    "size": 810541,
    "path": "../public/_nuxt/d402085bef2b.0f3e9bb9.png"
  },
  "/_nuxt/default.9a808ac8.js": {
    "type": "application/javascript",
    "etag": "\"7b2-fJ/JrcZmGtjtSXBX8uLe+gRgQHU\"",
    "mtime": "2022-10-26T01:34:10.205Z",
    "size": 1970,
    "path": "../public/_nuxt/default.9a808ac8.js"
  },
  "/_nuxt/developers.64754989.js": {
    "type": "application/javascript",
    "etag": "\"27d1-27lMH0djR5VXrDAELdBehdyjFlw\"",
    "mtime": "2022-10-26T01:34:10.204Z",
    "size": 10193,
    "path": "../public/_nuxt/developers.64754989.js"
  },
  "/_nuxt/developers.faf30071.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c5-iBENQnR8S5yQM3u8dXZbM3XQsPY\"",
    "mtime": "2022-10-26T01:34:10.204Z",
    "size": 197,
    "path": "../public/_nuxt/developers.faf30071.css"
  },
  "/_nuxt/dfg.fad57cfa.png": {
    "type": "image/png",
    "etag": "\"3563-H/zpSjJT3wUTaFAvY9hisA9XMmY\"",
    "mtime": "2022-10-26T01:34:10.204Z",
    "size": 13667,
    "path": "../public/_nuxt/dfg.fad57cfa.png"
  },
  "/_nuxt/digital-strategies.76118108.png": {
    "type": "image/png",
    "etag": "\"2f64-73YRsLVKkotSqSXwN4oT0aF7vbM\"",
    "mtime": "2022-10-26T01:34:10.204Z",
    "size": 12132,
    "path": "../public/_nuxt/digital-strategies.76118108.png"
  },
  "/_nuxt/entry.2bbb0c6f.js": {
    "type": "application/javascript",
    "etag": "\"21b4b-iQUqUL0M1y/f/DgTWYA6T7W2ZFw\"",
    "mtime": "2022-10-26T01:34:10.204Z",
    "size": 138059,
    "path": "../public/_nuxt/entry.2bbb0c6f.js"
  },
  "/_nuxt/entry.9037b127.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9420-IfSCLpnHoR+7b9XMR6tO3SVOELc\"",
    "mtime": "2022-10-26T01:34:10.203Z",
    "size": 37920,
    "path": "../public/_nuxt/entry.9037b127.css"
  },
  "/_nuxt/error-404.18ced855.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-F8gJ3uSz6Dg2HRyb374Ax3RegKE\"",
    "mtime": "2022-10-26T01:34:10.203Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.18ced855.css"
  },
  "/_nuxt/error-404.5f17e74d.js": {
    "type": "application/javascript",
    "etag": "\"8a3-ahRLDI9tLfMtiT+j0riFSdt6ZPo\"",
    "mtime": "2022-10-26T01:34:10.203Z",
    "size": 2211,
    "path": "../public/_nuxt/error-404.5f17e74d.js"
  },
  "/_nuxt/error-500.5b590c7a.js": {
    "type": "application/javascript",
    "etag": "\"751-/HuPFn5kIskLrhOEM/mggDxG7Cw\"",
    "mtime": "2022-10-26T01:34:10.203Z",
    "size": 1873,
    "path": "../public/_nuxt/error-500.5b590c7a.js"
  },
  "/_nuxt/error-500.e60962de.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-VhleGjkSRH7z4cQDJV3dxcboMhU\"",
    "mtime": "2022-10-26T01:34:10.203Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.e60962de.css"
  },
  "/_nuxt/error-component.d188276d.js": {
    "type": "application/javascript",
    "etag": "\"465-nFMkIHBShw77fGZZ3UG5J2U1lw4\"",
    "mtime": "2022-10-26T01:34:10.203Z",
    "size": 1125,
    "path": "../public/_nuxt/error-component.d188276d.js"
  },
  "/_nuxt/features-basic-income.20658af9.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a596-+710IA06OehKovMUVmvy5RasaTc\"",
    "mtime": "2022-10-26T01:34:10.202Z",
    "size": 304534,
    "path": "../public/_nuxt/features-basic-income.20658af9.svg"
  },
  "/_nuxt/features-multichain.1601f84e.svg": {
    "type": "image/svg+xml",
    "etag": "\"2e546-PluOTngsYYGDlY6ZZfW68qEY6hY\"",
    "mtime": "2022-10-26T01:34:10.202Z",
    "size": 189766,
    "path": "../public/_nuxt/features-multichain.1601f84e.svg"
  },
  "/_nuxt/features-web2-web3.3543e3e4.svg": {
    "type": "image/svg+xml",
    "etag": "\"10589-rW8kTrUliopyIufwLX2zlFZayUA\"",
    "mtime": "2022-10-26T01:34:10.202Z",
    "size": 66953,
    "path": "../public/_nuxt/features-web2-web3.3543e3e4.svg"
  },
  "/_nuxt/fenbushi-capital.8c865981.png": {
    "type": "image/png",
    "etag": "\"59a9-MFdWOWYiH0jLj96llgjo670djAs\"",
    "mtime": "2022-10-26T01:34:10.201Z",
    "size": 22953,
    "path": "../public/_nuxt/fenbushi-capital.8c865981.png"
  },
  "/_nuxt/footer-landscape.e7d3ddee.svg": {
    "type": "image/svg+xml",
    "etag": "\"11c26-ElWYCBbNcrqRo8HfUby9yMhkxLA\"",
    "mtime": "2022-10-26T01:34:10.201Z",
    "size": 72742,
    "path": "../public/_nuxt/footer-landscape.e7d3ddee.svg"
  },
  "/_nuxt/footer-reflect.72bd4e26.svg": {
    "type": "image/svg+xml",
    "etag": "\"1206f-5XCF8N6lFKpfXVlBMAER2RHQfT0\"",
    "mtime": "2022-10-26T01:34:10.201Z",
    "size": 73839,
    "path": "../public/_nuxt/footer-reflect.72bd4e26.svg"
  },
  "/_nuxt/footer-sky.c676c8b2.svg": {
    "type": "image/svg+xml",
    "etag": "\"7285-+IywgaesCTGmY+mEyXExGTyOxRM\"",
    "mtime": "2022-10-26T01:34:10.201Z",
    "size": 29317,
    "path": "../public/_nuxt/footer-sky.c676c8b2.svg"
  },
  "/_nuxt/gateway.053bdc10.svg": {
    "type": "image/svg+xml",
    "etag": "\"66fc3-KZaAIh9kxFCric8vK4Rbo/Ucd8k\"",
    "mtime": "2022-10-26T01:34:10.201Z",
    "size": 421827,
    "path": "../public/_nuxt/gateway.053bdc10.svg"
  },
  "/_nuxt/gsr.3d3dca56.svg": {
    "type": "image/svg+xml",
    "etag": "\"a4c-Bt4TU7kbpRhgRT+79wdDtq4vj9s\"",
    "mtime": "2022-10-26T01:34:10.200Z",
    "size": 2636,
    "path": "../public/_nuxt/gsr.3d3dca56.svg"
  },
  "/_nuxt/gumi-cryptos.4e395a45.png": {
    "type": "image/png",
    "etag": "\"6472-dwHvjroRyc150NvGKjDR+U6lH0E\"",
    "mtime": "2022-10-26T01:34:10.200Z",
    "size": 25714,
    "path": "../public/_nuxt/gumi-cryptos.4e395a45.png"
  },
  "/_nuxt/hashkey-capital.566e8fe1.svg": {
    "type": "image/svg+xml",
    "etag": "\"127c-N/Iz/x7j16aISW2j055LInRdnOQ\"",
    "mtime": "2022-10-26T01:34:10.200Z",
    "size": 4732,
    "path": "../public/_nuxt/hashkey-capital.566e8fe1.svg"
  },
  "/_nuxt/hero.a0991ba5.svg": {
    "type": "image/svg+xml",
    "etag": "\"4bd6d-iOkK3WxaUxcaDwsY7OXBI/iqjbk\"",
    "mtime": "2022-10-26T01:34:10.200Z",
    "size": 310637,
    "path": "../public/_nuxt/hero.a0991ba5.svg"
  },
  "/_nuxt/hero.b8e1d229.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ca49-WNW5RWSvesYL6yRQllsA4ghRKtY\"",
    "mtime": "2022-10-26T01:34:10.199Z",
    "size": 117321,
    "path": "../public/_nuxt/hero.b8e1d229.svg"
  },
  "/_nuxt/home.074b8cc9.js": {
    "type": "application/javascript",
    "etag": "\"6a4-/5HYBXJR6dmm9sAyBZp0SvAbKfw\"",
    "mtime": "2022-10-26T01:34:10.199Z",
    "size": 1700,
    "path": "../public/_nuxt/home.074b8cc9.js"
  },
  "/_nuxt/huobi-ventures.456b78c6.png": {
    "type": "image/png",
    "etag": "\"1223b-aHJChDGds2GHYGBSArsAVWxrpIU\"",
    "mtime": "2022-10-26T01:34:10.199Z",
    "size": 74299,
    "path": "../public/_nuxt/huobi-ventures.456b78c6.png"
  },
  "/_nuxt/hypersphere.5197c96a.png": {
    "type": "image/png",
    "etag": "\"2a2e4-7qVCad59I5idC6NA8duOSodwO80\"",
    "mtime": "2022-10-26T01:34:10.199Z",
    "size": 172772,
    "path": "../public/_nuxt/hypersphere.5197c96a.png"
  },
  "/_nuxt/index.c79dded0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"296-yArMF13Ky0YT7ctIYgJFCYcipUM\"",
    "mtime": "2022-10-26T01:34:10.198Z",
    "size": 662,
    "path": "../public/_nuxt/index.c79dded0.css"
  },
  "/_nuxt/index.f8d68c7d.js": {
    "type": "application/javascript",
    "etag": "\"2fb3-6CJedbqUNGa4QAK5u8n6qzuqIlk\"",
    "mtime": "2022-10-26T01:34:10.198Z",
    "size": 12211,
    "path": "../public/_nuxt/index.f8d68c7d.js"
  },
  "/_nuxt/iosg-ventres.5ec054fa.png": {
    "type": "image/png",
    "etag": "\"a072-u0GVk3PjgiUxi6/er8NjMA5Cg5g\"",
    "mtime": "2022-10-26T01:34:10.198Z",
    "size": 41074,
    "path": "../public/_nuxt/iosg-ventres.5ec054fa.png"
  },
  "/_nuxt/kr1.053c181a.png": {
    "type": "image/png",
    "etag": "\"3952e-0Nc6YR79mfWqRvUazMIoo7ApXq4\"",
    "mtime": "2022-10-26T01:34:10.198Z",
    "size": 234798,
    "path": "../public/_nuxt/kr1.053c181a.png"
  },
  "/_nuxt/logo.67ac0999.js": {
    "type": "application/javascript",
    "etag": "\"3fb-wTzxVI7EzF7L+MeNMWv7adr1JxU\"",
    "mtime": "2022-10-26T01:34:10.197Z",
    "size": 1019,
    "path": "../public/_nuxt/logo.67ac0999.js"
  },
  "/_nuxt/logo.d1ea41ba.svg": {
    "type": "image/svg+xml",
    "etag": "\"61f5-EVCvnXAHHL4ZOOgTnIRfkJyBYRI\"",
    "mtime": "2022-10-26T01:34:10.197Z",
    "size": 25077,
    "path": "../public/_nuxt/logo.d1ea41ba.svg"
  },
  "/_nuxt/longhash-ventures.604a8d70.png": {
    "type": "image/png",
    "etag": "\"16a8d-QtJ9+GKZKLx72571Oq3vpXVGKPI\"",
    "mtime": "2022-10-26T01:34:10.197Z",
    "size": 92813,
    "path": "../public/_nuxt/longhash-ventures.604a8d70.png"
  },
  "/_nuxt/metamask.f1ffd999.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cc6-LE32tuQi51KpbYLGJyLI0MY2+/o\"",
    "mtime": "2022-10-26T01:34:10.197Z",
    "size": 11462,
    "path": "../public/_nuxt/metamask.f1ffd999.svg"
  },
  "/_nuxt/multichain-bg.42b9a52f.svg": {
    "type": "image/svg+xml",
    "etag": "\"105b3-e5cBPP+KXfbR/JfRDxlwCswTr5E\"",
    "mtime": "2022-10-26T01:34:10.196Z",
    "size": 66995,
    "path": "../public/_nuxt/multichain-bg.42b9a52f.svg"
  },
  "/_nuxt/multichain-dao.ec8127de.svg": {
    "type": "image/svg+xml",
    "etag": "\"16bb-Vg4RjSNAnUAHHwGb/irR/uzptvI\"",
    "mtime": "2022-10-26T01:34:10.196Z",
    "size": 5819,
    "path": "../public/_nuxt/multichain-dao.ec8127de.svg"
  },
  "/_nuxt/multichain-defi.55b0b461.svg": {
    "type": "image/svg+xml",
    "etag": "\"6a6-kwWI/ba3MnkZXq69tjkKRmLOPXU\"",
    "mtime": "2022-10-26T01:34:10.196Z",
    "size": 1702,
    "path": "../public/_nuxt/multichain-defi.55b0b461.svg"
  },
  "/_nuxt/multichain-nft.46c2c213.svg": {
    "type": "image/svg+xml",
    "etag": "\"77e-Bk9T6JWhOcTnNyARLBuYvlg4Vm8\"",
    "mtime": "2022-10-26T01:34:10.196Z",
    "size": 1918,
    "path": "../public/_nuxt/multichain-nft.46c2c213.svg"
  },
  "/_nuxt/multichain-providers.b24ecdca.svg": {
    "type": "image/svg+xml",
    "etag": "\"25dd-5Lu8Fbk0+4/CxSbA5tukdvCNB8A\"",
    "mtime": "2022-10-26T01:34:10.195Z",
    "size": 9693,
    "path": "../public/_nuxt/multichain-providers.b24ecdca.svg"
  },
  "/_nuxt/okex-blockdream-ventures.ce529d79.png": {
    "type": "image/png",
    "etag": "\"e954-X9k1sqd8wpSfwfXvjhuOACqFRUM\"",
    "mtime": "2022-10-26T01:34:10.195Z",
    "size": 59732,
    "path": "../public/_nuxt/okex-blockdream-ventures.ce529d79.png"
  },
  "/_nuxt/onfinality.ee9153a5.svg": {
    "type": "image/svg+xml",
    "etag": "\"13de-A9ddlvdgvMXXywxP+HHTqO5aH3Y\"",
    "mtime": "2022-10-26T01:34:10.195Z",
    "size": 5086,
    "path": "../public/_nuxt/onfinality.ee9153a5.svg"
  },
  "/_nuxt/paka.af7a4f5b.png": {
    "type": "image/png",
    "etag": "\"3eed-sS/WqIrJ3YsLkZSrgjOIDjQoIh0\"",
    "mtime": "2022-10-26T01:34:10.195Z",
    "size": 16109,
    "path": "../public/_nuxt/paka.af7a4f5b.png"
  },
  "/_nuxt/polkadot.9e22bfc6.svg": {
    "type": "image/svg+xml",
    "etag": "\"37f8-KyJ3XIkJqjNN7IqsjqbFK7/80p4\"",
    "mtime": "2022-10-26T01:34:10.195Z",
    "size": 14328,
    "path": "../public/_nuxt/polkadot.9e22bfc6.svg"
  },
  "/_nuxt/polychain-capital.09e6ddde.png": {
    "type": "image/png",
    "etag": "\"7f78-vqjKoFBopwPIsIWiSJWkb2+VnXE\"",
    "mtime": "2022-10-26T01:34:10.194Z",
    "size": 32632,
    "path": "../public/_nuxt/polychain-capital.09e6ddde.png"
  },
  "/_nuxt/reading-astar.81805980.svg": {
    "type": "image/svg+xml",
    "etag": "\"e3dd-XHBqzcgNK3zz5HbFoJ5/rm3/7fY\"",
    "mtime": "2022-10-26T01:34:10.194Z",
    "size": 58333,
    "path": "../public/_nuxt/reading-astar.81805980.svg"
  },
  "/_nuxt/reading-ecosystem.adcf99c9.svg": {
    "type": "image/svg+xml",
    "etag": "\"5d338-ZS/5f1lYMpfCdwcBHpKVPWYePNg\"",
    "mtime": "2022-10-26T01:34:10.194Z",
    "size": 381752,
    "path": "../public/_nuxt/reading-ecosystem.adcf99c9.svg"
  },
  "/_nuxt/reading-token.c08327fc.svg": {
    "type": "image/svg+xml",
    "etag": "\"f226-SxAJe7W1pK2qNfA0ymOI8vig9NA\"",
    "mtime": "2022-10-26T01:34:10.193Z",
    "size": 61990,
    "path": "../public/_nuxt/reading-token.c08327fc.svg"
  },
  "/_nuxt/rok-capital.926db19c.png": {
    "type": "image/png",
    "etag": "\"2628-G3c4Kjf5wbm7PO4NPOQkYa6mHJY\"",
    "mtime": "2022-10-26T01:34:10.193Z",
    "size": 9768,
    "path": "../public/_nuxt/rok-capital.926db19c.png"
  },
  "/_nuxt/scytale-ventures.78947485.png": {
    "type": "image/png",
    "etag": "\"1cf7-yon9iegbdeegxXSnWiRyRl4DSEQ\"",
    "mtime": "2022-10-26T01:34:10.193Z",
    "size": 7415,
    "path": "../public/_nuxt/scytale-ventures.78947485.png"
  },
  "/_nuxt/snz.352211cf.png": {
    "type": "image/png",
    "etag": "\"24c8-5UOSnRSraPfkLosV7TRSt973jUs\"",
    "mtime": "2022-10-26T01:34:10.193Z",
    "size": 9416,
    "path": "../public/_nuxt/snz.352211cf.png"
  },
  "/_nuxt/space-cloud.46a86b4a.png": {
    "type": "image/png",
    "etag": "\"22af4-FxHwWMwSxWDcKP+HxuD3dUS04dc\"",
    "mtime": "2022-10-26T01:34:10.192Z",
    "size": 142068,
    "path": "../public/_nuxt/space-cloud.46a86b4a.png"
  },
  "/_nuxt/space-stars.28f2f15f.svg": {
    "type": "image/svg+xml",
    "etag": "\"710ec-EZz6ljpQASATaP6PO5GZk9s/Oy8\"",
    "mtime": "2022-10-26T01:34:10.192Z",
    "size": 463084,
    "path": "../public/_nuxt/space-stars.28f2f15f.svg"
  },
  "/_nuxt/space_lab.c3ba4ed8.svg": {
    "type": "image/svg+xml",
    "etag": "\"cd92b-Hwjeg0rR53delt6LnMAmjb2AaXY\"",
    "mtime": "2022-10-26T01:34:10.191Z",
    "size": 842027,
    "path": "../public/_nuxt/space_lab.c3ba4ed8.svg"
  },
  "/_nuxt/sub0capital.d79c127a.png": {
    "type": "image/png",
    "etag": "\"cc82-Tqbi60yuj+U+Fj0r4cgCMPU0N28\"",
    "mtime": "2022-10-26T01:34:10.189Z",
    "size": 52354,
    "path": "../public/_nuxt/sub0capital.d79c127a.png"
  },
  "/_nuxt/swanky.82a02db4.png": {
    "type": "image/png",
    "etag": "\"183d-FZYThzNkPcEz88Ms/gxDM/55raE\"",
    "mtime": "2022-10-26T01:34:10.189Z",
    "size": 6205,
    "path": "../public/_nuxt/swanky.82a02db4.png"
  },
  "/_nuxt/talisman.f4d0daf1.svg": {
    "type": "image/svg+xml",
    "etag": "\"1525-uAUdeKUipKAFZf58rerr0fekVEM\"",
    "mtime": "2022-10-26T01:34:10.189Z",
    "size": 5413,
    "path": "../public/_nuxt/talisman.f4d0daf1.svg"
  },
  "/_nuxt/toolkit-bg.d6e3e574.svg": {
    "type": "image/svg+xml",
    "etag": "\"77be-WIAAVJnVE1PtCPEp99qKQg9pKDU\"",
    "mtime": "2022-10-26T01:34:10.188Z",
    "size": 30654,
    "path": "../public/_nuxt/toolkit-bg.d6e3e574.svg"
  },
  "/_nuxt/trg-capital.8ca5854f.png": {
    "type": "image/png",
    "etag": "\"f529-0GlDxXNRiG+gopYFgpHlZp7tshg\"",
    "mtime": "2022-10-26T01:34:10.188Z",
    "size": 62761,
    "path": "../public/_nuxt/trg-capital.8ca5854f.png"
  },
  "/_nuxt/useAsset.0b9fe4d9.js": {
    "type": "application/javascript",
    "etag": "\"4d4f-vSUbMs0RkrWWLBaeuKo2a0VA0uM\"",
    "mtime": "2022-10-26T01:34:10.188Z",
    "size": 19791,
    "path": "../public/_nuxt/useAsset.0b9fe4d9.js"
  },
  "/_nuxt/warburg-serres.5bba9656.png": {
    "type": "image/png",
    "etag": "\"6e91-5Qi0LVZbYobyaLKzj0UGBeMUbIk\"",
    "mtime": "2022-10-26T01:34:10.187Z",
    "size": 28305,
    "path": "../public/_nuxt/warburg-serres.5bba9656.png"
  },
  "/_nuxt/welcome-astronaut.7a7e480a.svg": {
    "type": "image/svg+xml",
    "etag": "\"cb02c-GbNiyPxenPz1CElxX2vHvo9AgGc\"",
    "mtime": "2022-10-26T01:34:10.187Z",
    "size": 831532,
    "path": "../public/_nuxt/welcome-astronaut.7a7e480a.svg"
  },
  "/_nuxt/welcome-community-members.de48ad91.svg": {
    "type": "image/svg+xml",
    "etag": "\"1648-5G43smuIdpPrj6fG/nH2G3vygtY\"",
    "mtime": "2022-10-26T01:34:10.186Z",
    "size": 5704,
    "path": "../public/_nuxt/welcome-community-members.de48ad91.svg"
  },
  "/_nuxt/welcome-dapps.d08f4d68.svg": {
    "type": "image/svg+xml",
    "etag": "\"f5c-HExQAn+rdgcSfKVFVFL1oS75OUc\"",
    "mtime": "2022-10-26T01:34:10.186Z",
    "size": 3932,
    "path": "../public/_nuxt/welcome-dapps.d08f4d68.svg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size) {
    event.res.setHeader("Content-Length", asset.size);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_sDAE9N = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_sDAE9N, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_sDAE9N, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
