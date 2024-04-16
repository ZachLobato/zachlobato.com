import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Zach Lobato | Home',
        metaTags: [
          {
            name: 'description',
            content: 'Acts as a resume for Zach Lobato. Contains contact links, a portfolio, his philosophy on product, and experience.'
          }
        ]
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Zach Lobato | About',
        metaTags: [
          {
            name: 'description',
            content: 'This is a largely unpublished page about me.'
          }
        ]
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Clear existing meta tags
  document.querySelectorAll('meta[name="description"]').forEach(el => el.remove());

  // Set document title and meta tags for the new route
  to.matched.slice().reverse().forEach(match => {
    if (match.meta && match.meta.title) {
      document.title = match.meta.title;
    }
    if (match.meta && match.meta.metaTags) {
      match.meta.metaTags.forEach(tag => {
        const element = document.querySelector(`meta[name="${tag.name}"]`) || document.createElement('meta');
        element.setAttribute('name', tag.name);
        element.setAttribute('content', tag.content);
        document.head.appendChild(element);
      });
    }
  });

  next();
});

export default router;
