import { createRouter, createWebHashHistory } from "vue-router";

import welcome from "../components/WelcomePage/WelcomeMain.vue";
import lesson from "../components/Lesson/LessonMain.vue";
import profile from "../components/Profile/ProfileMain.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/welcome" },
    {
      path: "/welcome",
      component: welcome,
    },
    {
      path: "/lesson-:id",
      component: lesson,
    },
    {
      path: "/profile",
      component: profile,
    },
  ],
});

export default router;
