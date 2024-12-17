// ==UserScript==
// @name         MC百科 - 便捷工具
// @namespace    https://github.com/ifover/UserScript
// @version      0.2
// @author       ifover
// @description  在MC百科首页显示收藏列表，方便导航
// @license      GPL-3.0 License
// @icon         https://www.mcmod.cn/images/favicon.ico
// @match        https://*.mcmod.cn/
// @require      https://kit.fontawesome.com/d4dda3d6cc.js
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.global.prod.js
// @require      https://unpkg.com/vue-demi@latest/lib/index.iife.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://unpkg.com/dayjs/dayjs.min.js
// @require      https://unpkg.com/dayjs/plugin/customParseFormat.js
// @require      https://unpkg.com/dayjs/plugin/weekday.js
// @require      https://unpkg.com/dayjs/plugin/localeData.js
// @require      https://unpkg.com/dayjs/plugin/weekOfYear.js
// @require      https://unpkg.com/dayjs/plugin/weekYear.js
// @require      https://unpkg.com/dayjs/plugin/advancedFormat.js
// @require      https://unpkg.com/dayjs/plugin/quarterOfYear.js
// @require      https://cdn.jsdelivr.net/npm/pinia@2.3.0/dist/pinia.iife.prod.js
// @require      https://unpkg.com/ant-design-vue@4.2.6/dist/antd.min.js
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(" #app,#app[data-v-22dd0357]{width:333px;max-height:520px;cursor:default;background-color:#e9e9e9;font-size:12px;position:fixed;left:10px;top:286px;border-radius:4PX 4px 0 0;z-index:10}.mm_sidebar[data-v-22dd0357]{cursor:pointer;position:fixed;left:-24px}.mm_sidebar[data-v-22dd0357]:hover{left:0;transition:.3s ease-out}.mm_sidebar .mm_sidebar_fav[data-v-22dd0357]{box-sizing:content-box;width:26px;height:26px;font-size:26px;padding:8px;color:#ccc}.mm_header[data-v-22dd0357]{height:24px;border-radius:4px 4px 0 0;background-color:#ccc;padding:0 5px;text-align:right}.mm_header .mm_close[data-v-22dd0357]{cursor:pointer;color:#191919}.mm_content[data-v-22dd0357]{max-height:484px;overflow-y:scroll;padding:6px 8px}.mm_content .mm_fav_li[data-v-22dd0357]{display:flex;align-items:center;padding:2px 0;cursor:pointer}.mm_content .mm_fav_li .mm_fav_cover[data-v-22dd0357]{width:60px;opacity:.77;margin-right:6px}.mm_content .mm_fav_li .mm_fav_title[data-v-22dd0357]{width:182px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[data-v-22dd0357]::-webkit-scrollbar{width:8px}[data-v-22dd0357]::-webkit-scrollbar-thumb{background-color:#c1c1c1}[data-v-22dd0357]::-webkit-scrollbar-track{background-color:#f1f1f1}[data-v-22dd0357] .mm_tree_lv2 .ant-tree-switcher.ant-tree-switcher-noop{width:12px}[data-v-22dd0357] .mm_tree_lv2 .ant-tree-title a{text-decoration:none;cursor:pointer}[data-v-22dd0357] .mm_tree_lv2 .ant-tree-title a:hover *{color:#2575f9}[data-v-22dd0357] .ant-tree{background-color:transparent}[data-v-22dd0357] .ant-tree .ant-tree-title{display:flex;align-items:center}[data-v-22dd0357] .ant-tree .ant-tree-title a{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[data-v-22dd0357] .ant-tree .ant-tree-title .mm_title_icon{font-size:12px;margin-left:5px;color:#888}[data-v-22dd0357] .ant-tree .ant-tree-treenode.ant-tree-treenode-switcher-close,[data-v-22dd0357] .ant-tree .ant-tree-treenode.ant-tree-treenode-switcher-open,[data-v-22dd0357] .ant-tree .ant-tree-treenode.ant-tree-treenode-disabled{position:sticky;top:-6px;z-index:10;background-color:#e9e9e9}[data-v-22dd0357] .ant-tree .ant-tree-treenode.ant-tree-treenode-disabled{top:22px} ");

(function (vue, pinia$1, antDesignVue) {
  'use strict';

  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const useUserStore = pinia$1.defineStore("user", {
    state: () => ({
      userID: "0000"
    }),
    actions: {
      actionUserID(id) {
        this.userID = id;
      }
    }
  });
  const json2FormData = (json) => {
    return Object.keys(json).map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }).join("&");
  };
  const request = (url, data) => {
    const userStore = useUserStore();
    return new Promise((resolve, reject) => {
      _GM_xmlhttpRequest({
        method: "POST",
        url,
        data: json2FormData(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Referer": `https://center.mcmod.cn/${userStore.userID}/`
        },
        responseType: "json",
        onload: (response) => {
          if (response.responseText) {
            resolve(response.response);
          } else {
            reject(response);
          }
        }
      });
    });
  };
  const _hoisted_1 = {
    key: 0,
    class: "mm_sidebar"
  };
  const _hoisted_2 = {
    key: 1,
    class: "mm_header"
  };
  const _hoisted_3 = {
    key: 2,
    class: "mm_content"
  };
  const _hoisted_4 = {
    key: 0,
    class: "fas fa-folder-open"
  };
  const _hoisted_5 = {
    key: 1,
    class: "fas fa-folder"
  };
  const _hoisted_6 = ["href", "title"];
  const _hoisted_7 = { class: "mm_fav_li" };
  const _hoisted_8 = ["src", "alt"];
  const _hoisted_9 = { class: "mm_fav_title" };
  const _hoisted_10 = {
    key: 0,
    title: "模组",
    class: "mm_title_icon"
  };
  const _hoisted_11 = {
    key: 1,
    title: "整合包",
    class: "mm_title_icon"
  };
  const _hoisted_12 = {
    key: 2,
    class: "mm_title_icon"
  };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const userStore = useUserStore();
      vue.reactive([]);
      let modalShow = vue.ref(true);
      const expandedKeys = vue.ref([]);
      const selectedKeys = vue.ref([]);
      let treeFavData = vue.ref([]);
      const getUserID = () => {
        let userUrlNode = document.querySelector(".top-username a");
        if (!userUrlNode) return null;
        let url = userUrlNode.getAttribute("href");
        let arr = url == null ? void 0 : url.match(/\d+/);
        if (arr == null ? void 0 : arr.length) {
          userStore.actionUserID(arr[0]);
        }
      };
      const getFavoriteFold = async () => {
        let u = "https://center.mcmod.cn/frame/CenterFavoriteFold/";
        let d = {
          uid: userStore.userID,
          data: JSON.stringify({})
        };
        let res = {};
        res = await request(u, d);
        let { state, html } = res;
        if (state !== 0) return;
        let node = new DOMParser().parseFromString(html, "text/html");
        let nodeList = node.querySelectorAll(".favorite-fold-list ul > a");
        let _favList = [];
        nodeList.forEach((n, i) => {
          var _a, _b;
          let favID = n.getAttribute("data-id");
          let favName = (_a = n.querySelector('li span[class="title"]')) == null ? void 0 : _a.getAttribute("title");
          let c = (_b = n.querySelector('li span[class="count"]')) == null ? void 0 : _b.getAttribute("title");
          let modCount = 0, modPackCount = 0;
          if (c) {
            c.split(",").forEach((o) => {
              let modMatch = o.match(/(\d+).个模组/);
              if (modMatch && modMatch.length) modCount = parseInt(modMatch[1]);
              let modPackMatch = o.match(/(\d+).个整合包/);
              if (modPackMatch && modPackMatch.length) modPackCount = parseInt(modPackMatch[1]);
            });
          }
          _favList.push({
            key: favID,
            favID,
            favName,
            title: favName,
            // title: `${favName} 模组x${modCount} 整合包x${modPackCount}`,
            modCount,
            modPackCount
            // isLeaf: modCount === 0 && modPackCount === 0,
          });
        });
        treeFavData.value = _favList;
      };
      const onLoadData = (treeNode) => {
        return new Promise(async (resolve) => {
          let { favID, favName, modCount, modPackCount, key, title, children, isLeaf } = treeNode.dataRef;
          if (children) {
            resolve();
            return;
          }
          let modArr = [];
          const getFavList = async (category) => {
            let u = "https://center.mcmod.cn/frame/CenterFavoriteSoltPage/";
            let d = {
              uid: userStore.userID,
              data: JSON.stringify({
                fold: key,
                category
              })
            };
            let res = {};
            res = await request(u, d);
            let { state, html } = res;
            if (state !== 0) return;
            let node = new DOMParser().parseFromString(html, "text/html");
            let nodeList = node.querySelectorAll(".favorite-slot-ul li");
            nodeList.forEach((n) => {
              var _a;
              let modID = n.getAttribute("data-id");
              let modURL = (_a = n.querySelector('span[class="cover"] a')) == null ? void 0 : _a.getAttribute("href");
              let _modInfoNode = n.querySelector('span[class="cover"] img');
              let modPic = _modInfoNode == null ? void 0 : _modInfoNode.getAttribute("src");
              let modName = _modInfoNode == null ? void 0 : _modInfoNode.getAttribute("alt");
              modArr.push({
                title: modName,
                key: modID,
                modPic,
                modURL,
                class: "mm_tree_lv2",
                isLeaf: true
              });
            });
          };
          if (modCount) {
            modArr.push({
              title: `模组 (${modCount})`,
              disabled: true,
              class: "mm_tree_lv2",
              isLeaf: true
            });
            await getFavList("class");
          }
          if (modPackCount) {
            modArr.push({
              title: `整合包 (${modPackCount})`,
              disabled: true,
              class: "mm_tree_lv2",
              isLeaf: true
            });
            await getFavList("modpack");
          }
          if (modCount === 0 && modPackCount === 0) {
            modArr.push({
              title: `这个收藏夹是空的。`,
              disabled: true,
              class: "mm_tree_lv2",
              isLeaf: true
            });
          }
          if (treeNode.dataRef) treeNode.dataRef.children = modArr;
          resolve();
        });
      };
      vue.onMounted(() => {
        getUserID();
        if (!userStore.userID) return;
        getFavoriteFold();
      });
      const handleTreeSelect = (sKeys, info) => {
        expandedKeys.value = sKeys;
      };
      return (_ctx, _cache) => {
        const _component_a_button = vue.resolveComponent("a-button");
        const _component_a_tree = vue.resolveComponent("a-tree");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          !vue.unref(modalShow) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
            vue.createElementVNode("i", {
              class: "fa-solid fa-star mm_sidebar_fav",
              onClick: _cache[0] || (_cache[0] = ($event) => vue.isRef(modalShow) ? modalShow.value = true : modalShow = true)
            })
          ])) : vue.createCommentVNode("", true),
          vue.unref(modalShow) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
            vue.createVNode(_component_a_button, {
              class: "mm_close",
              type: "link",
              size: "small",
              onClick: _cache[1] || (_cache[1] = ($event) => vue.isRef(modalShow) ? modalShow.value = false : modalShow = false)
            }, {
              default: vue.withCtx(() => _cache[4] || (_cache[4] = [
                vue.createElementVNode("i", { class: "fa-solid fa-xmark" }, null, -1)
              ])),
              _: 1
            })
          ])) : vue.createCommentVNode("", true),
          vue.unref(modalShow) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
            vue.createVNode(_component_a_tree, {
              expandedKeys: expandedKeys.value,
              "onUpdate:expandedKeys": _cache[2] || (_cache[2] = ($event) => expandedKeys.value = $event),
              selectedKeys: selectedKeys.value,
              "onUpdate:selectedKeys": _cache[3] || (_cache[3] = ($event) => selectedKeys.value = $event),
              blockNode: true,
              "show-line": false,
              "show-icon": false,
              selectable: false,
              "tree-data": vue.unref(treeFavData),
              "load-data": onLoadData,
              onSelect: handleTreeSelect
            }, {
              switcherIcon: vue.withCtx(({ expanded }) => [
                expanded ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_4)) : (vue.openBlock(), vue.createElementBlock("i", _hoisted_5))
              ]),
              title: vue.withCtx(({ title, key, modPic, modURL, modCount, modPackCount }) => [
                modURL ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  target: "_blank",
                  href: modURL,
                  title
                }, [
                  vue.createElementVNode("div", _hoisted_7, [
                    modPic ? (vue.openBlock(), vue.createElementBlock("img", {
                      key: 0,
                      class: "mm_fav_cover",
                      src: modPic,
                      alt: title
                    }, null, 8, _hoisted_8)) : vue.createCommentVNode("", true),
                    vue.createElementVNode("span", _hoisted_9, vue.toDisplayString(title), 1)
                  ])
                ], 8, _hoisted_6)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createElementVNode("span", null, vue.toDisplayString(title), 1),
                  modCount ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, [
                    _cache[5] || (_cache[5] = vue.createElementVNode("i", { class: "fa fa-cubes" }, null, -1)),
                    vue.createTextVNode(" x" + vue.toDisplayString(modCount), 1)
                  ])) : vue.createCommentVNode("", true),
                  modPackCount ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_11, [
                    _cache[6] || (_cache[6] = vue.createElementVNode("i", { class: "fa fa-file-zip-o" }, null, -1)),
                    vue.createTextVNode(" x" + vue.toDisplayString(modPackCount), 1)
                  ])) : vue.createCommentVNode("", true),
                  modCount === 0 && modPackCount === 0 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_12, "空收藏夹")) : vue.createCommentVNode("", true)
                ], 64))
              ]),
              _: 1
            }, 8, ["expandedKeys", "selectedKeys", "tree-data"])
          ])) : vue.createCommentVNode("", true)
        ], 64);
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
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-22dd0357"]]);
  const app = vue.createApp(App);
  const pinia = pinia$1.createPinia();
  app.use(pinia);
  app.use(antDesignVue.Button);
  app.use(antDesignVue.Tree);
  const appScroll = (nodeDiv) => {
    const node = document.querySelector(".center .main .news_block");
    if (node) {
      let top = node.getBoundingClientRect().top;
      let _top = 0;
      switch (true) {
        case (top >= 60 && top <= 270):
          _top = top;
          break;
        case top < 60:
          _top = 70;
          break;
        case top > 270:
          _top = 286;
          break;
      }
      nodeDiv.style.top = `${_top}px`;
    }
  };
  app.mount(
    (() => {
      const nodeDiv = document.createElement("div");
      nodeDiv.id = "app";
      document.body.append(nodeDiv);
      appScroll(nodeDiv);
      window.addEventListener("scroll", function() {
        appScroll(nodeDiv);
      });
      return nodeDiv;
    })()
  );

})(Vue, Pinia, antd);