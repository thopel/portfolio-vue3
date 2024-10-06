import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Projects from "../views/projects/Projects.vue";
import Project from "../views/projects/Project.vue";

const routes = [
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
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/projects/:slug",
    name: "Project",
    component: Project,
    params: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
