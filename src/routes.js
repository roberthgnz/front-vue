import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import Account from "./pages/Account.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
  { path: "/account", component: Account },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
