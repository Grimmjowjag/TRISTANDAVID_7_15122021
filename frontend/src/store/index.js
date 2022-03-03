import { createStore } from 'vuex'

const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/signup'
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
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        commit
        instance.post('/createAccount', userInfos)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error)
        })
      })
    }
  } 
})

export default store