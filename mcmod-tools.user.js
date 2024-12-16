// ==UserScript==
// @name         MC百科 - 便捷工具
// @namespace    https://github.com/ifover/UserScript
// @version      0.1
// @author       ifover
// @description  在MC百科首页显示收藏列表，方便导航
// @license      GPL-3.0 License
// @icon         https://www.mcmod.cn/images/favicon.ico
// @match        https://*.mcmod.cn/
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

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(" #app{background-color:#e9e9e9;font-size:12px;position:fixed;left:10px;top:286px;border-radius:4px;z-index:10}.ant-tree{background-color:transparent}.ant-tree-title a{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:230px}.ant-tree-treenode.ant-tree-treenode-switcher-close,.ant-tree-treenode.ant-tree-treenode-switcher-open,.ant-tree-treenode.ant-tree-treenode-disabled{position:sticky;top:0;z-index:10;background-color:#e9e9e9}.ant-tree-treenode.ant-tree-treenode-disabled{top:28px}#app[data-v-8268fb43]{background-color:#e9e9e9;font-size:12px;position:fixed;left:10px;top:286px;border-radius:4px;z-index:10}.ant-tree[data-v-8268fb43]{background-color:transparent}.ant-tree-title a[data-v-8268fb43]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:230px}.ant-tree-treenode.ant-tree-treenode-switcher-close[data-v-8268fb43],.ant-tree-treenode.ant-tree-treenode-switcher-open[data-v-8268fb43],.ant-tree-treenode.ant-tree-treenode-disabled[data-v-8268fb43]{position:sticky;top:0;z-index:10;background-color:#e9e9e9}.ant-tree-treenode.ant-tree-treenode-disabled[data-v-8268fb43]{top:28px}.mm_tools[data-v-8268fb43]{width:362px;padding:6px 8px;max-height:520px;overflow-y:scroll}.mm_tools .mm_mask[data-v-8268fb43]{width:calc(100% - 8px);height:6px;position:absolute;left:0;right:0;top:0;z-index:11;border-radius:4px 4px 0 0;background-color:#e9e9e9}.mm_tools[data-v-8268fb43]::-webkit-scrollbar{width:8px}.mm_tools[data-v-8268fb43]::-webkit-scrollbar-thumb{border-radius:8px;background-color:#c1c1c1}.mm_tools[data-v-8268fb43]::-webkit-scrollbar-track{background-color:#f1f1f1;border-radius:0 8px 8px 0}.cover[data-v-8268fb43]{width:60px;opacity:.77;margin-right:6px}.mm_fav_li[data-v-8268fb43]{display:flex;align-items:center;padding:2px 0}.mm_fav_title[data-v-8268fb43]{width:230px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis} ");

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
  const _hoisted_1 = { class: "mm_tools" };
  const _hoisted_2 = { class: "mm_fav_list" };
  const _hoisted_3 = ["href", "title"];
  const _hoisted_4 = { class: "mm_fav_li" };
  const _hoisted_5 = ["src", "alt"];
  const _hoisted_6 = { class: "mm_fav_title" };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const userStore = useUserStore();
      vue.reactive([]);
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
        nodeList.forEach((n) => {
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
            modPackCount,
            isLeaf: modCount === 0 && modPackCount === 0
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
                isLeaf: true
              });
            });
          };
          if (modCount) {
            modArr.push({
              title: `模组 (${modCount})`,
              disabled: true,
              isLeaf: true
            });
            await getFavList("class");
          }
          if (modPackCount) {
            modArr.push({
              title: `整合包 (${modPackCount})`,
              disabled: true,
              isLeaf: true
            });
            await getFavList("modpack");
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
        console.log(sKeys);
        expandedKeys.value = sKeys;
      };
      return (_ctx, _cache) => {
        const _component_a_tree = vue.resolveComponent("a-tree");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          _cache[2] || (_cache[2] = vue.createElementVNode("div", { class: "mm_mask" }, null, -1)),
          vue.createElementVNode("div", _hoisted_2, [
            vue.createVNode(_component_a_tree, {
              expandedKeys: expandedKeys.value,
              "onUpdate:expandedKeys": _cache[0] || (_cache[0] = ($event) => expandedKeys.value = $event),
              selectedKeys: selectedKeys.value,
              "onUpdate:selectedKeys": _cache[1] || (_cache[1] = ($event) => selectedKeys.value = $event),
              blockNode: true,
              "show-line": false,
              "show-icon": false,
              selectable: false,
              "tree-data": vue.unref(treeFavData),
              "load-data": onLoadData,
              onSelect: handleTreeSelect
            }, {
              title: vue.withCtx(({ title, key, modPic, modURL }) => [
                modURL ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  target: "_blank",
                  href: modURL,
                  title
                }, [
                  vue.createElementVNode("div", _hoisted_4, [
                    modPic ? (vue.openBlock(), vue.createElementBlock("img", {
                      key: 0,
                      class: "cover",
                      src: modPic,
                      alt: title
                    }, null, 8, _hoisted_5)) : vue.createCommentVNode("", true),
                    vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(title), 1)
                  ])
                ], 8, _hoisted_3)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createTextVNode(vue.toDisplayString(title), 1)
                ], 64))
              ]),
              _: 1
            }, 8, ["expandedKeys", "selectedKeys", "tree-data"])
          ])
        ]);
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
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8268fb43"]]);
  const app = vue.createApp(App);
  const pinia = pinia$1.createPinia();
  app.use(pinia);
  app.use(antDesignVue.Tree);
  app.mount(
    (() => {
      const nodeDiv = document.createElement("div");
      nodeDiv.id = "app";
      document.body.append(nodeDiv);
      return nodeDiv;
    })()
  );

})(Vue, Pinia, antd);