import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/sign-in", "/sign-up"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("userSession");

  if (authRequired && !loggedIn) {
    return next("/sign-in");
  }

  next();
});
