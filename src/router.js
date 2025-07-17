import { createRouter, createWebHistory } from 'vue-router';

// Public Pages
import HomePage from './pages/HomePage.vue';
import AboutPage from './pages/AboutPage.vue';
import LoginPage from './pages/LoginPage.vue';
import SignupPage from './pages/SignupPage.vue';

// Private Pages
import DashboardPage from './pages/DashboardPage.vue';
import EventsPage from './pages/EventsPage.vue';
import EventCreatePage from './pages/EventCreatePage.vue';
import EventDetailPage from './pages/EventDetailPage.vue';
import CheckInPage from './pages/CheckInPage.vue';
import ProfilePage from './pages/ProfilePage.vue';


// Layouts
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue';

// Simple auth guard
const requireAuth = (to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (isAuthenticated) {
    next(); // proceed to requested route
  } else {
    // Redirect to login with a query param to remember the original destination
    next({ 
      path: '/login', 
      query: { redirect: to.fullPath } 
    });
  }
};


const routes = [
  // Public routes
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
    meta: { requiresAuth: false }
  },
  
  // Protected routes with authenticated layout
  {
    path: '/',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true },
        beforeEnter: requireAuth
      },
      {
        path: '/events',
        name: 'Events',
        component: EventsPage,
        meta: { requiresAuth: true },
        beforeEnter: requireAuth
      },
      {
        path: "/events/:id",
        name: "EventDetail",
        component: EventDetailPage,
        meta: { requiresAuth: true },
        beforeEnter: requireAuth,
      },
      {
        path: '/events/create',
        name: 'EventCreate',
        component: EventCreatePage,
        meta: { requiresAuth: true },
        beforeEnter: requireAuth
      },
      {
        path: '/check-in',
        name: 'CheckIn',
        component: CheckInPage,
        meta: { requiresAuth: true },
        beforeEnter: requireAuth
      },
      {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: true },
        beforeEnter: requireAuth
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top when navigating
    return { top: 0 };
  }
});

export default router;
