import Vue from 'vue';
import VueRouter from 'vue-router';
import SignInView from '@/views/SignInView.vue';
import HomeView from '../views/HomeView.vue';
import TermsAndConditionView from '@/views/TermsAndConditionView.vue';
import AboutView from '@/views/AboutView.vue';
import ContactView from '@/views/ContactView.vue';
import SignUpView from '@/views/SignUpView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

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
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    meta: { title: 'PumBook - Sign-Up' },
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
  {
    path: '/terms',
    name: 'terms',
    component: TermsAndConditionView,
    meta: { title: 'PumBook - Terms and Conditions' },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'PumBook - About' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'PumBook - Contact Us' },
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    meta: { title: 'PumBook - Profile' },
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFoundView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('credentials');
  const allowUnAuthenticatedVisit = ['signin', 'home', 'terms', 'about', 'contact', 'signup'];

  if (!isAuthenticated && !allowUnAuthenticatedVisit.includes(to.name)) {
    if (to.name !== 'signin') {
      console.log("Redirecting to /signin...");
      return next({ name: 'signin' });
    }
  } else if (isAuthenticated && to.name === 'signin') {
    if (from.name !== 'EventList') { // Prevent unnecessary re-redirect
      console.log("Redirecting to /events...");
      return next({ name: 'EventList' });
    }
  }
  document.title = to.meta.title || 'PumBook';
  next();
});

export default router;
