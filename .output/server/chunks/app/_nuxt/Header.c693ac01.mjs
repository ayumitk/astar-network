import { useSSRContext, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, Transition, defineComponent, Teleport } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderTeleport } from 'vue/server-renderer';
import { D as _imports_0$4, F as _sfc_main$k, E as __nuxt_component_3$2, i as _export_sfc } from '../server.mjs';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    class: "w-6 h-6"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/Bars3.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    class: "w-6 h-6"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/XMark.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileNav",
  __ssrInlineRender: true,
  props: {
    network: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconBars3 = __nuxt_component_0;
      const _component_IconXMark = __nuxt_component_1$1;
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      const _component_Button = _sfc_main$k;
      _push(ssrRenderComponent(unref(Popover), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md p-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="sr-only"${_scopeId2}>Open menu</span>`);
                  _push3(ssrRenderComponent(_component_IconBars3, {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", { class: "sr-only" }, "Open menu"),
                    createVNode(_component_IconBars3, {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(unref(PopoverPanel), {
                focus: "",
                class: "absolute inset-x-0 top-0 z-50 origin-top-right transform transition"
              }, {
                default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<div class="bg-space-gray-dark shadow-lg min-h-screen"${_scopeId2}><div class="flex items-center justify-between px-4 py-5 sm:px-6 sm:py-8"${_scopeId2}><div${_scopeId2}><img class="h-10 w-auto sm:h-14"${ssrRenderAttr("src", _imports_0$4)} alt="Astar Network"${_scopeId2}></div><div class="-mr-2 sm:mr-0"${_scopeId2}>`);
                    _push4(ssrRenderComponent(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md p-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white" }, {
                      default: withCtx((_3, _push5, _parent4, _scopeId3) => {
                        if (_push5) {
                          _push5(`<span class="sr-only"${_scopeId3}>Close menu</span>`);
                          _push5(ssrRenderComponent(_component_IconXMark, {
                            class: "h-6 w-6",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("span", { class: "sr-only" }, "Close menu"),
                            createVNode(_component_IconXMark, {
                              class: "h-6 w-6",
                              "aria-hidden": "true"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push4(`</div></div><nav class=""${_scopeId2}><ul class="border-b border-gray-600"${_scopeId2}><li${_scopeId2}><a href="/developers" class="text-white block border-t border-gray-600 px-6 py-5"${_scopeId2}>Developers</a></li><li${_scopeId2}><a href="#" class="text-white block border-t border-gray-600 px-6 py-5"${_scopeId2}>Network</a><ul class="px-6 py-4 text-sm"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.network, (item) => {
                      _push4(`<li class="mb-6"${_scopeId2}><span class="uppercase block border-b border-gray-600 text-gray-400 pb-1 mb-3"${_scopeId2}>${ssrInterpolate(item.label)}</span><ul${_scopeId2}><!--[-->`);
                      ssrRenderList(item.nav, (nav) => {
                        _push4(`<li${_scopeId2}><a class="inline-block py-2 text-white hover:underline transition hover:text-space-cyan-lighter"${ssrRenderAttr("href", nav.href)} target="_blank" rel="noopener"${_scopeId2}>${ssrInterpolate(nav.label)} `);
                        _push4(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-4 h-4 inline-block stroke-2" }, null, _parent3, _scopeId2));
                        _push4(`</a></li>`);
                      });
                      _push4(`<!--]--></ul></li>`);
                    });
                    _push4(`<!--]--></ul></li><li${_scopeId2}><a href="/community" class="text-white block border-t border-gray-600 px-6 py-5"${_scopeId2}>Community</a></li><li${_scopeId2}><a href="#" class="text-white block border-t border-gray-600 px-6 py-5"${_scopeId2}>Ecosystem</a></li></ul><div class="py-12 px-6"${_scopeId2}>`);
                    _push4(ssrRenderComponent(_component_Button, {
                      href: "https://portal.astar.network/",
                      target: "_blank",
                      rel: "noopener",
                      size: "lg",
                      class: "w-full"
                    }, {
                      default: withCtx((_3, _push5, _parent4, _scopeId3) => {
                        if (_push5) {
                          _push5(` Launch App `);
                          _push5(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 ml-1 stroke-2" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createTextVNode(" Launch App "),
                            createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 ml-1 stroke-2" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push4(`</div></nav></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "bg-space-gray-dark shadow-lg min-h-screen" }, [
                        createVNode("div", { class: "flex items-center justify-between px-4 py-5 sm:px-6 sm:py-8" }, [
                          createVNode("div", null, [
                            createVNode("img", {
                              class: "h-10 w-auto sm:h-14",
                              src: _imports_0$4,
                              alt: "Astar Network"
                            })
                          ]),
                          createVNode("div", { class: "-mr-2 sm:mr-0" }, [
                            createVNode(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md p-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white" }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "sr-only" }, "Close menu"),
                                createVNode(_component_IconXMark, {
                                  class: "h-6 w-6",
                                  "aria-hidden": "true"
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("nav", { class: "" }, [
                          createVNode("ul", { class: "border-b border-gray-600" }, [
                            createVNode("li", null, [
                              createVNode("a", {
                                href: "/developers",
                                class: "text-white block border-t border-gray-600 px-6 py-5"
                              }, "Developers")
                            ]),
                            createVNode("li", null, [
                              createVNode("a", {
                                href: "#",
                                class: "text-white block border-t border-gray-600 px-6 py-5"
                              }, "Network"),
                              createVNode("ul", { class: "px-6 py-4 text-sm" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.network, (item) => {
                                  return openBlock(), createBlock("li", { class: "mb-6" }, [
                                    createVNode("span", { class: "uppercase block border-b border-gray-600 text-gray-400 pb-1 mb-3" }, toDisplayString(item.label), 1),
                                    createVNode("ul", null, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.nav, (nav) => {
                                        return openBlock(), createBlock("li", null, [
                                          createVNode("a", {
                                            class: "inline-block py-2 text-white hover:underline transition hover:text-space-cyan-lighter",
                                            href: nav.href,
                                            target: "_blank",
                                            rel: "noopener"
                                          }, [
                                            createTextVNode(toDisplayString(nav.label) + " ", 1),
                                            createVNode(_component_IconArrowTopRightOnSquare, { class: "w-4 h-4 inline-block stroke-2" })
                                          ], 8, ["href"])
                                        ]);
                                      }), 256))
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ]),
                            createVNode("li", null, [
                              createVNode("a", {
                                href: "/community",
                                class: "text-white block border-t border-gray-600 px-6 py-5"
                              }, "Community")
                            ]),
                            createVNode("li", null, [
                              createVNode("a", {
                                href: "#",
                                class: "text-white block border-t border-gray-600 px-6 py-5"
                              }, "Ecosystem")
                            ])
                          ]),
                          createVNode("div", { class: "py-12 px-6" }, [
                            createVNode(_component_Button, {
                              href: "https://portal.astar.network/",
                              target: "_blank",
                              rel: "noopener",
                              size: "lg",
                              class: "w-full"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Launch App "),
                                createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 ml-1 stroke-2" })
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, "body", false, _parent2);
          } else {
            return [
              createVNode(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md p-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white" }, {
                default: withCtx(() => [
                  createVNode("span", { class: "sr-only" }, "Open menu"),
                  createVNode(_component_IconBars3, {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  })
                ]),
                _: 1
              }),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                createVNode(Transition, {
                  "enter-active-class": "duration-200 ease-out",
                  "enter-from-class": "opacity-0 scale-95",
                  "enter-to-class": "opacity-100 scale-100",
                  "leave-active-class": "duration-100 ease-in",
                  "leave-from-class": "opacity-100 scale-100",
                  "leave-to-class": "opacity-0 scale-95"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(PopoverPanel), {
                      focus: "",
                      class: "absolute inset-x-0 top-0 z-50 origin-top-right transform transition"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "bg-space-gray-dark shadow-lg min-h-screen" }, [
                          createVNode("div", { class: "flex items-center justify-between px-4 py-5 sm:px-6 sm:py-8" }, [
                            createVNode("div", null, [
                              createVNode("img", {
                                class: "h-10 w-auto sm:h-14",
                                src: _imports_0$4,
                                alt: "Astar Network"
                              })
                            ]),
                            createVNode("div", { class: "-mr-2 sm:mr-0" }, [
                              createVNode(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md p-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "sr-only" }, "Close menu"),
                                  createVNode(_component_IconXMark, {
                                    class: "h-6 w-6",
                                    "aria-hidden": "true"
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("nav", { class: "" }, [
                            createVNode("ul", { class: "border-b border-gray-600" }, [
                              createVNode("li", null, [
                                createVNode("a", {
                                  href: "/developers",
                                  class: "text-white block border-t border-gray-600 px-6 py-5"
                                }, "Developers")
                              ]),
                              createVNode("li", null, [
                                createVNode("a", {
                                  href: "#",
                                  class: "text-white block border-t border-gray-600 px-6 py-5"
                                }, "Network"),
                                createVNode("ul", { class: "px-6 py-4 text-sm" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.network, (item) => {
                                    return openBlock(), createBlock("li", { class: "mb-6" }, [
                                      createVNode("span", { class: "uppercase block border-b border-gray-600 text-gray-400 pb-1 mb-3" }, toDisplayString(item.label), 1),
                                      createVNode("ul", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.nav, (nav) => {
                                          return openBlock(), createBlock("li", null, [
                                            createVNode("a", {
                                              class: "inline-block py-2 text-white hover:underline transition hover:text-space-cyan-lighter",
                                              href: nav.href,
                                              target: "_blank",
                                              rel: "noopener"
                                            }, [
                                              createTextVNode(toDisplayString(nav.label) + " ", 1),
                                              createVNode(_component_IconArrowTopRightOnSquare, { class: "w-4 h-4 inline-block stroke-2" })
                                            ], 8, ["href"])
                                          ]);
                                        }), 256))
                                      ])
                                    ]);
                                  }), 256))
                                ])
                              ]),
                              createVNode("li", null, [
                                createVNode("a", {
                                  href: "/community",
                                  class: "text-white block border-t border-gray-600 px-6 py-5"
                                }, "Community")
                              ]),
                              createVNode("li", null, [
                                createVNode("a", {
                                  href: "#",
                                  class: "text-white block border-t border-gray-600 px-6 py-5"
                                }, "Ecosystem")
                              ])
                            ]),
                            createVNode("div", { class: "py-12 px-6" }, [
                              createVNode(_component_Button, {
                                href: "https://portal.astar.network/",
                                target: "_blank",
                                rel: "noopener",
                                size: "lg",
                                class: "w-full"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Launch App "),
                                  createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 ml-1 stroke-2" })
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MobileNav.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2.5",
    stroke: "currentColor",
    class: "w-6 h-6"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/ChevronDown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const network = [
      {
        label: "Explorer",
        nav: [
          { label: "Subscan", href: "https://astar.subscan.io/" },
          { label: "Blockscout", href: "https://blockscout.com/astar/" }
        ]
      },
      {
        label: "Status",
        nav: [
          {
            label: "DApp Staking",
            href: "https://portal.astar.network/#/astar/dapp-staking/discover"
          },
          { label: "DeFi TVL", href: "https://defillama.com/chain/Astar" },
          {
            label: "Applications",
            href: "https://dappradar.com/rankings/protocol/astar"
          }
        ]
      },
      {
        label: "Infrastructure",
        nav: [
          { label: "Alchemy", href: "https://www.alchemy.com/astar" },
          {
            label: "Blockdeamon",
            href: "https://blockdaemon.com/protocols/astar/"
          },
          {
            label: "Bware Labs",
            href: "https://blastapi.io/"
          },
          {
            label: "OnFinality",
            href: "https://www.onfinality.io/marketplace/astar"
          }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MobileNav = _sfc_main$2;
      const _component_IconChevronDown = __nuxt_component_1;
      const _component_Button = _sfc_main$k;
      const _component_IconArrowTopRightOnSquare = __nuxt_component_3$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div class="pointer-events-none absolute inset-0 z-30" aria-hidden="true"></div>`);
      _push(ssrRenderComponent(unref(Popover), null, {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([
              open ? "bg-space-gray-dark shadow-lg bg-opacity-95" : "",
              "transition absolute z-40 w-full"
            ])}"${_scopeId}><div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-8 md:space-x-10 lg:px-8"${_scopeId}><a href="/" class="flex"${_scopeId}><span class="sr-only"${_scopeId}>Astar Network</span><img class="h-10 w-auto sm:h-14"${ssrRenderAttr("src", _imports_0$4)} alt="Astar Network"${_scopeId}></a><div class="-my-2 -mr-2 lg:hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MobileNav, { network }, null, _parent2, _scopeId));
            _push2(`</div><div class="hidden lg:flex lg:items-center"${_scopeId}><nav class="flex space-x-10"${_scopeId}><a href="/developers" class="nav-item"${_scopeId}>Developers</a>`);
            _push2(ssrRenderComponent(unref(PopoverButton), {
              class: [
                open ? "text-space-cyan-light" : "text-white hover:text-space-cyan-light",
                "group inline-flex items-center focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium transition"
              ]
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Network</span>`);
                  _push3(ssrRenderComponent(_component_IconChevronDown, {
                    class: [
                      open ? "text-space-cyan-light" : "text-gray-200",
                      "ml-2 h-5 w-5 group-hover:text-space-cyan-light"
                    ],
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Network"),
                    createVNode(_component_IconChevronDown, {
                      class: [
                        open ? "text-space-cyan-light" : "text-gray-200",
                        "ml-2 h-5 w-5 group-hover:text-space-cyan-light"
                      ],
                      "aria-hidden": "true"
                    }, null, 8, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<a href="/community" class="nav-item"${_scopeId}>Community</a><a href="#" class="nav-item"${_scopeId}>Ecosystem</a></nav><div class="md:ml-12"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              variant: "outlined",
              href: "https://portal.astar.network/",
              target: "_blank",
              rel: "noopener"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Launch App `);
                  _push3(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 ml-1 stroke-2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Launch App "),
                    createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 ml-1 stroke-2" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(unref(PopoverPanel), { class: "border-t border-gray-600 hidden lg:block" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mx-auto grid max-w-7xl pt-10 pb-24 rounded-3xl px-4 sm:px-6"${_scopeId2}><ul class="grid grid-cols-1 sm:grid-cols-3 gap-12"${_scopeId2}><!--[-->`);
                  ssrRenderList(network, (item) => {
                    _push3(`<li${_scopeId2}><span class="uppercase block border-b border-gray-600 text-gray-400 pb-1 mb-3"${_scopeId2}>${ssrInterpolate(item.label)}</span><ul${_scopeId2}><!--[-->`);
                    ssrRenderList(item.nav, (nav) => {
                      _push3(`<li${_scopeId2}><a class="inline-block py-2 text-white hover:underline transition hover:text-space-cyan-lighter"${ssrRenderAttr("href", nav.href)} target="_blank" rel="noopener"${_scopeId2}>${ssrInterpolate(nav.label)} `);
                      _push3(ssrRenderComponent(_component_IconArrowTopRightOnSquare, { class: "w-4 h-4 inline-block stroke-2" }, null, _parent3, _scopeId2));
                      _push3(`</a></li>`);
                    });
                    _push3(`<!--]--></ul></li>`);
                  });
                  _push3(`<!--]--></ul></div>`);
                } else {
                  return [
                    createVNode("div", { class: "mx-auto grid max-w-7xl pt-10 pb-24 rounded-3xl px-4 sm:px-6" }, [
                      createVNode("ul", { class: "grid grid-cols-1 sm:grid-cols-3 gap-12" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(network, (item) => {
                          return createVNode("li", null, [
                            createVNode("span", { class: "uppercase block border-b border-gray-600 text-gray-400 pb-1 mb-3" }, toDisplayString(item.label), 1),
                            createVNode("ul", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(item.nav, (nav) => {
                                return openBlock(), createBlock("li", null, [
                                  createVNode("a", {
                                    class: "inline-block py-2 text-white hover:underline transition hover:text-space-cyan-lighter",
                                    href: nav.href,
                                    target: "_blank",
                                    rel: "noopener"
                                  }, [
                                    createTextVNode(toDisplayString(nav.label) + " ", 1),
                                    createVNode(_component_IconArrowTopRightOnSquare, { class: "w-4 h-4 inline-block stroke-2" })
                                  ], 8, ["href"])
                                ]);
                              }), 256))
                            ])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: [
                  open ? "bg-space-gray-dark shadow-lg bg-opacity-95" : "",
                  "transition absolute z-40 w-full"
                ]
              }, [
                createVNode("div", { class: "mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-8 md:space-x-10 lg:px-8" }, [
                  createVNode("a", {
                    href: "/",
                    class: "flex"
                  }, [
                    createVNode("span", { class: "sr-only" }, "Astar Network"),
                    createVNode("img", {
                      class: "h-10 w-auto sm:h-14",
                      src: _imports_0$4,
                      alt: "Astar Network"
                    })
                  ]),
                  createVNode("div", { class: "-my-2 -mr-2 lg:hidden" }, [
                    createVNode(_component_MobileNav, { network })
                  ]),
                  createVNode("div", { class: "hidden lg:flex lg:items-center" }, [
                    createVNode("nav", { class: "flex space-x-10" }, [
                      createVNode("a", {
                        href: "/developers",
                        class: "nav-item"
                      }, "Developers"),
                      createVNode(unref(PopoverButton), {
                        class: [
                          open ? "text-space-cyan-light" : "text-white hover:text-space-cyan-light",
                          "group inline-flex items-center focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium transition"
                        ]
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Network"),
                          createVNode(_component_IconChevronDown, {
                            class: [
                              open ? "text-space-cyan-light" : "text-gray-200",
                              "ml-2 h-5 w-5 group-hover:text-space-cyan-light"
                            ],
                            "aria-hidden": "true"
                          }, null, 8, ["class"])
                        ]),
                        _: 2
                      }, 1032, ["class"]),
                      createVNode("a", {
                        href: "/community",
                        class: "nav-item"
                      }, "Community"),
                      createVNode("a", {
                        href: "#",
                        class: "nav-item"
                      }, "Ecosystem")
                    ]),
                    createVNode("div", { class: "md:ml-12" }, [
                      createVNode(_component_Button, {
                        variant: "outlined",
                        href: "https://portal.astar.network/",
                        target: "_blank",
                        rel: "noopener"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Launch App "),
                          createVNode(_component_IconArrowTopRightOnSquare, { class: "w-5 h-5 ml-1 stroke-2" })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode(Transition, {
                  "enter-active-class": "transition ease-out duration-200",
                  "enter-from-class": "opacity-0 -translate-y-1",
                  "enter-to-class": "opacity-100 translate-y-0",
                  "leave-active-class": "transition ease-in duration-150",
                  "leave-from-class": "opacity-100 translate-y-0",
                  "leave-to-class": "opacity-0 -translate-y-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(PopoverPanel), { class: "border-t border-gray-600 hidden lg:block" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mx-auto grid max-w-7xl pt-10 pb-24 rounded-3xl px-4 sm:px-6" }, [
                          createVNode("ul", { class: "grid grid-cols-1 sm:grid-cols-3 gap-12" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(network, (item) => {
                              return createVNode("li", null, [
                                createVNode("span", { class: "uppercase block border-b border-gray-600 text-gray-400 pb-1 mb-3" }, toDisplayString(item.label), 1),
                                createVNode("ul", null, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.nav, (nav) => {
                                    return openBlock(), createBlock("li", null, [
                                      createVNode("a", {
                                        class: "inline-block py-2 text-white hover:underline transition hover:text-space-cyan-lighter",
                                        href: nav.href,
                                        target: "_blank",
                                        rel: "noopener"
                                      }, [
                                        createTextVNode(toDisplayString(nav.label) + " ", 1),
                                        createVNode(_component_IconArrowTopRightOnSquare, { class: "w-4 h-4 inline-block stroke-2" })
                                      ], 8, ["href"])
                                    ]);
                                  }), 256))
                                ])
                              ]);
                            }), 64))
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Header.c693ac01.mjs.map
