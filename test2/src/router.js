import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home-page',
    component: () =>
        import(
            /*webpackChunkName: "home-page"*/ './components/Home-page.vue'
    ),
  },

  {
    path: '/home',
    name: 'Home-page',
    component: () =>
        import(
            /*webpackChunkName: "home-page"*/ './components/Home-page.vue'
    ),
  },


  {
    path: '/contact',
    name: 'Contact-page',
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
