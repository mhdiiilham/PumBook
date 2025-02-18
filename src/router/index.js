import Vue from 'vue';
import VueRouter from 'vue-router';
import SignInView from '@/views/SignInView.vue';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'PumBook - Digital Guest Book for Special Moments' },
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInView,
    meta: { title: 'PumBook - Sign-In' },
  },
  {
    path: '/events',
    name: 'EventList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "event" */ '../views/EventView.vue'),
    meta: { title: 'PumBook - Event' },
  },
  {
    path: '/events/create',
    name: 'eventCreate',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "eventCreate" */ '../views/EventCreateView.vue'),
    meta: { title: 'PumBook - Create new event' },
  },
  {
    path: '/events/:id',
    name: 'eventDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "eventDetail" */ '../views/EventDetailView.vue'),
  },
  {
    path: '/events/:id/checkin',
    name: 'checkIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "checkIn" */ '../views/EventCheckInPage.vue'),
    meta: { title: 'PumBook - Check In' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('credentials');

  if (!isAuthenticated && to.name !== 'signin' && to.name !== 'home') {
    document.title = to.meta.title || 'PumBook'; // Default title
    next({ name: 'signin' });
  } else {
    document.title = to.meta.title || 'PumBook'; // Default title
    next();
  }
});

export default router;
