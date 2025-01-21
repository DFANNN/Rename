import { createWebHashHistory, createRouter } from "vue-router";


const routes = [
  { path: "/", redirect: "/layouts/a" },
  {
    path: "/layouts", component: () => import("@renderer/layouts/index.vue"),
    children: [
      {
        path: "a",
        component: () => import("@renderer/views/a/index.vue"),
        meta: { title: "替换文本", icon: "Tools", isMenu: true }
      },
      {
        path: "b",
        component: () => import("@renderer/views/b/index.vue"),
        meta: { title: "插入文本", icon: "Management", isMenu: true }
      },
      {
        path: "c",
        component: () => import("@renderer/views/c/index.vue"),
        meta: { title: "索引文本", icon: "Platform", isMenu: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
