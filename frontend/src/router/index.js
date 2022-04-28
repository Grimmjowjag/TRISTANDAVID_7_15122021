import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {
      title: 'Connexion'
    }
  },

  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (actuality.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    // Le naviguation guard empêche l'accès aux pages sans authentification
    beforeEnter: (to, from, next) => {
      if(store.state.user.userId == -1) {
        next("/")
      } else {
        next()
      }
    },
    meta: {
      title: 'Fil actualité'
    }
  },

  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {
      title: 'Publications'
    }
  },

  {
    path: '/comment/:postId',
    name: 'Comment',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {
      title: 'Commentaires'
    }
  },

  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.user.userId == -1) {
        next("/")
      } else {
        next()
      }
    },
    props: true,
    meta: {
      title: 'Profil'
    }
  },

  {
    path: '/profile/all',
    name: 'allProfile',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {
      title: 'Tous les utilisateurs'
    }
  },

  // NotFound va gérer les cas où une route n'existe pas
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFoundView.vue'),
    meta: {
      title: '404 Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
