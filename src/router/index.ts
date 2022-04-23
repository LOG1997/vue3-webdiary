import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Editor from "../views/Editor.vue";
const routes = [
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/editor",
    name: "Editor",
    component: Editor,
  },
  {
    path: "/content",
    name: "Content",
    component: () => import("../views/Content.vue"),
  },
  {
    path: "/newcontent",
    name: "NewContent",
    component: () => import("../views/NewContent.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
