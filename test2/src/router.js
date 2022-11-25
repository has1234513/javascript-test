import { createRouter, createWebHistory } from 'vue-router';

const routes = [

  {
    path: '/home',
    name: 'home-page',
    component: () =>
        import(
            /*webpackChunkName: "home-page"*/ './components/Home-page.vue'
    ),
  },

  {
    path: '/contact',
    name: 'contact-page',
    component: () =>
        import(
            /*webpackChunkName: "contact-page"*/ './components/Contact-page.vue'
    ),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
