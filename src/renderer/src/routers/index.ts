import {createWebHashHistory, createRouter} from "vue-router";

// 模式的描述
const tvSeriesModeInfo = '电视剧模式用于批量重命名文件，适用于电视剧集文件的统一命名规则。该模式可以自动为每一集的文件添加季号、集数，并将其重命名为指定格式。'
const replaceTextModeInfo = '替换文本模式用于将文件名中已有的文本替换成新的文本。该模式非常适用于批量修正文件名中的错误文本或按用户需求修改文件名中的特定部分。'
const insertTextModeInfo = '插入文本模式用于在文件名的指定位置插入自定义文本。该模式允许用户在文件名的开始或结尾插入文本，灵活地修改文件名结构。'

const routes = [
  {path: "/", redirect: "/layouts/tvSeriesMode"},
  {
    path: "/layouts", component: () => import("@renderer/layouts/index.vue"),
    children: [
      {
        path: "tvSeriesMode",
        name: "tvSeriesMode",
        component: () => import("@renderer/views/tvSeriesMode/index.vue"),
        meta: {title: "电视剧集模式", modeInfo: tvSeriesModeInfo, icon: "VideoCamera", isMenu: true}
      },
      {
        path: "replaceTextMode",
        name: "replaceTextMode",
        component: () => import("@renderer/views/replaceTextMode/index.vue"),
        meta: {title: "替换文本模式", modeInfo: replaceTextModeInfo, icon: "DocumentCopy", isMenu: true}
      },
      {
        path: "insertTextMode",
        name: "insertTextMode",
        component: () => import("@renderer/views/insertTextMode/index.vue"),
        meta: {title: "插入文本模式", modeInfo: insertTextModeInfo, icon: "DocumentRemove", isMenu: true}
      }

    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
