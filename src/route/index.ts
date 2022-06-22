import { createRouter, createWebHashHistory } from "vue-router";

import WelcomeIndex from "../components/WelcomePage/WelcomeIndex.vue";
import LessonIndex from "../components/Lesson/LessonIndex.vue";
import LessonSubmit from "../components/Lesson/LessonSubmit/LessonSubmit.vue";
import ProfileIndex from "../components/Profile/ProfileIndex.vue";
import AboutIndex from "../components/About/AboutIndex.vue";
import PluginsIndex from "../components/Plugins/PluginsIndex.vue";

import API from "../request/API";
import log from "../ts/Log";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/welcome" },
    {
      path: "/welcome",
      component: WelcomeIndex,
    },
    {
      path: "/lesson/:lid",
      component: LessonIndex,
      redirect: (to) => {
        return `${to.path}/info`;
      },
      children: [
        {
          path: "submit/:hwtid",
          component: LessonSubmit,
        },
      ],
    },
    {
      path: "/profile",
      component: ProfileIndex,
    },
    {
      path: "/about",
      component: AboutIndex,
    },
    {
      path: "/plugins",
      component: PluginsIndex,
    },
  ],
});

router.beforeEach((to, from, next) => {
  API.getLoginStatus();
  if (to.matched.length === 0) {
    // no match
    log("router.beforeEach", `未找到界面，重定向`, `warning`);
    from.name ? next({ name: from.name }) : next("/");
    ElMessage({
      type: "error",
      message: "未找到页面",
    });
  } else {
    // matched
    next();
  }
});

export default router;
