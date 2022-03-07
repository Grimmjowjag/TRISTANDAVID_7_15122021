import { createStore } from 'vuex'

const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
})

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

const store = createStore({
  // Données à l'intérieur de l'objet "state"
  state: {
    status: '',

    user: user,

    userInfos: {
      nom:'',
      prenom: '',
      email: '',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      state.user = user
    }
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      commit("setStatus", "loading")
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

    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
        .then(function (response) {
          commit('setStatus', '')
          commit('logUser', response.data)
          resolve(response.data)
        })
        .catch(function (error) {
          commit('setStatus', 'error_login')
          reject(error)
        })
      })
    },
  } 
})

export default store