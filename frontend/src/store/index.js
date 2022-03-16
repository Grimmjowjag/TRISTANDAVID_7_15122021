import { createStore } from 'vuex'

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
    instance.defaults.headers.common['Authorization'] = user.token
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
      nom:'',
      prenom: '',
      email: '',
      username: ''
    },

    posts: [],

  },

  // Les mutations doivent être synchrones. Elles vont prendre les paramètres en compte et les placer dans le state
  mutations: {

    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token
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
    supress: function (state, userInfos) {
      state.user = userInfos
    }
  },

  // Les actions permettent de changer les données en fonction des saisies de l'utilisateur dans les views, elles peuvent être asynchrones (ex: si on va chercher des données depuis une DB, on va devoir attendre le retour serveur -> seulement depuis l'action, pas la mutation)
  actions: {

    login: ({commit}, userInfos) => {
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

    createAccount: ({commit}, userInfos) => {
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

    getUserInfos: ({commit}) => {
      instance.post('/infos')
      .then(function (response) {
        commit('userInfos', response.data.infos)
      })
      .catch(function () {
      })
    },

    supressProfile: ({commit}, userInfos) => {
      commit('setStatus', 'deleting')
      return new Promise((resolve, reject) => {
        instance.delete('/auth' + userInfos)
        .then((response) => {
          commit('setStatus', 'deleted')
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
      })
    },
  } 
})

export default store