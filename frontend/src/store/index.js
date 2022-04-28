import { createStore } from 'vuex'
// importer moment pour date/heure des posts

// Vuex est une bibliothèque de gestion d'état pour les applications Vue. js. Au centre de chaque application Vuex se trouve un "store", qui est essentiellement un objet contenant l'état de l'application.

const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
})

let user = localStorage.getItem('user')
if (!user) {
  user = {
    userId: -1,
    token: '',
  }
} else {
  try {
    user = JSON.parse(user)
    instance.defaults.headers.common.Authorization = `Bearer ${user.token}`
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    }
  }
}

const store = createStore({
  // Etat des données de l'application à l'intérieur de l'objet "state"
  state: {

    status: '',

    user: user,

    userInfos: {
      userId: '',
      isAdmin: '',
      nom: '',
      prenom: '',
      email: '',
      username: ''
    },

    postsInfos: {
      username: '',
      title: '',
      description: '',
      likes: '',
      dislikes: ''
    },

    likeInfos: {
      likes: '',
    },

    commentInfos: {
      description: '',
      postid: ''
    }

  },

  // Les mutations doivent être synchrones. Elles vont prendre les paramètres en compte et les placer dans le state
  mutations: {

    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      instance.defaults.headers.common.Authorization = `Bearer ${user.token}`
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user')
    },
    postsInfos: function (state, postsInfos) {
      state.postsInfos = postsInfos
    },
    likeInfos: function (state, likeInfos) {
      state.likeInfos = likeInfos
    },
    commentInfos: function (state, commentInfos) {
      state.commentInfos = commentInfos
    }
  },

  // Les actions permettent de changer les données en fonction des saisies de l'utilisateur dans les views, elles peuvent être asynchrones (ex: si on va chercher des données depuis une DB, on va devoir attendre le retour serveur -> seulement depuis l'action, pas la mutation)
  actions: {

    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(function (response) {
            commit('setStatus', '')
            commit('logUser', response.data)
            resolve(response.data.message)
          })
          .catch(function (error) {
            commit('setStatus', 'error_login')
            reject(error)
          })
      })
    },

    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
          .then(function (response) {
            commit('setStatus', 'created')
            resolve(response.data.message)
          })
          .catch(function (error) {
            commit('setStatus', 'error_create')
            reject(error)
          })
      })
    },

    getUserInfos: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        instance.get('/auth/' + id)
          .then((response) => {
            commit('userInfos', response.data)
            resolve(response)
          })
          .catch((error) => {
            console.error(error),
              reject(error)
          })
      })
    },

    supressProfile: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        instance.delete('/auth/' + id)
          .then((response) => {
            commit('setStatus', 'deleted')
            resolve(response)
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
      })
    },

    createPost: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        instance.post('/posts', data)
          .then((response) => {
            commit('setStatus', 'created')
            resolve(response.data)
          })
          .catch((error) => {
            console.error(error),
              reject(error)
          })
      })
    },

    deletePost: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        instance.delete('/posts/' + data.postid)
          .then((response) => {
            commit('postsInfos', response.data)
            resolve(response.data)
          })
          .catch((error) => {
            console.error(error),
              reject(error)
          })
      })
    },

    postLikes: ({ commit }, postid) => {
      return new Promise((resolve, reject) => {
        instance.post('/posts/' + postid + '/like')
          .then((response) => {
            commit('likeInfos', response.data)
            resolve(response.data)
          })
          .catch((error) => {
            console.error(error),
              reject(error)
          })
      })
    },

    getPostComment: ({ commit }, postid) => {
      return new Promise((resolve, reject) => {
        instance.get('/comment/' + postid)
          .then((response) => {
            commit('commentInfos', response.data)
            resolve(response.data)
          })
          .catch((error) => {
            console.error(error),
              reject(error)
          })
      })
    },

    createComment: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        instance.post('/comment/' + data.postid, { content: data.content })
          .then((response) => {
            commit('setStatus', 'created')
            resolve(response.data)
          })
          .catch((error) => {
            console.error(error),
              reject(error)
          })
      })
    },

    deleteComment: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        instance.delete('/comment/' + data.postid + '/' + data.commentId)
          .then((response) => {
            commit('commentInfos', response.data)
            resolve(response.data)
          })
          .catch((error) => {
            console.error(error),
              reject(error)
          })
      })
    },
  }
})

export default store