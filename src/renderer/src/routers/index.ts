import { createWebHashHistory, createRouter } from "vue-router";


const routes = [
  { path: "/", redirect: "/layouts/tvSeriesMode" },
  {
    path: "/layouts", component: () => import("@renderer/layouts/index.vue"),
    children: [
      {
        path: "tvSeriesMode",
        component: () => import("@renderer/views/tvSeriesMode/index.vue"),
        meta: { title: "电视剧模式", icon: "VideoCamera", isMenu: true }
      },
      {
        path: "b",
        component: () => import("@renderer/views/c/index.vue"),
        meta: { title: "替换文本模式", icon: "DocumentRemove", isMenu: true }
      },
      {
        path: "c",
        component: () => import("@renderer/views/b/index.vue"),
        meta: { title: "插入文本模式", icon: "DocumentCopy", isMenu: true }
      }

    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
