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
    name: 'Posts',
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
      title: 'Posts'
    }
  },

  {
    path: '/comment/:postId',
    name: 'Comment',
    component: () => import(/* webpackChunkName: "login" */ '../views/HomeView.vue'),
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
    path: '/allProfile',
    name: 'Utilisateurs',
    component: () => import(/* webpackChunkName: "login" */ '../views/AllProfileView.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.user.userId.isAdmin == -1) {
        next("/")
      } else {
        next()
      }
    },
    meta: {
      title: 'Utilisateurs'
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
