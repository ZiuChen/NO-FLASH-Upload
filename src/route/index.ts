import { createRouter, createWebHashHistory } from "vue-router";

import welcome from "../components/WelcomePage/WelcomeIndex.vue";
import lesson from "../components/Lesson/LessonIndex.vue";
import profile from "../components/Profile/ProfileMain.vue";
import lessonIndex from "../components/Lesson/LessonIndex.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/welcome" },
    {
      path: "/welcome",
      component: welcome,
    },
    {
      path: "/lesson-:lid",
      component: lesson,
      children: [
        {
          path: "main",
          component: lessonIndex,
        },
      ],
    },
    {
      path: "/profile",
      component: profile,
    },
  ],
});

export default router;
