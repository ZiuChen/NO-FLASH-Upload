import { createRouter, createWebHashHistory } from "vue-router";

import WelcomeIndex from "../components/WelcomePage/WelcomeIndex.vue";
import LessonIndex from "../components/Lesson/LessonIndex.vue";
import LessonInfo from "../components/Lesson/LessonInfo/LessonInfo.vue";
import LessonSubmit from "../components/Lesson/LessonSubmit/LessonSubmit.vue";
import ProfileIndex from "../components/Profile/ProfileIndex.vue";

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
      children: [
        {
          path: "info",
          component: LessonInfo,
        },
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
  ],
});

export default router;
