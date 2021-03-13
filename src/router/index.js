/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddData from "../components/AddData.vue";
import UpdateData from "../components/UpdateData.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/add",
    name: "Add",
    component: AddData,
  },
  {
    path: "/update",
    name: "Update",
    component: UpdateData,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
